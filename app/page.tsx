"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Truck, Phone, MapPin, Percent, Gift } from "lucide-react"
import { CartSheet } from "@/components/cartSheet"
import { AddToCartButton } from "@/components/addToCart"
import { UserMenu } from "@/components/userMenu"
import { AddDealToCartButton } from "@/components/addDeal"

export default function HomePage() {
  const [showFullMenu, setShowFullMenu] = useState(false)

  const menuItems = [
    // Pizzas
    {
      id: 1,
      name: "The Works",
      description: "Pepperoni, Italian sausage, salami, mushrooms, black olives, bell peppers, onions",
      price: 16.99,
      image: "/super-papa.jpg",
      category: "Pizza",
      subcategory: "Specialty",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Pepperoni",
      description: "Classic pepperoni with our signature sauce and fresh mozzarella",
      price: 12.99,
      image: "/pepperoni.jpg",
      category: "Pizza",
      subcategory: "Classic",
      rating: 4.9,
    },
    {
      id: 3,
      name: "BBQ Chicken",
      description: "Grilled chicken, BBQ sauce, red onions, and fresh cilantro",
      price: 15.99,
      image: "/Chicken-BBQ.jpg",
      category: "Pizza",
      subcategory: "Specialty",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Margherita",
      description: "Fresh mozzarella, Roma tomatoes, fresh basil, and olive oil",
      price: 13.99,
      image: "/margherita.jpg",
      category: "Pizza",
      subcategory: "Classic",
      rating: 4.6,
    },
    {
      id: 5,
      name: "Hawaiian",
      description: "Ham, pineapple, and mozzarella cheese with our signature sauce",
      price: 14.99,
      image: "/smoky-ranch.jpg",
      category: "Pizza",
      subcategory: "Classic",
      rating: 4.4,
    },
    {
      id: 6,
      name: "Meat Lovers",
      description: "Pepperoni, sausage, ham, bacon, and ground beef",
      price: 18.99,
      image: "/little-italy.jpg",
      category: "Pizza",
      subcategory: "Specialty",
      rating: 4.9,
    },
    // Sides
    {
      id: 7,
      name: "Garlic Knots",
      description: "Fresh-baked knots brushed with garlic sauce and parmesan",
      price: 5.99,
      image: "/R (1).jpeg",
      category: "Sides",
      subcategory: "Bread",
      rating: 4.7,
    },
    {
      id: 8,
      name: "Chicken Wings",
      description: "Crispy wings tossed in your choice of buffalo, BBQ, or honey mustard",
      price: 8.99,
      image: "/oif.webp",
      category: "Sides",
      subcategory: "Wings",
      rating: 4.6,
    },
    {
      id: 9,
      name: "Cheesesticks",
      description: "Mozzarella cheese sticks served with marinara dipping sauce",
      price: 6.99,
      image: "/R (2).jpeg",
      category: "Sides",
      subcategory: "Appetizers",
      rating: 4.5,
    },
    {
      id: 10,
      name: "Papa's Breadsticks",
      description: "Fresh-baked breadsticks with garlic sauce and pizza sauce",
      price: 4.99,
      image: "/oip (3).webp",
      category: "Sides",
      subcategory: "Bread",
      rating: 4.8,
    },
    {
      id: 11,
      name: "Jalapeño Poppers",
      description: "Cream cheese-filled jalapeños wrapped in bacon",
      price: 7.99,
      image: "/oip.jpeg",
      category: "Sides",
      subcategory: "Appetizers",
      rating: 4.4,
    },
    // Desserts
    {
      id: 12,
      name: "Chocolate Chip Cookie",
      description: "Warm, gooey chocolate chip cookie baked fresh to order",
      price: 3.99,
      image: "/oip (4).webp",
      category: "Desserts",
      subcategory: "Cookies",
      rating: 4.7,
    },
    {
      id: 13,
      name: "Cinnamon Pull-Aparts",
      description: "Sweet cinnamon pastry with icing drizzle",
      price: 5.99,
      image: "/papa-johns-cinnamon-pull-aparts.jpg",
      category: "Desserts",
      subcategory: "Pastries",
      rating: 4.6,
    },
    {
      id: 14,
      name: "Double Chocolate Brownie",
      description: "Rich, fudgy brownie loaded with chocolate chips",
      price: 4.99,
      image: "/5fa4791d428f46abb2d0d9f325d2ed27.jpg",
      category: "Desserts",
      subcategory: "Brownies",
      rating: 4.8,
    },
    {
      id: 15,
      name: "Apple Pie Pastry",
      description: "Flaky pastry filled with cinnamon apples and sweet glaze",
      price: 4.49,
      image: "/Apple-Pie-2.jpg",
      category: "Desserts",
      subcategory: "Pastries",
      rating: 4.5,
    },
  ]

  const menuCategories = {
    Pizza: menuItems.filter((item) => item.category === "Pizza"),
    Sides: menuItems.filter((item) => item.category === "Sides"),
    Desserts: menuItems.filter((item) => item.category === "Desserts"),
  }

  const getLimitedItems = (items: typeof menuItems, limit: number) => {
    return showFullMenu ? items : items.slice(0, limit)
  }

  
  const deals = [
    {
      id: 1,
      title: "Family Deal",
      description: "2 Large Pizzas + 2 Sides + 2L Drink",
      originalPrice: 45.99,
      dealPrice: 29.99,
      savings: 16.0,
      validUntil: "Dec 31, 2024",
      popular: true,
    },
    {
      id: 2,
      title: "Student Special",
      description: "Large Pizza + Garlic Knots + Drink",
      originalPrice: 24.99,
      dealPrice: 16.99,
      savings: 8.0,
      validUntil: "Dec 31, 2024",
      popular: false,
    },
    {
      id: 3,
      title: "Weekend Warriors",
      description: "3 Large Pizzas for the price of 2",
      originalPrice: 38.97,
      dealPrice: 25.98,
      savings: 12.99,
      validUntil: "Every Weekend",
      popular: true,
    },
  ]

  const locations = [
    {
      id: 1,
      name: "Downtown Location",
      address: "123 Main Street, Downtown",
      phone: "(555) 123-7272",
      hours: "Mon-Thu: 11AM-11PM, Fri-Sat: 11AM-12AM, Sun: 12PM-10PM",
      features: ["Dine-in", "Delivery", "Pickup"],
    },
    {
      id: 2,
      name: "University District",
      address: "456 College Ave, University District",
      phone: "(555) 456-7272",
      hours: "Mon-Sun: 11AM-2AM",
      features: ["Late Night", "Delivery", "Pickup"],
    },
    {
      id: 3,
      name: "Westside Plaza",
      address: "789 West Boulevard, Westside",
      phone: "(555) 789-7272",
      hours: "Mon-Thu: 11AM-10PM, Fri-Sat: 11AM-11PM, Sun: 12PM-9PM",
      features: ["Family Friendly", "Delivery", "Pickup"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">PJ</span>
            </div>
            <span className="text-xl font-bold text-red-600">Papa John's</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="#menu" className="text-foreground hover:text-red-600 transition-colors">
              Menu
            </a>
            <a href="#deals" className="text-foreground hover:text-red-600 transition-colors">
              Deals
            </a>
            <a href="#locations" className="text-foreground hover:text-red-600 transition-colors">
              Locations
            </a>
            <a href="#about" className="text-foreground hover:text-red-600 transition-colors">
              About
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            <CartSheet />
            <Button variant="outline" size="sm" className="hover:bg-yellow-400">
              <Phone className="w-4 h-4 mr-2" />
              Order Now
            </Button>
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 via-background to-yellow-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-yellow-400 text-black">Better Ingredients. Better Pizza.</Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
                Fresh Pizza
                <span className="text-red-600"> Delivered</span>
                <br />
                to Your Door
              </h1>
              <p className="text-lg text-muted-foreground text-pretty max-w-md">
                Made with premium ingredients and baked fresh to order. Experience the Papa John's difference with every
                bite.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 bg-red-600 hover:bg-red-700 text-white">
                  <Truck className="w-5 h-5 mr-2" />
                  <a href="#menu">Order for Delivery</a>
                </Button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>30 min delivery</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>4.8/5 rating</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/better-better-wp.jpg"
                alt="Fresh Papa John's Pizza"
                className="hidden lg:block w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-card p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Fresh out of the oven!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deals Section */}
      <section id="deals" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-yellow-400 text-black">
              <Percent className="w-4 h-4 mr-1" />
              Special Offers
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              <span className="text-red-600">Amazing Deals</span> Just for You
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Save big on your favorite pizzas and sides with our exclusive deals and limited-time offers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deals.map((deal) => (
              <Card
                key={deal.id}
                className="relative overflow-hidden group hover:shadow-lg transition-all duration-300"
              >
                {deal.popular && (
                  <Badge className="absolute top-4 right-4 bg-yellow-400 text-black z-10">
                    <Gift className="w-3 h-3 mr-1" />
                    Popular
                  </Badge>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-balance">{deal.title}</CardTitle>
                  <CardDescription className="text-pretty">{deal.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-red-600">${deal.dealPrice}</span>
                        <span className="text-sm text-muted-foreground line-through">${deal.originalPrice}</span>
                      </div>
                      <div className="text-sm text-green-600 font-medium">Save ${deal.savings.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">Valid until: {deal.validUntil}</div>
                  <AddDealToCartButton deal={deal} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section id="menu" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-yellow-400">Our Menu</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Crafted with <span className="text-red-600">Better Ingredients</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Every pizza is made with fresh, never-frozen dough and our signature sauce made from vine-ripened
              tomatoes.
            </p>
          </div>

          {Object.entries(menuCategories).map(([categoryName, items]) => {
            const displayItems = getLimitedItems(items, categoryName === "Pizza" ? 4 : categoryName === "Sides" ? 0 : 0)

            return (
              <div key={categoryName} className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-balance">{categoryName}</h3>
                  <Badge variant="outline" className="text-sm">
                    {showFullMenu ? `${items.length} items` : `${displayItems.length} of ${items.length} items`}
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {displayItems.map((item) => (
                    <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <div className="relative overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-3 left-3 bg-yellow-400 text-black">{item.subcategory}</Badge>
                        <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-medium">{item.rating}</span>
                        </div>
                      </div>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <span className="text-lg font-bold text-red-600">${item.price}</span>
                        </div>
                        <CardDescription className="text-sm text-pretty">{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <AddToCartButton item={item} />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" onClick={() => setShowFullMenu(!showFullMenu)}>
              {showFullMenu ? "Show Less" : "View Full Menu"}
            </Button>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section id="locations" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-yellow-400">
              <MapPin className="w-4 h-4 mr-1 flex-shrink-0 " />
              Our Locations
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Find a <span className="text-red-600">Papa John's</span> Near You
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Visit us at any of our convenient locations or order online for delivery and pickup.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location) => (
              <Card key={location.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-balance">{location.name}</CardTitle>
                  <CardDescription className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 mt-0.5 text-red-600 flex-shrink-0" />
                    <span className="text-pretty">{location.address}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-red-600" />
                    <span className="font-medium">{location.phone}</span>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Clock className="w-4 h-4 mt-0.5 text-red-600 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground text-pretty">{location.hours}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {location.features.map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs border-red-600 text-red-600">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent border-red-600 text-red-600 hover:bg-red-50"
                    >
                      Get Directions
                    </Button>
                    <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                      Order Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                Hot, fresh pizza delivered to your door in 30 minutes or less, guaranteed.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold">Premium Quality</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                Made with better ingredients including fresh, never-frozen dough and vine-ripened tomatoes.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <Truck className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold">Easy Ordering</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                Order online, by phone, or through our mobile app for ultimate convenience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">PJ</span>
                </div>
                <span className="text-lg font-bold text-red-600">Papa John's</span>
              </div>
              <p className="text-sm text-muted-foreground text-pretty">
                Better ingredients. Better pizza. That's the Papa John's way.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Menu</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Pizza
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Sides
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Desserts
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Drinks
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Locations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-red-600" />
                  <span>(555) 123-PAPA</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span>Find a location</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Papa John's. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
