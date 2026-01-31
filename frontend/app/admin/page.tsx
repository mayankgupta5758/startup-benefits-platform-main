"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { dealsAPI, getToken, clearToken, getUser } from "@/lib/api";
import { LogOut, Plus, CheckCircle, XCircle } from "lucide-react";

interface DealFormData {
  title: string;
  slug: string;
  description: string;
  category: string;
  partnerName: string;
  partnerLogoUrl: string;
  discountDetails: string;
  isLocked: boolean;
  eligibilityDescription: string;
  tags: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<DealFormData>({
    title: "",
    slug: "",
    description: "",
    category: "",
    partnerName: "",
    partnerLogoUrl: "",
    discountDetails: "",
    isLocked: false,
    eligibilityDescription: "",
    tags: "",
  });

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }

    const userData = getUser();
    if (!userData?.isAdmin) {
      router.push("/dashboard");
      return;
    }

    setUser(userData);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const tagsArray = formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag);

      await dealsAPI.create({
        ...formData,
        tags: tagsArray,
      });

      setSuccess(true);
      setFormData({
        title: "",
        slug: "",
        description: "",
        category: "",
        partnerName: "",
        partnerLogoUrl: "",
        discountDetails: "",
        isLocked: false,
        eligibilityDescription: "",
        tags: "",
      });
    } catch (err: any) {
      setError(err.response?.data?.error?.message || "Failed to create deal");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearToken();
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <h1 className="text-4xl font-bold text-slate-50 mb-2">Admin Panel</h1>
            <p className="text-slate-400">Create and manage startup deals</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-2 rounded-lg hover:bg-red-500/20 transition"
          >
            <LogOut size={20} />
            Logout
          </motion.button>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900/50 border border-slate-800 rounded-xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Plus size={24} className="text-indigo-400" />
            <h2 className="text-2xl font-semibold text-slate-50">Create New Deal</h2>
          </div>

          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-green-500/10 border border-green-500/30 text-green-300 px-4 py-3 rounded-lg mb-6 flex items-center gap-2"
            >
              <CheckCircle size={20} />
              Deal created successfully!
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg mb-6 flex items-center gap-2"
            >
              <XCircle size={20} />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="50% Off Pro Plan"
                  required
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="figma-50-off-pro"
                  required
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 focus:outline-none focus:border-indigo-500 transition"
                >
                  <option value="">Select category</option>
                  <option value="Design">Design</option>
                  <option value="Development">Development</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Communication">Communication</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Productivity">Productivity</option>
                  <option value="Security">Security</option>
                  <option value="Analytics">Analytics</option>
                  <option value="Database">Database</option>
                  <option value="Payments">Payments</option>
                </select>
              </div>

              {/* Partner Name */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Partner Name *
                </label>
                <input
                  type="text"
                  name="partnerName"
                  value={formData.partnerName}
                  onChange={handleChange}
                  placeholder="Figma"
                  required
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              {/* Partner Logo URL */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Partner Logo URL
                </label>
                <input
                  type="url"
                  name="partnerLogoUrl"
                  value={formData.partnerLogoUrl}
                  onChange={handleChange}
                  placeholder="https://cdn.simpleicons.org/figma"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              {/* Discount Details */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Discount Details *
                </label>
                <input
                  type="text"
                  name="discountDetails"
                  value={formData.discountDetails}
                  onChange={handleChange}
                  placeholder="50% off annual Pro plan ($96/year instead of $192)"
                  required
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Get 50% discount on Figma Pro annual subscription for startups"
                  required
                  rows={3}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              {/* Eligibility Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Eligibility Description
                </label>
                <input
                  type="text"
                  name="eligibilityDescription"
                  value={formData.eligibilityDescription}
                  onChange={handleChange}
                  placeholder="Founders & early-stage startups with < $1M funding"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              {/* Tags */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="design, ui/ux, tools"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              {/* Is Locked */}
              <div className="md:col-span-2">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="isLocked"
                    checked={formData.isLocked}
                    onChange={handleChange}
                    className="w-4 h-4 text-indigo-600 bg-slate-800 border-slate-700 rounded focus:ring-indigo-500 focus:ring-2"
                  />
                  <span className="text-sm font-medium text-slate-300">
                    Lock this deal (requires admin approval for claims)
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full mt-8 py-3 bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 transition"
            >
              {loading ? "Creating Deal..." : "Create Deal"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
