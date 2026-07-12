import { PrismaClient } from "../generated/prisma/index.js";

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"], // remove "query" in production if you don't want SQL logs
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}