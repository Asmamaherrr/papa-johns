import { type NextRequest, NextResponse } from "next/server"

// Mock menu database
const menuItems: any[] = [
  {
    id: 1,
    name: "The Works",
    description: "Pepperoni, Italian sausage, salami, mushrooms, black olives, bell peppers, onions",
    price: 16.99,
    image: "/delicious-supreme-pizza-with-pepperoni-and-vegetab.png",
    category: "Specialty",
    rating: 4.8,
    available: true,
    ingredients: ["Pepperoni", "Italian Sausage", "Salami", "Mushrooms", "Black Olives", "Bell Peppers", "Onions"],
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const item = menuItems.find((item) => item.id === Number.parseInt(params.id))

  if (!item) {
    return NextResponse.json(
      {
        success: false,
        error: "Menu item not found",
      },
      { status: 404 },
    )
  }

  return NextResponse.json({
    success: true,
    item,
  })
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const itemIndex = menuItems.findIndex((item) => item.id === Number.parseInt(params.id))

    if (itemIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Menu item not found",
        },
        { status: 404 },
      )
    }

    // Update menu item
    menuItems[itemIndex] = {
      ...menuItems[itemIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      item: menuItems[itemIndex],
      message: "Menu item updated successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update menu item",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const itemIndex = menuItems.findIndex((item) => item.id === Number.parseInt(params.id))

  if (itemIndex === -1) {
    return NextResponse.json(
      {
        success: false,
        error: "Menu item not found",
      },
      { status: 404 },
    )
  }

  // Remove menu item
  menuItems.splice(itemIndex, 1)

  return NextResponse.json({
    success: true,
    message: "Menu item deleted successfully",
  })
}
