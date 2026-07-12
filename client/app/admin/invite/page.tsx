"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import api from "@/lib/axios";
import { Loader2, Mail, ShieldAlert, CheckCircle2 } from "lucide-react";
import AdminLayout from "@/features/admin/shared/components/AdminLayout";

const ROLES = [
  { value: "FLEET_MANAGER", label: "Fleet Manager" },
  { value: "DRIVER", label: "Driver" },
  { value: "SAFETY_OFFICER", label: "Safety Officer" },
  { value: "FINANCIAL_ANALYST", label: "Financial Analyst" },
];

export default function InvitePage() {
  const { getToken } = useAuth();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(ROLES[0].value);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const token = await getToken();
      await api.post(
        "/admin/invite",
        { email, role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setMessage({ type: "success", text: "Invitation sent successfully!" });
      setEmail("");
      setRole(ROLES[0].value);
    } catch (err: any) {
      console.error("Error sending invite:", err);
      setMessage({ 
        type: "error", 
        text: err.response?.data?.message || "Failed to send invitation. Please try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Invite Team Member</h1>
            <p className="text-gray-500">Send an invitation to join your organization and assign their role.</p>
          </div>

          <form onSubmit={handleInvite} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="colleague@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
              >
                {ROLES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            {message && (
              <div className={`p-4 rounded-lg flex items-start gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {message.type === 'success' ? (
                  <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0" />
                ) : (
                  <ShieldAlert className="h-5 w-5 mt-0.5 shrink-0" />
                )}
                <p className="text-sm font-medium">{message.text}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Sending...
                </>
              ) : (
                "Send Invitation"
              )}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
