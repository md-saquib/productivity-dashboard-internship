import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { NavLink } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../state/authAction';
import { userRelatedProjectAction } from '../../../user_Module/Projects/state/projectAction';



const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();


    const { register, isSubmitting, errors, handleSubmit } = useAuth();

    const onSubmit = async (data) => {
        await dispatch(loginUser(data));
        await dispatch(userRelatedProjectAction())

    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-[var(--background)] px-4 py-12 text-[var(--on-background)]">
            <div className="w-full max-w-[440px] space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                        Welcome back
                    </h1>
                    <p className="mt-2 text-sm text-[var(--text-secondary)]">
                        Enter your credentials to access your workspace.
                    </p>
                </div>

                {/* Form Card */}
                <div className="rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-8 shadow-2xl shadow-black/50">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Email Field */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-1.5 block font-mono text-xs text-[var(--on-surface-variant)]"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[var(--outline)]">
                                    <Mail className="h-4 w-4" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="name@company.com"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Invalid email address',
                                        },
                                    })}
                                    className={`w-full rounded-md border bg-[var(--surface-container-lowest)] py-2 pl-9 pr-3 text-sm text-[var(--on-surface)] placeholder-[var(--outline)] outline-none transition focus:ring-2 ${errors.email
                                        ? 'border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error-container)]/30'
                                        : 'border-[var(--outline-variant)] focus:border-[var(--primary)] focus:ring-[var(--primary-container)]/30'
                                        }`}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-xs text-[var(--error)]">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="mb-1.5 flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="font-mono text-xs text-[var(--on-surface-variant)]"
                                >
                                    Password
                                </label>
                                <a
                                    href="#forgot-password"
                                    className="text-xs font-medium text-[var(--primary)] transition-colors hover:text-[var(--primary-fixed)]"
                                >
                                    Forgot Password?
                                </a>
                            </div>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[var(--outline)]">
                                    <Lock className="h-4 w-4" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Password must be at least 6 characters',
                                        },
                                    })}
                                    className={`w-full rounded-md border bg-[var(--surface-container-lowest)] py-2 pl-9 pr-10 text-sm text-[var(--on-surface)] placeholder-[var(--outline)] outline-none transition focus:ring-2 ${errors.password
                                        ? 'border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error-container)]/30'
                                        : 'border-[var(--outline-variant)] focus:border-[var(--primary)] focus:ring-[var(--primary-container)]/30'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-[var(--outline)] transition-colors hover:text-[var(--on-surface)]"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-xs text-[var(--error)]">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center">
                            <input
                                id="rememberMe"
                                type="checkbox"
                                {...register('rememberMe')}
                                className="h-4 w-4 rounded border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] text-[var(--primary)] focus:ring-[var(--primary)] focus:ring-offset-[var(--surface-container-low)]"
                            />
                            <label
                                htmlFor="rememberMe"
                                className="ml-2 block cursor-pointer select-none text-xs text-[var(--text-secondary)]"
                            >
                                Remember me
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded-md bg-[var(--primary)] py-2.5 text-sm font-semibold text-[var(--on-primary)] shadow-md transition-all hover:bg-[var(--primary-container)] hover:text-[var(--on-primary-container)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--surface-container-low)] disabled:opacity-50"
                        >
                            {isSubmitting ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[var(--outline-variant)]" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-[var(--surface-container-low)] px-3 font-mono text-[10px] tracking-wider text-[var(--outline)]">
                                OR CONTINUE WITH
                            </span>
                        </div>
                    </div>

                    {/* Footer Link */}
                    <p className="text-center text-xs text-[var(--text-secondary)]">
                        Don&apos;t have an account?{' '}
                        <NavLink
                            to={'/register'}
                            className="font-medium text-[var(--primary)] transition-colors hover:text-[var(--primary-fixed)]"
                        >
                            Sign up
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;