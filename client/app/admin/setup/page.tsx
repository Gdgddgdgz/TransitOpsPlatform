"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { Loader2 } from "lucide-react";

export default function AdminSetupPage() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function setupOrganization() {
      if (!isLoaded) return;
      
      if (!isSignedIn) {
        router.push("/auth/sign-in");
        return;
      }

      try {
        const token = await getToken();
        
        // This endpoint doesn't strictly need authUser middleware according to comments,
        // but it uses getAuth(req) so it needs the token in the request header.
        await api.post(
          "/admin/setup",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        router.push("/admin");
      } catch (err: any) {
        console.error("Error setting up organization:", err);
        setError(err.response?.data?.message || "Failed to setup organization. Please try again.");
      }
    }

    setupOrganization();
  }, [isLoaded, isSignedIn, getToken, router]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 flex-col text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Setup Failed</h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
      <h1 className="text-2xl font-semibold text-gray-800">Setting up your organization...</h1>
      <p className="text-gray-500 mt-2">Please wait while we configure your dashboard.</p>
    </div>
  );
}
