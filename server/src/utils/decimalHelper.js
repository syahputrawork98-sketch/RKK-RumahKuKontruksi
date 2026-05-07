/**
 * Recursively converts Decimal values from Prisma to numbers
 * @param {any} obj - The object or array to process
 * @returns {any} - The object with Decimal values converted to numbers
 */
export const serializeDecimal = (obj) => {
  if (obj === null || obj === undefined) return obj;

  if (Array.isArray(obj)) {
    return obj.map(item => serializeDecimal(item));
  }

  if (typeof obj === 'object') {
    // Check if it's a Prisma Decimal object
    if (obj.constructor && obj.constructor.name === 'Decimal') {
      return obj.toNumber();
    }

    const newObj = {};
    for (const [key, value] of Object.entries(obj)) {
      newObj[key] = serializeDecimal(value);
    }
    return newObj;
  }

  return obj;
};
