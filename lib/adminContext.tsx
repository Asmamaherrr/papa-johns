"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"

export interface Admin {
  id: string
  email: string
  name: string
  role: "admin" | "manager"
}

interface AdminState {
  admin: Admin | null
  isLoading: boolean
  isAuthenticated: boolean
}

type AdminAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: Admin }
  | { type: "LOGIN_ERROR" }
  | { type: "LOGOUT" }

const AdminContext = createContext<{
  state: AdminState
  dispatch: React.Dispatch<AdminAction>
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
} | null>(null)

function adminReducer(state: AdminState, action: AdminAction): AdminState {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true }

    case "LOGIN_SUCCESS":
      return {
        ...state,
        admin: action.payload,
        isLoading: false,
        isAuthenticated: true,
      }

    case "LOGIN_ERROR":
      return {
        ...state,
        admin: null,
        isLoading: false,
        isAuthenticated: false,
      }

    case "LOGOUT":
      return {
        ...state,
        admin: null,
        isLoading: false,
        isAuthenticated: false,
      }

    default:
      return state
  }
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(adminReducer, {
    admin: null,
    isLoading: false,
    isAuthenticated: false,
  })

  // Load admin from localStorage on mount
  useEffect(() => {
    const savedAdmin = localStorage.getItem("papa-johns-admin")
    if (savedAdmin) {
      try {
        const admin = JSON.parse(savedAdmin)
        dispatch({ type: "LOGIN_SUCCESS", payload: admin })
      } catch (error) {
        localStorage.removeItem("papa-johns-admin")
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: "LOGIN_START" })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock admin authentication - in real app, this would call your API
    const adminCredentials = [
      { email: "admin@papajohns.com", password: "admin123", id: "1", name: "Admin User", role: "admin" as const },
      {
        email: "manager@papajohns.com",
        password: "manager123",
        id: "2",
        name: "Store Manager",
        role: "manager" as const,
      },
    ]

    const admin = adminCredentials.find((a) => a.email === email && a.password === password)

    if (admin) {
      const { password: _, ...adminWithoutPassword } = admin
      dispatch({ type: "LOGIN_SUCCESS", payload: adminWithoutPassword })
      localStorage.setItem("papa-johns-admin", JSON.stringify(adminWithoutPassword))
      return true
    } else {
      dispatch({ type: "LOGIN_ERROR" })
      return false
    }
  }

  const logout = () => {
    dispatch({ type: "LOGOUT" })
    localStorage.removeItem("papa-johns-admin")
  }

  return <AdminContext.Provider value={{ state, dispatch, login, logout }}>{children}</AdminContext.Provider>
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}
