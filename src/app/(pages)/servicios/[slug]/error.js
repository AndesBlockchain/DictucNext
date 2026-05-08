"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ErrorServicio() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/servicios/todos-los-servicios")
  }, [router])

  return null
}
