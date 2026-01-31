"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { dealsAPI, authAPI, getToken, clearToken, getUser, setUser } from "@/lib/api";
import { CheckCircle, Clock, XCircle, LogOut, ArrowRight, User, Shield } from "lucide-react";
import { SparkleButton } from "@/components/SparkleButton";
import { AnimatedClouds } from "@/components/AnimatedClouds";

interface Deal {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  partnerName: string;
  partnerLogoUrl?: string;
  discountDetails: string;
  isLocked: boolean;
  eligibilityDescription?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUserState] = useState<any>(null);
  const [verifying, setVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }

    const userData = getUser();
    setUserState(userData);
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      const response = await dealsAPI.getAll();
      setDeals(response.data.deals);
    } catch (err) {
      console.error("Failed to fetch deals", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearToken();
    router.push("/login");
  };

  const handleVerify = async () => {
    if (user?.isVerified) return;

    setVerifying(true);
    try {
      const response = await authAPI.verify();
      const { token, user: updatedUser } = response.data;

      // Update local storage and state
      setUser(token);
      setUser(updatedUser);
      setUserState(updatedUser);
      setVerificationSuccess(true);

      // Refresh deals to show unlocked ones
      fetchDeals();

      setTimeout(() => setVerificationSuccess(false), 3000);
    } catch (err: any) {
      console.error("Verification failed", err);
    } finally {
      setVerifying(false);
    }
  };

  const getStatusIcon = (isLocked: boolean, isVerified: boolean) => {
    if (isLocked && !isVerified) {
      return <XCircle size={20} className="text-red-400" />;
    } else if (isLocked && isVerified) {
      return <XCircle size={20} className="text-red-400" />;
    } else {
      return <CheckCircle size={20} className="text-green-400" />;
    }
  };

  const getStatusColor = (isLocked: boolean, isVerified: boolean) => {
    if (isLocked && !isVerified) {
      return "bg-red-500/10 border-red-500/30 text-red-300";
    } else if (isLocked && isVerified) {
      return "bg-red-500/10 border-red-500/30 text-red-300";
    } else {
      return "bg-green-500/10 border-green-500/30 text-green-300";
    }
  };

  const getStatusText = (isLocked: boolean, isVerified: boolean) => {
    if (isLocked && !isVerified) {
      return "Locked - Verify to unlock";
    } else {
      return "Available";
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <h1 className="text-4xl font-bold text-slate-50 mb-2">Profile</h1>
            <p className="text-slate-400">Manage your account and view all deals</p>
          </div>
          <div className="flex items-center gap-4">
            <SparkleButton
              onClick={() => router.push("/deals")}
              className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 px-4 py-2 rounded-lg hover:bg-cyan-500/20 transition"
            >
              <ArrowRight size={20} />
              Claim Deals
            </SparkleButton>
            <SparkleButton
              onClick={handleLogout}
              className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-2 rounded-lg hover:bg-red-500/20 transition"
            >
              <LogOut size={20} />
              Logout
            </SparkleButton>
          </div>
        </motion.div>

        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-8"
        >

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-xs text-slate-400 mb-1">Name</p>
              <p className="text-lg font-semibold text-slate-50">{user?.name}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Email</p>
              <p className="text-lg font-semibold text-slate-50">{user?.email}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Role</p>
              <p className="text-lg font-semibold text-slate-50 capitalize">
                {user?.role}
              </p>
            </div>
         <AnimatedClouds />

            <div>
              <p className="text-xs text-slate-400 mb-1">Verification Status</p>
              <div className="flex items-center gap-2">
                <p
                  className={`text-lg font-semibold ${
                    user?.isVerified ? "text-green-400" : "text-yellow-400"
                  }`}
                >
                  {user?.isVerified ? "✓ Verified" : "⏳ Unverified"}
                </p>
                
                {!user?.isVerified && (
                  <button
                    onClick={handleVerify}
                    disabled={verifying}
                    className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 px-3 py-1 rounded-lg hover:bg-cyan-500/20 transition disabled:opacity-50"
                  >
                    <Shield size={16} />
                    {verifying ? "Verifying..." : "Verify"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {verificationSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 bg-green-500/10 border border-green-500/30 text-green-300 px-4 py-3 rounded-lg flex items-center gap-2"
            >
              <CheckCircle size={20} />
              Verification successful! You can now access locked deals.
            </motion.div>
          )}
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/50 border border-slate-800 rounded-xl p-6"
          >
            <p className="text-sm text-slate-400 mb-2">Total Deals</p>
            <p className="text-3xl font-bold text-slate-50">{deals.length}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900/50 border border-slate-800 rounded-xl p-6"
          >
            <p className="text-sm text-slate-400 mb-2">Available</p>
            <p className="text-3xl font-bold text-green-400">
              {deals.filter((d) => !d.isLocked).length}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-slate-900/50 border border-slate-800 rounded-xl p-6"
          >
            <p className="text-sm text-slate-400 mb-2">Locked</p>
            <p className="text-3xl font-bold text-red-400">
              {deals.filter((d) => d.isLocked).length}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-900/50 border border-slate-800 rounded-xl p-6"
          >
            <p className="text-sm text-slate-400 mb-2">Categories</p>
            <p className="text-3xl font-bold text-cyan-400">
              {new Set(deals.map((d) => d.category)).size}
            </p>
          </motion.div>
        </div>

        {/* All Deals List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-xl font-semibold text-slate-50">
              All Available Deals
            </h2>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
            </div>
          ) : deals.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-slate-400 mb-4">No deals available</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {deals.map((deal, index) => (
                <motion.div
                  key={deal._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  className={`px-6 py-4 hover:bg-slate-800/50 transition ${
                    deal.isLocked && !user?.isVerified ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-50">
                          {deal.title}
                        </h3>
                        <div
                          className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs ${getStatusColor(
                            deal.isLocked,
                            user?.isVerified
                          )}`}
                        >
                          {getStatusIcon(deal.isLocked, user?.isVerified)}
                          <span className="font-medium">
                            {getStatusText(deal.isLocked, user?.isVerified)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-400 mb-2">
                        <span>{deal.partnerName}</span>
                        <span>•</span>
                        <span>{deal.category}</span>
                        <span>•</span>
                        <span>{new Date(deal.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-cyan-300 mb-2">
                        {deal.discountDetails}
                      </p>
                      {deal.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {deal.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      {(!deal.isLocked || user?.isVerified) && (
                        <SparkleButton
                          href={`/deals/${deal._id}`}
                          className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-4 py-2 rounded-lg hover:bg-indigo-500/20 transition"
                        >
                          View Deal <ArrowRight size={16} />
                        </SparkleButton>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
