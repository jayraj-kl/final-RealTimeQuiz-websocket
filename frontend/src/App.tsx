import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar"
import { ThemeProvider } from "@/components/theme-provider"
import User from "./components/pages/User";
import { Admin } from "./components/pages/Admin";
import { Toaster } from "@/components/ui/toaster"
import GlobeDemo from "@/components/GlobeDemo"
import { CoverDemo } from "./components/CoverDemo";
import { Github, Twitter } from 'lucide-react'
import { TextRevealCardPreview } from "./components/TextRevealCardPreview";
import { TracingBeamDemo } from "./components/TracingBeamDemo";


export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={
              <div>
                <div>
                  <CoverDemo />
                </div>
                <div>
                  <GlobeDemo />
                </div>
                <div>
                  <TextRevealCardPreview />
                </div>
                <div>
                  <TracingBeamDemo />
                </div>

              </div>
            } />
            <Route path="admin" element={<Admin />} />
            <Route path="user" element={<User />} />
          </Routes>
          <footer className="fixed bottom-0 left-0 w-full bg-background border-t border-border py-6 px-4 md:px-6">
  <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
    <div className="text-sm text-muted-foreground mb-4 md:mb-0">
      © 2024 QuestFest: The GK Odyssey. All rights reserved.
    </div>
    <div className="flex space-x-4">
      <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
        Terms of Service
      </a>
      <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
        Privacy Policy
      </a>
    </div>
    <div className="flex space-x-4 mt-4 md:mt-0">
      <a href="https://github.com/jayraj-kl/final-websocket" className="text-muted-foreground hover:text-foreground transition-colors">
        <Github className="h-5 w-5" />
        <span className="sr-only">GitHub</span>
      </a>
      <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
        <Twitter className="h-5 w-5" />
        <span className="sr-only">Twitter</span>
      </a>
    </div>
  </div>
</footer>

          <Toaster />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  )
}