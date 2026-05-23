"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { loginUser, registerUser, googleLoginUser } from "@/lib/api";

declare global {
  interface Window {
    google?: any;
  }
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Dynamically load Google GSI script for actual Google Sign In
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "1029384756-mockclientid.apps.googleusercontent.com",
          callback: handleGoogleCallback,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("google-signin-btn"),
          { theme: "outline", size: "large", width: "100%", text: "continue_with" }
        );
      }
    };

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [isRegistering]);

  const handleGoogleCallback = async (response: any) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await googleLoginUser(response.credential);
      if (res.success) {
        setSuccess("Signed in with Google successfully!");
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 800);
      } else {
        setError(res.message || res.error || "Google sign-in failed.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred during Google sign-in.");
    } finally {
      setLoading(false);
    }
  };

  const handleMockGoogleLogin = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    // We send a special mock token format, which the backend controller handles as a test login
    const mockEmail = `sandbox-${Math.floor(Math.random() * 1000)}`;
    const mockCredential = `mock-google-token-${mockEmail}`;
    
    try {
      const res = await googleLoginUser(mockCredential);
      if (res.success) {
        setSuccess("Signed in with Simulated Google Sandbox account!");
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1000);
      } else {
        setError(res.message || res.error || "Mock sign-in failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to verify simulated Google account.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (isRegistering) {
        // Register flow
        const res = await registerUser(email, password);
        if (res.success) {
          setSuccess("Account created and logged in successfully!");
          setTimeout(() => {
            router.push("/");
            router.refresh();
          }, 1000);
        } else {
          setError(res.message || res.error || "Registration failed.");
        }
      } else {
        // Login flow
        const res = await loginUser(email, password);
        if (res.success) {
          setSuccess("Logged in successfully!");
          setTimeout(() => {
            router.push("/");
            router.refresh();
          }, 1000);
        } else {
          setError(res.message || res.error || "Invalid email or password.");
        }
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50/50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 hover:scale-105 transition-transform">
            <GraduationCap className="h-9 w-9 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              College<span className="text-blue-600">Hub</span>
            </span>
          </Link>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {isRegistering ? "Create your account" : "Welcome back"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isRegistering
              ? "Join us to explore and compare colleges"
              : "Sign in to access saved colleges and comparisons"}
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-gray-100">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <div className="flex">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-4 rounded-md animate-pulse">
              <div className="flex">
                <div className="text-sm text-green-700">{success}</div>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm bg-gray-50/50"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1.5 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password (min 6 chars)"
                  className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm bg-gray-50/50 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 cursor-pointer">
                  Remember me
                </label>
              </div>

              {!isRegistering && (
                <div className="text-sm">
                  <button type="button" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                    Forgot your password?
                  </button>
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-250 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </span>
                ) : isRegistering ? (
                  "Create Account"
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {/* Native Google Sign In Render Container */}
              <div id="google-signin-btn" className="w-full flex justify-center min-h-[40px]" />

              {/* simulated login for quick verification and preview */}
              <button
                type="button"
                onClick={handleMockGoogleLogin}
                className="w-full flex items-center justify-center px-4 py-2.5 border border-dashed border-blue-300 text-blue-600 rounded-xl bg-blue-50/30 hover:bg-blue-50 text-sm font-medium transition-all hover:scale-[1.01]"
              >
                <span className="mr-2">⚡</span> Quick Simulated Google Login (Sandbox)
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError("");
                setSuccess("");
              }}
              className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              {isRegistering ? "Already have an account? Sign in" : "Don't have an account? Register now"}
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
