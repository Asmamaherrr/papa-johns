"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, CheckCircle, AlertCircle, Search, Filter, Pizza, MapPin, Phone } from "lucide-react"

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const orders = [
    {
      id: "ORD-001",
      customer: "John Smith",
      phone: "(555) 123-4567",
      address: "123 Main St, Anytown, ST 12345",
      items: [
        { name: "The Works", quantity: 1, price: 16.99 },
        { name: "Pepperoni", quantity: 1, price: 12.99 },
      ],
      total: 32.97,
      status: "preparing",
      orderTime: "2024-01-15 14:30",
      estimatedDelivery: "2024-01-15 15:15",
      type: "delivery",
    },
    {
      id: "ORD-002",
      customer: "Sarah Johnson",
      phone: "(555) 987-6543",
      address: "456 Oak Ave, Anytown, ST 12345",
      items: [{ name: "BBQ Chicken", quantity: 1, price: 15.99 }],
      total: 18.98,
      status: "ready",
      orderTime: "2024-01-15 14:18",
      estimatedDelivery: "2024-01-15 15:00",
      type: "delivery",
    },
    {
      id: "ORD-003",
      customer: "Mike Davis",
      phone: "(555) 456-7890",
      address: "Pickup",
      items: [{ name: "Margherita", quantity: 2, price: 13.99 }],
      total: 27.98,
      status: "delivered",
      orderTime: "2024-01-15 13:45",
      estimatedDelivery: "2024-01-15 14:15",
      type: "pickup",
    },
    {
      id: "ORD-004",
      customer: "Lisa Wilson",
      phone: "(555) 321-0987",
      address: "789 Pine St, Anytown, ST 12345",
      items: [
        { name: "Pepperoni", quantity: 1, price: 12.99 },
        { name: "The Works", quantity: 1, price: 16.99 },
      ],
      total: 32.97,
      status: "preparing",
      orderTime: "2024-01-15 14:22",
      estimatedDelivery: "2024-01-15 15:10",
      type: "delivery",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "preparing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "ready":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "out-for-delivery":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "preparing":
        return <Clock className="w-3 h-3" />
      case "ready":
        return <AlertCircle className="w-3 h-3" />
      case "out-for-delivery":
        return <Pizza className="w-3 h-3" />
      case "delivered":
        return <CheckCircle className="w-3 h-3" />
      default:
        return <Clock className="w-3 h-3" />
    }
  }

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // In a real app, this would update the order in the database
    console.log(`Updating order ${orderId} to ${newStatus}`)
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">Manage and track all customer orders</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search orders by customer name or order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="preparing">Preparing</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="out-for-delivery">Out for Delivery</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Order {order.id}</CardTitle>
                  <CardDescription>
                    {new Date(order.orderTime).toLocaleString()} • {order.type}
                  </CardDescription>
                </div>
                <Badge className={`${getStatusColor(order.status)} border`}>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status.replace("-", " ")}</span>
                  </div>
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Customer Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Customer Information</h4>
                  <div className="space-y-1 text-sm">
                    <p className="font-medium">{order.customer}</p>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Phone className="w-3 h-3" />
                      <span>{order.phone}</span>
                    </div>
                    {order.type === "delivery" && (
                      <div className="flex items-start space-x-2 text-muted-foreground">
                        <MapPin className="w-3 h-3 mt-0.5" />
                        <span>{order.address}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Order Details</h4>
                  <div className="space-y-1 text-sm">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="border-t pt-1 flex justify-between font-medium">
                      <span>Total:</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-2 border-t">
                {order.status === "preparing" && (
                  <Button size="sm" onClick={() => updateOrderStatus(order.id, "ready")}>
                    Mark Ready
                  </Button>
                )}
                {order.status === "ready" && order.type === "delivery" && (
                  <Button size="sm" onClick={() => updateOrderStatus(order.id, "out-for-delivery")}>
                    Out for Delivery
                  </Button>
                )}
                {order.status === "ready" && order.type === "pickup" && (
                  <Button size="sm" onClick={() => updateOrderStatus(order.id, "delivered")}>
                    Mark Picked Up
                  </Button>
                )}
                {order.status === "out-for-delivery" && (
                  <Button size="sm" onClick={() => updateOrderStatus(order.id, "delivered")}>
                    Mark Delivered
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  Contact Customer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Pizza className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No orders found matching your criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
