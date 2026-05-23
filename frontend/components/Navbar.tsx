"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, Menu, X, LogOut, User } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authUser, setAuthUser] = useState<{ email: string; name?: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Client-side execution only to prevent server-side hydration errors
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    if (token && userStr) {
      try {
        setAuthUser(JSON.parse(userStr));
      } catch {
        setAuthUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthUser(null);
    setMobileOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <GraduationCap className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              College<span className="text-blue-600">Hub</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/"
              className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200"
            >
              Home
            </Link>
            <Link
              href="/compare"
              className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200"
            >
              Compare
            </Link>

            {authUser ? (
              <div className="flex items-center gap-3 border-l border-gray-100 pl-4">
                <span className="flex items-center gap-1.5 text-sm text-gray-700 font-medium">
                  <User className="h-4 w-4 text-blue-500" />
                  <span className="max-w-[120px] truncate">{authUser.name || authUser.email.split("@")[0]}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 rounded-lg transition-all duration-200"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="ml-2 px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Login
              </Link>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-1">
            <Link
              href="/"
              className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/compare"
              className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all"
              onClick={() => setMobileOpen(false)}
            >
              Compare
            </Link>
            
            {authUser ? (
              <div className="border-t border-gray-100 pt-3 mt-2 space-y-2 px-4">
                <p className="text-xs text-gray-500">Logged in as:</p>
                <div className="flex items-center gap-1 text-sm font-medium text-gray-800">
                  <User className="h-4 w-4 text-blue-500" />
                  {authUser.name || authUser.email}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-all duration-200 mt-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="block px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all text-center"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
