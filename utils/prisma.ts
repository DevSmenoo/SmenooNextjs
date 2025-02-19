import { PrismaClient } from '@prisma/client';

// Singleton pattern to create a single instance of PrismaClient and avoid multiple connections to the database

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma; // ✅ Make sure to export it as default
