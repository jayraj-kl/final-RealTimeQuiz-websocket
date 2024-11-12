import { ModeToggle } from "./mode-toggle"
import { Book } from "lucide-react"
import { useNavigate } from 'react-router-dom'

export function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="bg-white border-b dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() =>navigate('/')}>
            <Book className="h-8 w-8 text-neutral-900 mr-2 dark:text-neutral-50" />
            <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">QuestFest: The GK Odyssey</span>
          </div>
          <div className="ml-4 flex items-center md:ml-6">
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}