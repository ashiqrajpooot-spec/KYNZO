"use client"

// ASH Coins context for managing rewards currency system
import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface CoinsContextType {
  coins: number
  addCoins: (amount: number) => void
  spendCoins: (amount: number) => boolean
  coinsToDollars: (coins: number) => number
  dollarsToCoins: (dollars: number) => number
  getDiscountAmount: (cartTotal: number) => number
  applyDiscount: boolean
  setApplyDiscount: (apply: boolean) => void
  transactions: CoinTransaction[]
  addTransaction: (transaction: Omit<CoinTransaction, "id" | "date">) => void
}

export interface CoinTransaction {
  id: string
  type: "earned" | "spent" | "bonus"
  amount: number
  description: string
  date: Date
}

const CoinsContext = createContext<CoinsContextType | undefined>(undefined)

// 100 ASH Coins = $1, so 10% discount means using coins worth 10% of cart
const COINS_PER_DOLLAR = 100
const MAX_DISCOUNT_PERCENT = 10

const DEFAULT_COINS = 500
const DEFAULT_TRANSACTIONS: CoinTransaction[] = [
  {
    id: "welcome",
    type: "bonus",
    amount: 500,
    description: "Welcome bonus for joining ASH MART!",
    date: new Date(),
  },
]

export function CoinsProvider({ children }: { children: ReactNode }) {
  // Always initialize with default values to prevent hydration mismatch
  // Then use useEffect to sync with localStorage on client
  const [coins, setCoins] = useState<number>(DEFAULT_COINS)
  const [applyDiscount, setApplyDiscount] = useState(false)
  const [transactions, setTransactions] = useState<CoinTransaction[]>(DEFAULT_TRANSACTIONS)
  const [isHydrated, setIsHydrated] = useState(false)

  // Sync with localStorage after hydration to prevent mismatch
  useEffect(() => {
    const savedCoins = localStorage.getItem("ashmart-coins")
    const savedTransactions = localStorage.getItem("ashmart-transactions")
    
    if (savedCoins) {
      setCoins(parseInt(savedCoins))
    }
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions))
    }
    setIsHydrated(true)
  }, [])

  // Save to localStorage on change (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("ashmart-coins", coins.toString())
      localStorage.setItem("ashmart-transactions", JSON.stringify(transactions))
    }
  }, [coins, transactions, isHydrated])

  const addCoins = (amount: number) => {
    setCoins((prev) => prev + amount)
  }

  const spendCoins = (amount: number): boolean => {
    if (coins >= amount) {
      setCoins((prev) => prev - amount)
      return true
    }
    return false
  }

  const coinsToDollars = (coinAmount: number): number => {
    return coinAmount / COINS_PER_DOLLAR
  }

  const dollarsToCoins = (dollars: number): number => {
    return Math.floor(dollars * COINS_PER_DOLLAR)
  }

  // Get maximum discount amount (10% of cart total, limited by available coins)
  const getDiscountAmount = (cartTotal: number): number => {
    const maxDiscount = cartTotal * (MAX_DISCOUNT_PERCENT / 100)
    const availableDiscount = coinsToDollars(coins)
    return Math.min(maxDiscount, availableDiscount)
  }

  const addTransaction = (transaction: Omit<CoinTransaction, "id" | "date">) => {
    const newTransaction: CoinTransaction = {
      ...transaction,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date(),
    }
    setTransactions((prev) => [newTransaction, ...prev])
  }

  return (
    <CoinsContext.Provider
      value={{
        coins,
        addCoins,
        spendCoins,
        coinsToDollars,
        dollarsToCoins,
        getDiscountAmount,
        applyDiscount,
        setApplyDiscount,
        transactions,
        addTransaction,
      }}
    >
      {children}
    </CoinsContext.Provider>
  )
}

export function useCoins() {
  const context = useContext(CoinsContext)
  if (!context) {
    throw new Error("useCoins must be used within a CoinsProvider")
  }
  return context
}
