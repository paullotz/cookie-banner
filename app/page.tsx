"use client"

import { CookieBanner } from "@/components/blocks/cookie-banner"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function Home() {
  const [size, setSize] = useState<"sm" | "default" | "lg">("default")
  const [key, setKey] = useState(0)

  const resetConsent = () => {
    localStorage.removeItem("cookie-consent")
    setKey((prev) => prev + 1)
  }

  const handleSizeChange = (newSize: "sm" | "default" | "lg") => {
    setSize(newSize)
    resetConsent()
  }

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-8 gap-8">
      <div className="text-center space-y-4 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">GDPR Cookie Banner</h1>
        <p className="text-lg text-muted-foreground text-pretty">
          A beautiful, fully customizable cookie consent banner with smooth animations, dark mode support, and GDPR
          compliance.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2 flex-wrap justify-center">
          <Button onClick={() => handleSizeChange("sm")} variant={size === "sm" ? "default" : "outline"}>
            Small
          </Button>
          <Button onClick={() => handleSizeChange("default")} variant={size === "default" ? "default" : "outline"}>
            Default
          </Button>
          <Button onClick={() => handleSizeChange("lg")} variant={size === "lg" ? "default" : "outline"}>
            Large
          </Button>
        </div>
        <Button onClick={resetConsent} variant="outline" size="lg">
          Reset Cookie Consent
        </Button>
      </div>

      <CookieBanner
        key={key}
        size={size}
        onAccept={() => console.log("Cookies accepted")}
        onDecline={() => console.log("Cookies declined")}
      />
    </main>
  )
}
