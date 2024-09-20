import React from "react";
import { Button } from "@/components/ui/button";
import { SunMoon } from "lucide-react";

interface HeaderProps {
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleTheme }) => {
  return (
    <header className="w-full flex justify-center mb-8">
      <div className="w-full lg:w-3/4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="react.png" alt="React Logo" className="h-16 ms-4" />
          <span className="text-4xl mx-2">+</span>
          <img src="gopher.png" alt="Golang Gopher Mascot" className="h-16" />
        </div>
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-normal">Daily Tasks</h2>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            <SunMoon className="h-5 w-5" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
