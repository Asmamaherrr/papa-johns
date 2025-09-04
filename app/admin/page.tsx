"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, ShoppingBag, Users, TrendingUp, Clock, CheckCircle, AlertCircle, Pizza } from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Today's Revenue",
      value: "$2,847.50",
      change: "+12.5%",
      icon: DollarSign,
      trend: "up",
    },
    {
      title: "Orders Today",
      value: "47",
      change: "+8.2%",
      icon: ShoppingBag,
      trend: "up",
    },
    {
      title: "Active Users",
      value: "1,234",
      change: "+3.1%",
      icon: Users,
      trend: "up",
    },
    {
      title: "Avg Order Value",
      value: "$28.45",
      change: "-2.3%",
      icon: TrendingUp,
      trend: "down",
    },
  ]

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "John Smith",
      items: ["The Works", "Pepperoni"],
      total: 29.98,
      status: "preparing",
      time: "5 min ago",
    },
    {
      id: "ORD-002",
      customer: "Sarah Johnson",
      items: ["BBQ Chicken"],
      total: 15.99,
      status: "ready",
      time: "12 min ago",
    },
    {
      id: "ORD-003",
      customer: "Mike Davis",
      items: ["Margherita", "The Works"],
      total: 30.98,
      status: "delivered",
      time: "25 min ago",
    },
    {
      id: "ORD-004",
      customer: "Lisa Wilson",
      items: ["Pepperoni"],
      total: 12.99,
      status: "preparing",
      time: "8 min ago",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "preparing":
        return "bg-yellow-100 text-yellow-800"
      case "ready":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "preparing":
        return <Clock className="w-3 h-3" />
      case "ready":
        return <AlertCircle className="w-3 h-3" />
      case "delivered":
        return <CheckCircle className="w-3 h-3" />
      default:
        return <Clock className="w-3 h-3" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening at your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {stat.change} from yesterday
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5" />
              <span>Recent Orders</span>
            </CardTitle>
            <CardDescription>Latest orders from your customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Pizza className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.items.join(", ")}</p>
                      <p className="text-xs text-muted-foreground">{order.time}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-medium">${order.total.toFixed(2)}</p>
                    <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </div>
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full bg-transparent">
                View All Orders
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-20 flex flex-col items-center justify-center space-y-2">
                <Pizza className="w-6 h-6" />
                <span className="text-sm">Add Menu Item</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
              >
                <ShoppingBag className="w-6 h-6" />
                <span className="text-sm">View Orders</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
              >
                <Users className="w-6 h-6" />
                <span className="text-sm">Manage Users</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
              >
                <TrendingUp className="w-6 h-6" />
                <span className="text-sm">View Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Performance</CardTitle>
          <CardDescription>Key metrics for today's operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">94%</div>
              <p className="text-sm text-muted-foreground">Order Accuracy</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">18 min</div>
              <p className="text-sm text-muted-foreground">Avg Delivery Time</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">4.8</div>
              <p className="text-sm text-muted-foreground">Customer Rating</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
