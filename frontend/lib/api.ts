import { College } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Helper functions for auth token management
export const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const setAuthSession = (token: string, user: { id: number; email: string; name?: string }) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const clearAuthSession = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};

export const getAuthUser = (): { id: number; email: string; name?: string } | null => {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
  }
  return null;
};

// Generic response types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  error?: string;
  count?: number;
  colleges?: T;
  college?: T;
  token?: string;
  user?: {
    id: number;
    email: string;
    name?: string;
  };
  saved?: boolean;
}

/**
 * Fetch list of colleges with optional searching and filtering.
 */
export async function fetchColleges(
  search = "",
  location = "all",
  feesRange = "all"
): Promise<ApiResponse<College[]>> {
  try {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (location && location !== "all") params.append("location", location);
    if (feesRange && feesRange !== "all") params.append("feesRange", feesRange);

    const response = await fetch(`${API_URL}/colleges?${params.toString()}`);
    const data = await response.json();
    if (!response.ok) {
      return { success: false, error: data.message || `Request failed (${response.status})` };
    }
    if (data.success && data.colleges) {
      data.colleges = data.colleges.map((c: any) => ({ ...c, id: String(c.id) }));
    }
    return data;
  } catch (error) {
    console.error("fetchColleges error:", error);
    return { success: false, error: "Failed to fetch colleges." };
  }
}

/**
 * Fetch a single college by ID.
 */
export async function fetchCollegeById(id: string | number): Promise<ApiResponse<College>> {
  try {
    const response = await fetch(`${API_URL}/colleges/${id}`);
    const data = await response.json();
    if (!response.ok) {
      return { success: false, error: data.message || `Request failed (${response.status})` };
    }
    if (data.success && data.college) {
      data.college = { ...data.college, id: String(data.college.id) };
    }
    return data;
  } catch (error) {
    console.error("fetchCollegeById error:", error);
    return { success: false, error: "Failed to fetch college details." };
  }
}

/**
 * Compare 2 to 3 colleges side-by-side.
 */
export async function compareColleges(ids: (string | number)[]): Promise<ApiResponse<College[]>> {
  try {
    const response = await fetch(`${API_URL}/compare`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids }),
    });
    const data = await response.json();
    if (!response.ok) {
      return { success: false, error: data.message || `Request failed (${response.status})` };
    }
    if (data.success && data.colleges) {
      data.colleges = data.colleges.map((c: any) => ({ ...c, id: String(c.id) }));
    }
    return data;
  } catch (error) {
    console.error("compareColleges error:", error);
    return { success: false, error: "Failed to fetch college comparison." };
  }
}

/**
 * Authenticate with credentials login.
 */
export async function loginUser(email: string, password: string): Promise<ApiResponse<never>> {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.success && data.token && data.user) {
      setAuthSession(data.token, data.user);
    }
    return data;
  } catch (error) {
    console.error("loginUser error:", error);
    return { success: false, error: "Authentication failed." };
  }
}

/**
 * Register a new user account.
 */
export async function registerUser(email: string, password: string): Promise<ApiResponse<never>> {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.success && data.token && data.user) {
      setAuthSession(data.token, data.user);
    }
    return data;
  } catch (error) {
    console.error("registerUser error:", error);
    return { success: false, error: "Registration failed." };
  }
}

/**
 * Authenticate with Google ID Token.
 */
export async function googleLoginUser(credential: string): Promise<ApiResponse<never>> {
  try {
    const response = await fetch(`${API_URL}/auth/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credential }),
    });
    const data = await response.json();
    if (data.success && data.token && data.user) {
      setAuthSession(data.token, data.user);
    }
    return data;
  } catch (error) {
    console.error("googleLoginUser error:", error);
    return { success: false, error: "Google OAuth failed." };
  }
}

/**
 * Toggle saved status of a college.
 */
export async function toggleSaveCollege(collegeId: string | number): Promise<ApiResponse<never>> {
  try {
    const token = getAuthToken();
    if (!token) {
      return { success: false, error: "Please log in to save colleges." };
    }

    const response = await fetch(`${API_URL}/save/${collegeId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("toggleSaveCollege error:", error);
    return { success: false, error: "Failed to update saved status." };
  }
}

/**
 * Fetch all saved colleges for the logged-in user.
 */
export async function fetchSavedColleges(): Promise<ApiResponse<College[]>> {
  try {
    const token = getAuthToken();
    if (!token) {
      return { success: false, error: "No authorization token found." };
    }

    const response = await fetch(`${API_URL}/saved`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.success && data.colleges) {
      data.colleges = data.colleges.map((c: any) => ({ ...c, id: String(c.id) }));
    }
    return data;
  } catch (error) {
    console.error("fetchSavedColleges error:", error);
    return { success: false, error: "Failed to fetch saved colleges." };
  }
}
