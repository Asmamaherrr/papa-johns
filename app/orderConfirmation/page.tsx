"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, Phone } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { apiClient } from "@/lib/apiClient"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      if (orderId) {
        try {
          const result = await apiClient.getOrder(orderId)
          if (result.success) {
            setOrder(result.order)
          }
        } catch (error) {
          console.error("Failed to fetch order:", error)
        }
      }
      setLoading(false)
    }

    fetchOrder()
  }, [orderId])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading order details...</p>
        </div>
      </div>
    )
  }

  const defaultOrderNumber = Math.random().toString(36).substr(2, 9).toUpperCase()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold">Order Confirmed!</h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your order. We're preparing your delicious pizza right now!
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
              <CardDescription>Order #{order?.id || defaultOrderNumber}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center space-x-2 text-primary">
                <Clock className="w-5 h-5" />
                <span className="font-medium">
                  Estimated {order?.type === "delivery" ? "delivery" : "pickup"}: 25-35 minutes
                </span>
              </div>

              {order && (
                <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-left">
                  <h3 className="font-semibold">Order Summary</h3>
                  <div className="space-y-1 text-sm">
                    {order.items.map((item: any, index: number) => (
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
              )}

              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <h3 className="font-semibold">What happens next?</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• We'll start preparing your order immediately</li>
                  <li>• You'll receive SMS updates on your order status</li>
                  <li>• Our driver will contact you when they're nearby</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="outline">Order More</Button>
            </Link>
            <Button className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Call Store</span>
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Questions about your order? Call us at (555) 123-PAPA</p>
          </div>
        </div>
      </div>
    </div>
  )
}
