import axios, { AxiosInstance } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests interceptor
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ============ AUTH APIS ============

export const authAPI = {
  register: (data: {
    name: string;
    email: string;
    password: string;
    role?: string;
  }) => apiClient.post("/auth/register", data),

  login: (data: { email: string; password: string }) =>
    apiClient.post("/auth/login", data),

  getProfile: () => apiClient.get("/auth/profile"),

  verify: () => apiClient.post("/auth/verify"),
};

// ============ DEALS APIS ============

export const dealsAPI = {
  getAll: (params?: {
    category?: string;
    access?: string;
    search?: string;
  }) => apiClient.get("/deals", { params }),

  getById: (id: string) => apiClient.get(`/deals/${id}`),

  create: (data: {
    title: string;
    slug: string;
    description: string;
    category: string;
    partnerName: string;
    partnerLogoUrl?: string;
    discountDetails: string;
    isLocked?: boolean;
    eligibilityDescription?: string;
    tags?: string[];
  }) => apiClient.post("/deals", data),
};

// ============ CLAIMS APIS ============

export const claimsAPI = {
  claimDeal: (dealId: string) => apiClient.post(`/claims/${dealId}`),

  getMyClaiems: () => apiClient.get("/claims/me"),

  getClaimById: (claimId: string) => apiClient.get(`/claims/${claimId}`),
};

// ============ AUTH HELPERS ============

export const setToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const clearToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};

export const getUser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const setUser = (user: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export default apiClient;
