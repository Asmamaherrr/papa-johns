"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  addresses?: Address[]
}

export interface Address {
  id: string
  street: string
  city: string
  zipCode: string
  isDefault: boolean
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_ERROR" }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: Partial<User> }

const AuthContext = createContext<{
  state: AuthState
  dispatch: React.Dispatch<AuthAction>
  login: (email: string, password: string) => Promise<boolean>
  signup: (userData: { email: string; password: string; firstName: string; lastName: string }) => Promise<boolean>
  logout: () => void
} | null>(null)

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true }

    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isAuthenticated: true,
      }

    case "LOGIN_ERROR":
      return {
        ...state,
        user: null,
        isLoading: false,
        isAuthenticated: false,
      }

    case "LOGOUT":
      return {
        ...state,
        user: null,
        isLoading: false,
        isAuthenticated: false,
      }

    case "UPDATE_USER":
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      }

    default:
      return state
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoading: false,
    isAuthenticated: false,
  })

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("papa-johns-user")
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        dispatch({ type: "LOGIN_SUCCESS", payload: user })
      } catch (error) {
        localStorage.removeItem("papa-johns-user")
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: "LOGIN_START" })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication - in real app, this would call your API
    const savedUsers = JSON.parse(localStorage.getItem("papa-johns-users") || "[]")
    const user = savedUsers.find((u: any) => u.email === email && u.password === password)

    if (user) {
      const { password: _, ...userWithoutPassword } = user
      dispatch({ type: "LOGIN_SUCCESS", payload: userWithoutPassword })
      localStorage.setItem("papa-johns-user", JSON.stringify(userWithoutPassword))
      return true
    } else {
      dispatch({ type: "LOGIN_ERROR" })
      return false
    }
  }

  const signup = async (userData: {
    email: string
    password: string
    firstName: string
    lastName: string
  }): Promise<boolean> => {
    dispatch({ type: "LOGIN_START" })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user creation
    const savedUsers = JSON.parse(localStorage.getItem("papa-johns-users") || "[]")
    const existingUser = savedUsers.find((u: any) => u.email === userData.email)

    if (existingUser) {
      dispatch({ type: "LOGIN_ERROR" })
      return false
    }

    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      addresses: [],
    }

    savedUsers.push(newUser)
    localStorage.setItem("papa-johns-users", JSON.stringify(savedUsers))

    const { password: _, ...userWithoutPassword } = newUser
    dispatch({ type: "LOGIN_SUCCESS", payload: userWithoutPassword })
    localStorage.setItem("papa-johns-user", JSON.stringify(userWithoutPassword))
    return true
  }

  const logout = () => {
    dispatch({ type: "LOGOUT" })
    localStorage.removeItem("papa-johns-user")
  }

  return <AuthContext.Provider value={{ state, dispatch, login, signup, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
