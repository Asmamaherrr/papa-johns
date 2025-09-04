"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Search, Pizza, Star } from "lucide-react"

export default function MenuPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const menuItems = [
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
    },
    {
      id: 4,
      name: "Margherita",
      description: "Fresh mozzarella, Roma tomatoes, fresh basil, and olive oil",
      price: 13.99,
      image: "/fresh-margherita-pizza-with-basil-and-tomatoes.png",
      category: "Classic",
      rating: 4.6,
      available: false,
      ingredients: ["Fresh Mozzarella", "Roma Tomatoes", "Fresh Basil", "Olive Oil"],
    },
  ]

  const categories = ["all", "Classic", "Specialty", "Vegetarian", "Sides", "Desserts", "Drinks"]

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const toggleAvailability = (itemId: number) => {
    // In a real app, this would update the item in the database
    console.log(`Toggling availability for item ${itemId}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Menu Management</h1>
          <p className="text-muted-foreground">Manage your restaurant's menu items</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Menu Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Menu Item</DialogTitle>
              <DialogDescription>Create a new item for your menu</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Item Name</Label>
                  <Input id="name" placeholder="Pizza name" />
                </div>
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" type="number" step="0.01" placeholder="0.00" />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe the pizza..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Classic">Classic</SelectItem>
                      <SelectItem value="Specialty">Specialty</SelectItem>
                      <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input id="image" placeholder="Image URL" />
                </div>
              </div>
              <div>
                <Label htmlFor="ingredients">Ingredients (comma separated)</Label>
                <Input id="ingredients" placeholder="Pepperoni, Cheese, Sauce..." />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Add Item</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className={`${!item.available ? "opacity-60" : ""}`}>
            <div className="relative">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-secondary text-secondary-foreground">{item.category}</Badge>
              </div>
              <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                <Star className="w-3 h-3 fill-secondary text-secondary" />
                <span className="text-xs font-medium">{item.rating}</span>
              </div>
              {!item.available && (
                <div className="absolute inset-0 bg-black/50 rounded-t-lg flex items-center justify-center">
                  <Badge variant="destructive">Unavailable</Badge>
                </div>
              )}
            </div>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <span className="text-lg font-bold text-primary">${item.price}</span>
              </div>
              <CardDescription className="text-sm">{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium mb-1">Ingredients:</p>
                <div className="flex flex-wrap gap-1">
                  {item.ingredients.slice(0, 3).map((ingredient, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {ingredient}
                    </Badge>
                  ))}
                  {item.ingredients.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{item.ingredients.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={item.available ? "outline" : "default"}
                  size="sm"
                  className="flex-1"
                  onClick={() => toggleAvailability(item.id)}
                >
                  {item.available ? "Mark Unavailable" : "Mark Available"}
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive bg-transparent">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Pizza className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No menu items found matching your criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
