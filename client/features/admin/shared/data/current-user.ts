import type { AppUser } from "@/lib/types";

export const CURRENT_USER: AppUser = {
  id: "u-admin",
  name: "System Admin",
  email: "admin@transitops.io",
  role: "ADMIN",
  avatarColor: "var(--color-brand-orange)",
};
