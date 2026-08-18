"use client"

import { useState, useEffect } from "react"
import { Zap, Clock } from "lucide-react"

export function FlashSaleBanner() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 33,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev
        
        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        }
        
        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (num: number) => num.toString().padStart(2, "0")

  return (
    <div className="bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white py-2 px-4">
      <div className="mx-auto max-w-[1500px] flex items-center justify-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 animate-pulse" />
          <span className="font-bold text-lg">FLASH SALE</span>
          <Zap className="h-5 w-5 animate-pulse" />
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span className="text-sm">Ends in:</span>
          <div className="flex items-center gap-1">
            <span className="bg-white/20 px-2 py-1 rounded font-mono font-bold">
              {formatTime(timeLeft.hours)}
            </span>
            <span className="font-bold">:</span>
            <span className="bg-white/20 px-2 py-1 rounded font-mono font-bold">
              {formatTime(timeLeft.minutes)}
            </span>
            <span className="font-bold">:</span>
            <span className="bg-white/20 px-2 py-1 rounded font-mono font-bold">
              {formatTime(timeLeft.seconds)}
            </span>
          </div>
        </div>
        <span className="text-sm font-medium">
          Up to 50% OFF + Earn 2x ASH Coins!
        </span>
      </div>
    </div>
  )
}
