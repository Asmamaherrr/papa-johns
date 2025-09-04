import { type NextRequest, NextResponse } from "next/server"

// Mock analytics data
const generateAnalytics = () => {
  const today = new Date()
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

  return {
    revenue: {
      today: 2847.5,
      yesterday: 2534.25,
      thisWeek: 18234.75,
      lastWeek: 16892.3,
      thisMonth: 72456.8,
      lastMonth: 68234.5,
    },
    orders: {
      today: 47,
      yesterday: 42,
      thisWeek: 312,
      lastWeek: 289,
      thisMonth: 1247,
      lastMonth: 1189,
    },
    customers: {
      total: 1234,
      new: 23,
      returning: 24,
      activeToday: 47,
    },
    popularItems: [
      { name: "Pepperoni", orders: 156, revenue: 2024.44 },
      { name: "The Works", orders: 134, revenue: 2276.66 },
      { name: "BBQ Chicken", orders: 98, revenue: 1567.02 },
      { name: "Margherita", orders: 87, revenue: 1217.13 },
    ],
    ordersByHour: [
      { hour: "11:00", orders: 3 },
      { hour: "12:00", orders: 8 },
      { hour: "13:00", orders: 12 },
      { hour: "14:00", orders: 15 },
      { hour: "15:00", orders: 9 },
      { hour: "16:00", orders: 7 },
      { hour: "17:00", orders: 18 },
      { hour: "18:00", orders: 25 },
      { hour: "19:00", orders: 22 },
      { hour: "20:00", orders: 16 },
      { hour: "21:00", orders: 11 },
      { hour: "22:00", orders: 5 },
    ],
    performance: {
      averageOrderValue: 28.45,
      orderAccuracy: 94,
      averageDeliveryTime: 18,
      customerSatisfaction: 4.8,
    },
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const period = searchParams.get("period") || "today"

  const analytics = generateAnalytics()

  return NextResponse.json({
    success: true,
    analytics,
    period,
    generatedAt: new Date().toISOString(),
  })
}
