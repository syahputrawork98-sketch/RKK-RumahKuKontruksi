/**
 * Seed Context Module
 * Provides a shared context for tracking created entities during the seed process.
 * This helps in maintaining relationships between different domain seeds.
 */

export const createSeedContext = () => {
  return {
    admins: {},
    superadmins: {},
    architects: {},
    foremen: {},
    supervisors: {},
    customers: {},
    projects: {},
    designRequests: {},
    rabPlans: {},
    // Add more as needed during domain modularization
  };
};
