"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cartContext"
import { Plus } from "lucide-react"

interface MenuItem {
  id: number
  name: string
  price: number
  image: string
}

interface AddToCartButtonProps {
  item: MenuItem
}

export function AddToCartButton({ item }: AddToCartButtonProps) {
  const { dispatch } = useCart()

  const addToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      },
    })
  }

  return (
    <Button onClick={addToCart} className="w-full bg-red-600 hover:bg-red-700">
      <Plus className="w-4 h-4 mr-2" />
      Add to Cart
    </Button>
  )
}
