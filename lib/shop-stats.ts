import { products } from "./products"
import { useApproval } from "./seller-approval-context"

export const getShopStats = () => {
  // These would normally come from a backend, but we'll compute from local data
  return {
    totalProducts: products.length,
    totalCategories: 10,
    activeSellers: 124,
    totalOrders: 5893,
    avgRating: 4.6,
    verifiedBadge: true,
  }
}

export const getProductStats = () => {
  return {
    total: products.length,
    inStock: products.length,
    byCategory: {
      electronics: products.filter((p) => p.category === "electronics").length,
      fashion: products.filter((p) => p.category === "fashion").length,
      home: products.filter((p) => p.category === "home-kitchen").length,
      books: products.filter((p) => p.category === "books").length,
      sports: products.filter((p) => p.category === "sports").length,
      beauty: products.filter((p) => p.category === "beauty").length,
      toys: products.filter((p) => p.category === "toys").length,
      automotive: products.filter((p) => p.category === "automotive").length,
      garden: products.filter((p) => p.category === "garden").length,
    },
  }
}

export const getCatalogStats = () => {
  return {
    totalItems: products.length,
    topCategory: "Electronics",
    topProduct: products[0].name,
    averagePrice: Math.round((products.reduce((sum, p) => sum + p.price, 0) / products.length) * 100) / 100,
    avgRating: 4.6,
  }
}
