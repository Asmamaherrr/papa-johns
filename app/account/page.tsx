"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/authContext"
import { User, MapPin, Clock, ShoppingBag, Settings, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AccountPage() {
  const { state, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!state.isAuthenticated && !state.isLoading) {
      router.push("/login")
    }
  }, [state.isAuthenticated, state.isLoading, router])

  if (state.isLoading || !state.isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const recentOrders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      items: ["The Works", "Pepperoni"],
      total: 29.98,
      status: "Delivered",
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      items: ["BBQ Chicken", "Margherita"],
      total: 29.98,
      status: "Delivered",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Account</h1>
            <p className="text-muted-foreground">Welcome back, {state.user?.firstName}!</p>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">
                    {state.user?.firstName} {state.user?.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{state.user?.email}</p>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Addresses</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">No saved addresses yet</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Add Address
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5" />
                  <span>Recent Orders</span>
                </CardTitle>
                <CardDescription>Your order history and tracking</CardDescription>
              </CardHeader>
              <CardContent>
                {recentOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No orders yet</p>
                    <p className="text-sm text-muted-foreground mb-4">Start by ordering some delicious pizza!</p>
                    <Link href="/">
                      <Button>Order Now</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div>
                              <p className="font-medium">Order #{order.id}</p>
                              <p className="text-sm text-muted-foreground flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {new Date(order.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>
                              {order.status}
                            </Badge>
                            <p className="text-sm font-medium mt-1">${order.total.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">{order.items.join(", ")}</div>
                        <div className="flex space-x-2 mt-3">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            Reorder
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
