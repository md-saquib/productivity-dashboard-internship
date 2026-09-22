import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../app/config/axiosInstance";
import { socket } from "../../../app/config/socketInstance";

// 1. Register User Action
export const registerUser = createAsyncThunk(
    "/api/auth/register",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/api/auth/register", credentials);
            return response.data;
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || "Registration failed";
            return rejectWithValue(message);
        }
    }
);

// 2. Hydrate/Current User Action
export const hydrateUser = createAsyncThunk(
    "/api/auth/me",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/api/auth/me");
            return response.data.user;
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || "Failed to authenticate session";
            return rejectWithValue(message);
        }
    }
);

// 3. Login User Action
export const loginUser = createAsyncThunk(
    "/api/auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/api/auth/login", credentials);
            return response.data;
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || "Login failed";
            return rejectWithValue(message);
        }
    }
);

// 4. Logout User Action
export const logout = createAsyncThunk(
    "/api/auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/api/auth/logout");
            // Close the WebSocket connection cleanly on logout
            if (socket.connected) socket.disconnect();
            return response.data;
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || "Logout failed";
            return rejectWithValue(message);
        }
    }
);