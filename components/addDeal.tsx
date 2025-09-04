"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cartContext"
import { ShoppingCart } from "lucide-react"

interface Deal {
  id: number
  title: string
  description: string
  dealPrice: number
}

interface AddDealToCartButtonProps {
  deal: Deal
}

export function AddDealToCartButton({ deal }: AddDealToCartButtonProps) {
  const { dispatch } = useCart()

  const addDealToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: deal.id + 1000, // Add 1000 to deal IDs to avoid conflicts with regular menu items
        name: deal.title,
        price: deal.dealPrice,
        image: "/family-deal-pizza-combo.png", // Use deal image placeholder
      },
    })
  }

  return (
    <Button onClick={addDealToCart} className="w-full bg-red-600 hover:bg-red-700 text-white">
      <ShoppingCart className="w-4 h-4 mr-2" />
      Order This Deal
    </Button>
  )
}
