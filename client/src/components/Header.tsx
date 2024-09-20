import React from "react"
import { Button } from "@/components/ui/button"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { SunMoon } from "lucide-react"

interface HeaderProps {
  toggleTheme: () => void
}

export const Header: React.FC<HeaderProps> = ({ toggleTheme }) => {
  return (
    <CardHeader className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
      <img src="react.png" alt="React Logo" className="h-12" />
        <span className="text-4xl">+</span>
        <img src="gopher.png" alt="Golang Gopher Mascot" className="h-8" />
        <span className="text-2xl">=</span>
        <span className="text-2xl">🦁</span>
      </div>
      <CardTitle className="text-xl font-normal">Daily Tasks</CardTitle>
      <Button variant="ghost" size="icon" onClick={toggleTheme}>
        <SunMoon className="h-5 w-5" />
      </Button>
    </CardHeader>
  )
}
