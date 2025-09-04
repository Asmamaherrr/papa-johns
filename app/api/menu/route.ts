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
    nutritionalInfo: {
      calories: 320,
      protein: 15,
      carbs: 35,
      fat: 12,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Pepperoni",
    description: "Classic pepperoni with our signature sauce and fresh mozzarella",
    price: 12.99,
    image: "/pepperoni-pizza.png",
    category: "Classic",
    rating: 4.9,
    available: true,
    ingredients: ["Pepperoni", "Mozzarella", "Tomato Sauce"],
    nutritionalInfo: {
      calories: 280,
      protein: 12,
      carbs: 30,
      fat: 10,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "BBQ Chicken",
    description: "Grilled chicken, BBQ sauce, red onions, and fresh cilantro",
    price: 15.99,
    image: "/bbq-chicken-pizza-with-red-onions-and-cilantro.png",
    category: "Specialty",
    rating: 4.7,
    available: true,
    ingredients: ["Grilled Chicken", "BBQ Sauce", "Red Onions", "Cilantro"],
    nutritionalInfo: {
      calories: 290,
      protein: 18,
      carbs: 32,
      fat: 8,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Margherita",
    description: "Fresh mozzarella, Roma tomatoes, fresh basil, and olive oil",
    price: 13.99,
    image: "/fresh-margherita-pizza-with-basil-and-tomatoes.png",
    category: "Classic",
    rating: 4.6,
    available: true,
    ingredients: ["Fresh Mozzarella", "Roma Tomatoes", "Fresh Basil", "Olive Oil"],
    nutritionalInfo: {
      calories: 260,
      protein: 11,
      carbs: 28,
      fat: 9,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const available = searchParams.get("available")
  const search = searchParams.get("search")

  let filteredItems = menuItems

  if (category && category !== "all") {
    filteredItems = filteredItems.filter((item) => item.category === category)
  }

  if (available === "true") {
    filteredItems = filteredItems.filter((item) => item.available)
  }

  if (search) {
    filteredItems = filteredItems.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()),
    )
  }

  return NextResponse.json({
    success: true,
    items: filteredItems,
    total: filteredItems.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, price, image, category, ingredients, nutritionalInfo } = body

    // Generate new ID
    const newId = Math.max(...menuItems.map((item) => item.id)) + 1

    const newItem = {
      id: newId,
      name,
      description,
      price: Number.parseFloat(price),
      image: image || "/placeholder.svg",
      category,
      rating: 0,
      available: true,
      ingredients: ingredients || [],
      nutritionalInfo: nutritionalInfo || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    menuItems.push(newItem)

    return NextResponse.json({
      success: true,
      item: newItem,
      message: "Menu item created successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create menu item",
      },
      { status: 500 },
    )
  }
}
