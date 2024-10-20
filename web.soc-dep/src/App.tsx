import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar"
import { ThemeProvider } from "@/components/theme-provider"
import User from "./components/pages/User";
import { Admin } from "./components/pages/Admin";
import { Toaster } from "@/components/ui/toaster"

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="admin" element={<Admin />} />
            <Route path="user" element={<User />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </div>
    </ThemeProvider>
  )
}