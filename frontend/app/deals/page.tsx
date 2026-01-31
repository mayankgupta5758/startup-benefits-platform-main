"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { dealsAPI, getToken } from "@/lib/api";
import { Lock } from "lucide-react";
import { SparkleButton } from "@/components/SparkleButton";
import { AnimatedClouds } from "@/components/AnimatedClouds";

interface Deal {
  _id: string;
  title: string;
  description: string;
  category: string;
  partnerName: string;
  partnerLogoUrl?: string;
  discountDetails: string;
  isLocked: boolean;
  tags?: string[];
}

export default function DealsPage() {
  const router = useRouter();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedAccess, setSelectedAccess] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Check authentication
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }

    fetchDeals();
  }, [selectedCategory, selectedAccess, searchTerm]);

  const fetchDeals = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (selectedCategory) params.category = selectedCategory;
      if (selectedAccess) params.access = selectedAccess;
      if (searchTerm) params.search = searchTerm;

      const response = await dealsAPI.getAll(params);
      setDeals(response.data.deals);
    } catch (err) {
      console.error("Failed to fetch deals", err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Design",
    "Development",
    "Payments",
    "Infrastructure",
    "Analytics",
    "Productivity",
    "Communication",
    "Marketing",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold text-slate-50 mb-2">
            Browse Deals
          </h1>
          <p className="text-slate-400">
            Curated SaaS benefits for founders and early-stage startups
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Search
              </label>
              <input
                type="text"
                placeholder="Find deals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 focus:outline-none focus:border-indigo-500"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Access Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Access Level
              </label>
              <select
                value={selectedAccess}
                onChange={(e) => setSelectedAccess(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 focus:outline-none focus:border-indigo-500"
              >
                <option value="">All Deals</option>
                <option value="locked">Locked (Verified Only)</option>
                <option value="unlocked">Public Access</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Deals Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
          </div>
        ) : deals.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-slate-400"
          >
            <p>No deals found. Try adjusting your filters.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deals.map((deal, index) => (
              <motion.div
                key={deal._id}
                initial={{
                  opacity: 0,
                  x: index % 3 === 0 ? -50 : index % 3 === 1 ? 0 : 50,
                  y: 50,
                  scale: 0.8
                }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                whileHover={{ y: -5, scale: 1.02 }}
                whileInView={{
                  x: 0,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6, ease: "easeOut" }
                }}
                viewport={{ once: true, amount: 0.2 }}
                className="group"
              >
                <Link href={`/deals/${deal._id}`}>
                  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-indigo-500/50 transition h-full cursor-pointer relative overflow-hidden">
                    {/* Locked Badge */}
                    {deal.isLocked && (
                      <div className="absolute top-4 right-4 bg-red-500/10 border border-red-500/30 rounded-lg p-2">
                        <Lock size={16} className="text-red-400" />
                      </div>
                    )}

                    {/* Partner Logo */}
                    {deal.partnerLogoUrl && (
                      <div className="mb-4">
                        <img
                          src={deal.partnerLogoUrl}
                          alt={deal.partnerName}
                          className="h-10 w-10 rounded object-contain"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <h3 className="text-lg font-semibold text-slate-50 mb-2 group-hover:text-indigo-400 transition">
                      {deal.title}
                    </h3>
                    <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                      {deal.discountDetails}
                    </p>

                    {/* Category & Partner */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-block bg-indigo-500/10 text-indigo-300 text-xs px-3 py-1 rounded-full">
                        {deal.category}
                      </span>
                      <span className="text-xs text-slate-400">
                        {deal.partnerName}
                      </span>
                    </div>

                    {/* Tags */}
                    {deal.tags && deal.tags.length > 0 && (
                      <div className="flex gap-2 flex-wrap mb-4">
                        {deal.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* CTA */}
                    <SparkleButton
                      onClick={() => router.push(`/deals/${deal._id}`)}
                      className="w-full mt-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg transition text-sm"
                    >
                      View Details
                    </SparkleButton>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
