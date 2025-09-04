"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/authContext"
import { User, Settings, ShoppingBag, LogOut } from "lucide-react"
import Link from "next/link"

export function UserMenu() {
  const { state, logout } = useAuth()

  if (!state.isAuthenticated) {
    return (
      <div className="flex items-center space-x-2">
        <Link href="/login">
          <Button variant="outline" size="sm" className="hover:bg-yellow-400">
            Sign In
          </Button>
        </Link>
        <Link href="/signup">
          <Button size="sm" >Sign Up</Button>
        </Link>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
          <User className="w-4 h-4" />
          <span className="hidden sm:inline">{state.user?.firstName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div>
            <p className="font-medium">
              {state.user?.firstName} {state.user?.lastName}
            </p>
            <p className="text-sm text-muted-foreground">{state.user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/account" className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            My Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account" className="flex items-center">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Order History
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account" className="flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-destructive">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
