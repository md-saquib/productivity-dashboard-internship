import React from 'react';
import {
    User,
    Mail,
    Code2,
    Lock,
    ArrowRight,
    ChevronDown,
    // Github
} from 'lucide-react';
import { NavLink } from 'react-router';
import { useAuth, getStrengthLabel, getPasswordStrength } from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../state/authAction';

const Register = () => {

    const dispatch = useDispatch();

    const { register, isSubmitting, errors, handleSubmit, watch } = useAuth();

    const strength = getPasswordStrength(watch('password', ''));



    const onSubmit = async (data) => {


        dispatch(registerUser(data));
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] p-4 font-sans text-[var(--on-background)] selection:bg-[var(--primary)] selection:text-[var(--on-primary)]">
            {/* Main Card Container */}
            <div className="w-full max-w-[440px] rounded-2xl border border-[var(--outline-variant)] bg-[var(--surface-container-low)]/90 p-8 shadow-2xl backdrop-blur-xl">
                <div className="mb-7 text-center">
                    <h2 className="text-lg font-semibold tracking-tight text-[var(--text-primary)]">
                        Create Account
                    </h2>
                    <p className="mt-1 text-xs font-normal text-[var(--text-secondary)]">
                        Join the next generation of developers.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    {/* Full Name */}
                    <div>
                        <label className="mb-1.5 block font-mono text-[10px] font-medium uppercase tracking-wider text-[var(--outline)]">
                            FULL NAME
                        </label>
                        <div className="relative">
                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[var(--outline)]">
                                <User size={15} />
                            </span>
                            <input
                                type="text"
                                placeholder="Ada Lovelace"
                                {...register('fullName', { required: 'Full name is required' })}
                                className={`w-full rounded-lg border bg-[var(--surface-container-lowest)] py-2.5 pl-10 pr-3 text-xs text-[var(--on-surface)] placeholder-[var(--outline-variant)] transition-colors focus:outline-none focus:ring-1 ${errors.fullName
                                    ? 'border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error)]'
                                    : 'border-[var(--outline-variant)] focus:border-[var(--primary-container)] focus:ring-[var(--primary-container)]'
                                    }`}
                            />
                        </div>
                        {errors.fullName && (
                            <span className="mt-1 block text-[11px] text-[var(--error)]">
                                {errors.fullName.message}
                            </span>
                        )}
                    </div>

                    {/* Email Address */}
                    <div>
                        <label className="mb-1.5 block font-mono text-[10px] font-medium uppercase tracking-wider text-[var(--outline)]">
                            EMAIL ADDRESS
                        </label>
                        <div className="relative">
                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[var(--outline)]">
                                <Mail size={15} />
                            </span>
                            <input
                                type="email"
                                placeholder="ada@example.com"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address',
                                    },
                                })}
                                className={`w-full rounded-lg border bg-[var(--surface-container-lowest)] py-2.5 pl-10 pr-3 text-xs text-[var(--on-surface)] placeholder-[var(--outline-variant)] transition-colors focus:outline-none focus:ring-1 ${errors.email
                                    ? 'border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error)]'
                                    : 'border-[var(--outline-variant)] focus:border-[var(--primary-container)] focus:ring-[var(--primary-container)]'
                                    }`}
                            />
                        </div>
                        {errors.email && (
                            <span className="mt-1 block text-[11px] text-[var(--error)]">
                                {errors.email.message}
                            </span>
                        )}
                    </div>

                    {/* Role / Designation */}
                    <div>
                        <label className="mb-1.5 block font-mono text-[10px] font-medium uppercase tracking-wider text-[var(--outline)]">
                            ROLE / DESIGNATION
                        </label>
                        <div className="relative">
                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[var(--outline)]">
                                <Code2 size={15} />
                            </span>
                            <select
                                {...register('department', { required: 'Please select a role' })}
                                defaultValue=""
                                className={`w-full cursor-pointer appearance-none rounded-lg border bg-[var(--surface-container-lowest)] py-2.5 pl-10 pr-9 text-xs text-[var(--on-surface)] transition-colors focus:outline-none focus:ring-1 ${errors.department
                                    ? 'border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error)]'
                                    : 'border-[var(--outline-variant)] focus:border-[var(--primary-container)] focus:ring-[var(--primary-container)]'
                                    }`}
                            >
                                <option value="" disabled className="bg-[var(--surface-container-low)] text-[var(--outline-variant)]">
                                    Select your specialty...
                                </option>
                                <option value="frontend" className="bg-[var(--surface-container-low)] text-[var(--on-surface)]">
                                    Frontend Engineer
                                </option>
                                <option value="backend" className="bg-[var(--surface-container-low)] text-[var(--on-surface)]">
                                    Backend Engineer
                                </option>
                                <option value="fullstack" className="bg-[var(--surface-container-low)] text-[var(--on-surface)]">
                                    Fullstack Developer
                                </option>
                                <option value="devops" className="bg-[var(--surface-container-low)] text-[var(--on-surface)]">
                                    DevOps / SRE
                                </option>
                            </select>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[var(--outline)]">
                                <ChevronDown size={14} />
                            </span>
                        </div>
                        {errors.department && (
                            <span className="mt-1 block text-[11px] text-[var(--error)]">
                                {errors.department.message}
                            </span>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="mb-1.5 block font-mono text-[10px] font-medium uppercase tracking-wider text-[var(--outline)]">
                            PASSWORD
                        </label>
                        <div className="relative">
                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[var(--outline)]">
                                <Lock size={15} />
                            </span>
                            <input
                                type="password"
                                placeholder="••••••••"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must have at least 6 characters',
                                    },
                                })}
                                className={`w-full rounded-lg border bg-[var(--surface-container-lowest)] py-2.5 pl-10 pr-3 text-xs text-[var(--on-surface)] placeholder-[var(--outline-variant)] transition-colors focus:outline-none focus:ring-1 ${errors.password
                                    ? 'border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error)]'
                                    : 'border-[var(--outline-variant)] focus:border-[var(--primary-container)] focus:ring-[var(--primary-container)]'
                                    }`}
                            />
                        </div>
                        {errors.password && (
                            <span className="mt-1 block text-[11px] text-[var(--error)]">
                                {errors.password.message}
                            </span>
                        )}

                        {/* Password Strength Indicator */}
                        <div className="mt-2.5 flex items-center gap-1.5">
                            <div className="grid flex-1 grid-cols-4 gap-1.5">
                                {[1, 2, 3, 4].map((step) => (
                                    <div
                                        key={step}
                                        className={`h-[3px] rounded-full transition-all duration-300 ${step <= strength
                                            ? strength <= 1
                                                ? 'bg-[var(--error)]'
                                                : strength <= 2
                                                    ? 'bg-[var(--tertiary)]'
                                                    : 'bg-[var(--secondary)]'
                                            : 'bg-[var(--outline-variant)]'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="pl-1.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-[var(--outline)]">
                                {getStrengthLabel(strength)}
                            </span>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[var(--on-primary)] shadow-sm transition-all hover:bg-[var(--primary-container)] hover:text-[var(--on-primary-container)] active:bg-[var(--on-primary-fixed-variant)] disabled:opacity-60"
                    >
                        {isSubmitting ? 'Creating account...' : 'CREATE ACCOUNT'}
                        <ArrowRight size={14} className="stroke-[2.5]" />
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-6 text-center">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-[var(--outline-variant)]" />
                    </div>
                    <span className="relative bg-[var(--surface-container-low)] px-3 font-mono text-[9px] uppercase tracking-widest text-[var(--outline)]">
                        OR CONTINUE WITH
                    </span>
                </div>

                {/* Footer Note */}
                <div className="mt-6 text-center text-xs text-[var(--text-secondary)]">
                    Already have an account?{' '}
                    <NavLink
                        to="/"
                        className="font-medium text-[var(--primary)] transition-colors hover:text-[var(--primary-fixed)]"
                    >
                        Log in
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Register;