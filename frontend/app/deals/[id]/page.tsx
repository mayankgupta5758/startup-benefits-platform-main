"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { dealsAPI, claimsAPI, authAPI, getToken, getUser } from "@/lib/api";
import { Lock, Check, Clock, ArrowLeft } from "lucide-react";
import { SparkleButton } from "@/components/SparkleButton";

interface Deal {
  _id: string;
  title: string;
  description: string;
  category: string;
  partnerName: string;
  partnerLogoUrl?: string;
  discountDetails: string;
  eligibilityDescription?: string;
  isLocked: boolean;
  tags?: string[];
}

export default function DealDetailPage() {
  const router = useRouter();
  const params = useParams();
  const dealId = params.id as string;

  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [claimStatus, setClaimStatus] = useState<string>("");
  const [error, setError] = useState("");
  const [user, setUserData] = useState<any>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }

    fetchUser();
    fetchDeal();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await authAPI.getProfile();
      setUserData(response.data.user);
    } catch (err) {
      console.error("Failed to fetch user", err);
    }
  };

  const fetchDeal = async () => {
    try {
      const response = await dealsAPI.getById(dealId);
      setDeal(response.data.deal);
    } catch (err) {
      console.error("Failed to fetch deal", err);
      setError("Deal not found");
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = async () => {
    if (!deal) return;

    console.log("Deal isLocked:", deal.isLocked);
    console.log("User isVerified:", user?.isVerified);
    console.log("User data:", user);

    // Check if deal is locked and user is not verified
    if (deal.isLocked && user && !user.isVerified) {
      setError(
        "This deal requires founder verification. Your account is not verified yet."
      );
      return;
    }

    setClaiming(true);
    setError("");

    try {
      const response = await claimsAPI.claimDeal(deal._id);
      setClaimed(true);
      setClaimStatus(response.data.claim.status);

      // Show success message
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.error?.message ||
        "Failed to claim deal. Try again.";
      setError(errorMsg);
    } finally {
      setClaiming(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-50 mb-4">
            Deal not found
          </h1>
          <Link href="/deals" className="text-cyan-400 hover:text-cyan-300">
            Back to deals
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <SparkleButton
            href="/deals"
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to deals
          </SparkleButton>
        </motion.div>

        {/* Deal Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 mb-8"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              {deal.partnerLogoUrl && (
                <img
                  src={deal.partnerLogoUrl}
                  alt={deal.partnerName}
                  className="h-12 w-12 rounded mb-4 object-contain"
                />
              )}
              <h1 className="text-4xl font-bold text-slate-50 mb-2">
                {deal.title}
              </h1>
              <p className="text-lg text-cyan-400 font-semibold">
                {deal.partnerName}
              </p>
            </div>

            {deal.isLocked && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <Lock size={24} className="text-red-400" />
              </div>
            )}
          </div>

          {/* Key Info */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <p className="text-xs text-slate-400 mb-1">Category</p>
              <p className="text-slate-50 font-semibold">{deal.category}</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <p className="text-xs text-slate-400 mb-1">Status</p>
              <p className="text-slate-50 font-semibold">
                {deal.isLocked ? "Founder Verified" : "Public"}
              </p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <p className="text-xs text-slate-400 mb-1">Benefit</p>
              <p className="text-slate-50 font-semibold">
                {deal.discountDetails}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-50 mb-3">
              About This Deal
            </h2>
            <p className="text-slate-300 leading-relaxed">
              {deal.description}
            </p>
          </div>

          {/* Eligibility */}
          {deal.eligibilityDescription && (
            <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-semibold text-indigo-300 mb-2">
                Eligibility Requirements
              </h3>
              <p className="text-sm text-indigo-200">
                {deal.eligibilityDescription}
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg mb-6"
            >
              {error}
            </motion.div>
          )}

          {/* Success Message */}
          {claimed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-green-500/10 border border-green-500/30 text-green-300 px-4 py-3 rounded-lg mb-6 flex items-center"
            >
              <Check size={20} className="mr-2" />
              Claim submitted! Redirecting to dashboard...
            </motion.div>
          )}

          {/* Claim Button */}
          {!claimed && (
            <button
              onClick={handleClaim}
              disabled={claiming}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 transition text-lg"
            >
              {claiming ? "Claiming..." : "Claim This Deal"}
            </button>
          )}

          {/* Tags */}
          {deal.tags && deal.tags.length > 0 && (
            <div className="mt-6 flex gap-2 flex-wrap">
              {deal.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm text-slate-300 bg-slate-800 px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
