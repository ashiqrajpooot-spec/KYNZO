/**
 * Currency utilities for formatting prices in Pakistani Rupees
 */

// 1 USD = 278 PKR (approximate conversion rate)
const USD_TO_PKR_RATE = 278

/**
 * Convert USD amount to PKR
 */
export function convertToPKR(usdAmount: number): number {
  return Math.round(usdAmount * USD_TO_PKR_RATE)
}

/**
 * Format price in Pakistani Rupees
 * @param usdAmount The amount in USD
 * @returns Formatted string like "Rs 8,350"
 */
export function formatINR(usdAmount: number): string {
  const pkrAmount = convertToPKR(usdAmount)
  return `Rs ${pkrAmount.toLocaleString("en-PK")}`
}

/**
 * Format price for display (including comma separators)
 * @param usdAmount The amount in USD
 * @returns Just the number with commas like "8,350"
 */
export function formatINRAmount(usdAmount: number): string {
  const pkrAmount = convertToPKR(usdAmount)
  return pkrAmount.toLocaleString("en-PK")
}


