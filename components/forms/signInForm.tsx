'use client';

import { useState } from "react";
import { signIn } from "@/services/auth";

const SignInForm = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!email || !password) {
            setError("Both email and password are required.");
            return;
        }

        setError(null);
        setLoading(true);

        try {
            const response = await signIn(email, password);
            localStorage.setItem('email', response.email);

            alert("Login successful!");
        } catch (err: any) {
            setError(err.message || "Failed to log in. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                {/* Email Field */}
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>

                {/* Password Field */}
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>

                {/* Error Message */}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {/* Submit Button */}
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default SignInForm;
