import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from "../../generated/prisma/index.js";

const globalForPrisma = globalThis;

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: ["query", "info", "warn", "error"], // remove "query" in production if you don't want SQL logs
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}