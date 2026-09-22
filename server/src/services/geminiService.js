const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config/config');

const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);

// ── Per-user in-memory cache (5-minute TTL) ──────────────────────────────────
const insightCache = new Map(); // userId → { insight, expiresAt }
const inFlightRequests = new Map(); // userId → Promise<string>
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const ERROR_COOLDOWN_MS = 2 * 60 * 1000; // 2 minutes cooldown on rate-limit / error

/**
 * Generates a short, actionable AI insight from live dashboard data.
 *
 * @param {string} userId - Used as the cache key
 * @param {object} dashboardData - { stats, projects, tasks }
 * @returns {Promise<string>} - A single insight sentence (≤ 35 words)
 */
const generateInsight = async (userId, dashboardData) => {
    const userKey = String(userId);

    // 1. Return cached insight if still fresh
    const cached = insightCache.get(userKey);
    if (cached && cached.expiresAt > Date.now()) {
        return cached.insight;
    }

    // 2. If a request for this user is already in-flight, return the existing promise
    // to prevent duplicate concurrent calls from burning API quota.
    if (inFlightRequests.has(userKey)) {
        return inFlightRequests.get(userKey);
    }

    const { stats, projects, tasks } = dashboardData;

    // Build a structured context block for the prompt
    const contextBlock = JSON.stringify(
        {
            stats: {
                activeProjects: stats?.activeProjects,
                tasksCompleted: stats?.tasksCompleted,
                pendingReviews: stats?.pendingReviews,
                weeklyProductivity: `${stats?.weeklyProductivity}%`,
            },
            topProjects: (projects || []).slice(0, 5).map((p) => ({
                name: p.projectName,
                status: p.status,
                progress: p.progress,
                techStack: p.techStack,
            })),
            highPriorityTasks: (tasks || []).filter((t) => t.priority === 'High' || t.priority === 'Critical').slice(0, 5).map((t) => ({
                title: t.title,
                status: t.status,
                category: t.category,
                dueDate: t.dueDate,
            })),
        },
        null,
        2
    );

    const systemPrompt = `  You are a senior engineering productivity analyst.
                            You receive a JSON snapshot of a developer's dashboard and produce ONE concise, 
                            actionable insight in plain English (maximum 35 words, no markdown, no bullet points).
                            Focus on the biggest bottleneck, risk, or quick win visible in the data.`;

    const userPrompt = `Dashboard data:\n${contextBlock}\n\nProvide one insight:`;

    const fetchPromise = (async () => {
        try {
            const model = genAI.getGenerativeModel({
                model: 'gemini-2.5-flash',
                systemInstruction: systemPrompt,
            });

            const result = await model.generateContent(userPrompt);
            const insight = result.response.text().trim();

            // Cache the result
            insightCache.set(userKey, {
                insight,
                expiresAt: Date.now() + CACHE_TTL_MS,
            });

            return insight;
        } catch (error) {
            console.error('[Gemini] Error generating insight:', error.message);
            const fallback = 'AI insight temporarily unavailable. Check pending reviews and high-priority tasks.';

            // Negative caching: cache the fallback for a cooldown period
            // to avoid hammering Gemini API and draining quota on retries
            insightCache.set(userKey, {
                insight: fallback,
                expiresAt: Date.now() + ERROR_COOLDOWN_MS,
            });

            return fallback;
        } finally {
            inFlightRequests.delete(userKey);
        }
    })();

    inFlightRequests.set(userKey, fetchPromise);
    return fetchPromise;
};

/**
 * AI-assisted task generation
 * Accepts a brief prompt/title from the user and generates structured task details.
 *
 * @param {string} prompt - e.g. "Implement Redis caching for API endpoints"
 * @returns {Promise<{title: string, description: string, category: string, priority: string}>}
 */
const generateTaskWithAI = async (prompt) => {
    const systemPrompt = `You are an expert technical lead and project manager.
When given a feature idea or brief prompt, you break it down into an actionable engineering task.
You MUST respond with valid JSON ONLY (no markdown formatting, no code block backticks).
The JSON must follow this exact schema:
{
  "title": "A concise, imperative title (e.g., Setup Redis caching for user tasks)",
  "description": "Clear explanation of technical requirements and acceptance criteria (2-3 sentences)",
  "category": "One of: Frontend Development, Backend Development, UI/UX Design, DevOps & CI/CD",
  "priority": "One of: LOW, MEDIUM, HIGH"
}`;

    try {
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            systemInstruction: systemPrompt,
        });

        const result = await model.generateContent(prompt);
        let rawText = result.response.text().trim();
        
        // Strip any markdown code fence if present
        if (rawText.startsWith('```')) {
            rawText = rawText.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/```$/, '').trim();
        }

        const parsed = JSON.parse(rawText);
        return {
            title: parsed.title || prompt,
            description: parsed.description || '',
            category: parsed.category || 'Backend Development',
            priority: parsed.priority || 'MEDIUM',
        };
    } catch (error) {
        console.error('[Gemini] Error generating task details:', error.message);
        return {
            title: prompt,
            description: `Automated task created for: ${prompt}. Please review and update acceptance criteria.`,
            category: 'Backend Development',
            priority: 'MEDIUM',
        };
    }
};

module.exports = { generateInsight, generateTaskWithAI };

