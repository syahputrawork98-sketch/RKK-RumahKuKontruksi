import { PrismaClient } from '@prisma/client';
import { cleanupDatabase } from './cleanup.js';
import { createSeedContext } from './context.js';

const prisma = new PrismaClient();

async function runSeed() {
  const context = createSeedContext();

  try {
    // 1. Cleanup
    await cleanupDatabase(prisma);

    // Note: In Batch 30A, the main data creation logic still resides in prisma/seed.js
    // This runSeed function serves as the orchestrator foundation.
    
    console.log('--- MODULAR SEED FOUNDATION INITIALIZED ---');
    
    return { prisma, context };
  } catch (error) {
    console.error('Seed execution failed:', error);
    process.exit(1);
  }
}

export { runSeed, prisma };
