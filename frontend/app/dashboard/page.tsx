"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { claimsAPI, getToken, clearToken, getUser } from "@/lib/api";
import { CheckCircle, Clock, XCircle, LogOut, ArrowRight } from "lucide-react";

interface Claim {
  _id: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  deal: {
    _id: string;
    title: string;
    category: string;
    partnerName: string;
    discountDetails: string;
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }

    const userData = getUser();
    setUser(userData);
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const response = await claimsAPI.getMyClaiems();
      setClaims(response.data.claims);
    } catch (err) {
      console.error("Failed to fetch claims", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearToken();
    router.push("/login");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle size={20} className="text-green-400" />;
      case "pending":
        return <Clock size={20} className="text-yellow-400" />;
      case "rejected":
        return <XCircle size={20} className="text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/10 border-green-500/30 text-green-300";
      case "pending":
        return "bg-yellow-500/10 border-yellow-500/30 text-yellow-300";
      case "rejected":
        return "bg-red-500/10 border-red-500/30 text-red-300";
      default:
        return "";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6 py-12 relative overflow-hidden">
      {/* Animated Clouds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ x: "-200px" }}
          animate={{ x: "100vw" }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 opacity-30"
        >
          <svg width="200" height="100" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 60 Q30 40 50 20 Q70 10 90 20 Q110 10 130 20 Q150 10 170 20 Q190 30 170 50 Q190 70 170 80 Q150 90 130 80 Q110 90 90 80 Q70 90 50 80 Q30 70 50 60 Z" fill="#e2e8f0"/>
          </svg>
        </motion.div>
        <motion.div
          initial={{ x: "-250px" }}
          animate={{ x: "100vw" }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
          className="absolute top-40 opacity-25"
        >
          <svg width="250" height="120" viewBox="0 0 250 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 70 Q40 50 60 30 Q80 20 100 30 Q120 20 140 30 Q160 20 180 30 Q200 40 180 60 Q200 80 180 90 Q160 100 140 90 Q120 100 100 90 Q80 100 60 90 Q40 80 60 70 Z" fill="#cbd5e1"/>
          </svg>
        </motion.div>
        <motion.div
          initial={{ x: "-180px" }}
          animate={{ x: "100vw" }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 10 }}
          className="absolute top-60 opacity-35"
        >
          <svg width="180" height="90" viewBox="0 0 180 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M45 55 Q25 35 45 15 Q65 5 85 15 Q105 5 125 15 Q145 5 165 15 Q175 25 165 45 Q175 65 165 75 Q145 85 125 75 Q105 85 85 75 Q65 85 45 75 Q25 65 45 55 Z" fill="#f1f5f9"/>
          </svg>
        </motion.div>
        <motion.div
          initial={{ x: "-220px" }}
          animate={{ x: "100vw" }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 15 }}
          className="absolute top-80 opacity-20"
        >
          <svg width="220" height="110" viewBox="0 0 220 110" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M55 65 Q35 45 55 25 Q75 15 95 25 Q115 15 135 25 Q155 15 175 25 Q195 35 175 55 Q195 75 175 85 Q155 95 135 85 Q115 95 95 85 Q75 95 55 85 Q35 75 55 65 Z" fill="#e2e8f0"/>
          </svg>
        </motion.div>
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <h1 className="text-4xl font-bold text-slate-50 mb-2">Dashboard</h1>
            <p className="text-slate-400">Welcome back, {user?.name}!</p>
            {user?.isAdmin && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-4 py-2 rounded-lg hover:bg-indigo-500/20 transition mt-4"
              >
                Admin Panel
              </Link>
            )}
          </div>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/deals")}
              className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-4 py-2 rounded-lg hover:bg-indigo-500/20 transition"
            >
              <ArrowRight size={20} />
              Claim Deals
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-2 rounded-lg hover:bg-red-500/20 transition"
            >
              <LogOut size={20} />
              Logout
            </motion.button>
          </div>
        </motion.div>

        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs text-slate-400 mb-1">Account Type</p>
              <p className="text-lg font-semibold text-slate-50 capitalize">
                {user?.role}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Email</p>
              <p className="text-lg font-semibold text-slate-50">{user?.email}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Verification Status</p>
              <p
                className={`text-lg font-semibold ${
                  user?.isVerified ? "text-green-400" : "text-yellow-400"
                }`}
              >
                {user?.isVerified ? "✓ Verified" : "⏳ Pending"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/50 border border-slate-800 rounded-xl p-6"
          >
            <p className="text-sm text-slate-400 mb-2">Total Claims</p>
            <p className="text-3xl font-bold text-slate-50">{claims.length}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900/50 border border-slate-800 rounded-xl p-6"
          >
            <p className="text-sm text-slate-400 mb-2">Approved</p>
            <p className="text-3xl font-bold text-green-400">
              {claims.filter((c) => c.status === "approved").length}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-slate-900/50 border border-slate-800 rounded-xl p-6"
          >
            <p className="text-sm text-slate-400 mb-2">Pending</p>
            <p className="text-3xl font-bold text-yellow-400">
              {claims.filter((c) => c.status === "pending").length}
            </p>
          </motion.div>
        </div>

        {/* Claims List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-xl font-semibold text-slate-50">
              Your Claimed Deals
            </h2>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
            </div>
          ) : claims.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-slate-400 mb-4">You haven't claimed any deals yet</p>
              <Link
                href="/deals"
                className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300"
              >
                Browse deals <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {claims.map((claim, index) => (
                <motion.div
                  key={claim._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="px-6 py-4 hover:bg-slate-800/50 transition"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-50 mb-1">
                        {claim.deal.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span>{claim.deal.partnerName}</span>
                        <span>•</span>
                        <span>{claim.deal.category}</span>
                        <span>•</span>
                        <span>{formatDate(claim.createdAt)}</span>
                      </div>
                      <p className="text-sm text-indigo-300 mt-2">
                        {claim.deal.discountDetails}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(
                          claim.status
                        )}`}
                      >
                        {getStatusIcon(claim.status)}
                        <span className="text-sm font-medium capitalize">
                          {claim.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Back to Deals */}
        {claims.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 text-center"
          >
            <Link
              href="/deals"
              className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition"
            >
              Browse more deals <ArrowRight size={16} />
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
