"use client"

import { useState } from "react"
import { createOrder } from "@/app/actions/orderActions"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = await createOrder(formData)

    if (result.success) {
      setMessage(`✅ Order created! ID: ${result.order.id}`)
    } else {
      setMessage("❌ Failed to create order")
    }

    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Admin Login / Create Order</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="firstName" placeholder="First Name" className="w-full border p-2 rounded" />
        <input name="lastName" placeholder="Last Name" className="w-full border p-2 rounded" />
        <input name="email" placeholder="Email" className="w-full border p-2 rounded" />
        <input name="phone" placeholder="Phone" className="w-full border p-2 rounded" />
        <input name="address" placeholder="Address" className="w-full border p-2 rounded" />
        <input name="city" placeholder="City" className="w-full border p-2 rounded" />
        <input name="zipCode" placeholder="Zip Code" className="w-full border p-2 rounded" />

        {/* hidden values for demo */}
        <input type="hidden" name="items" value={JSON.stringify([{ id: "1", name: "Pizza", qty: 2 }])} />
        <input type="hidden" name="total" value="20.5" />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          {loading ? "Creating..." : "Create Order"}
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  )
}
