"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { Loader2 } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { isLoaded, isSignedIn, getToken } = useAuth();

  useEffect(() => {
    async function redirectBasedOnRole() {
      if (!isLoaded) return;

      if (!isSignedIn) {
        router.push("/auth/sign-in");
        return;
      }

      try {
        const token = await getToken({ skipCache: true });
        
        // Fetch user from backend to get their role
        const res = await axios.get("http://localhost:5000/api/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const role = res.data?.data?.role;
        
        switch (role) {
          case "ADMIN":
            router.push("/admin");
            break;
          case "FLEET_MANAGER":
            router.push("/fleet-manager");
            break;
          case "DRIVER":
            router.push("/driver");
            break;
          case "SAFETY_OFFICER":
            router.push("/safety-officer");
            break;
          case "FINANCIAL_ANALYST":
            router.push("/financial-analyst");
            break;
          default:
            console.error("Unknown or missing role:", role);
            // Fallback to a default page or show an error
            break;
        }
      } catch (err: any) {
        console.error("Error fetching user role:", err);
        // If 401 or 404, maybe they need to set up their organization or sign in again
        if (err.response?.status === 404 || err.response?.status === 401 || err.response?.status === 403) {
            router.push("/auth/create-organization");
        }
      }
    }

    redirectBasedOnRole();
  }, [isLoaded, isSignedIn, getToken, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
      <h1 className="text-2xl font-semibold text-gray-800">Loading your workspace...</h1>
      <p className="text-gray-500 mt-2">Please wait while we redirect you.</p>
    </div>
  );
}
