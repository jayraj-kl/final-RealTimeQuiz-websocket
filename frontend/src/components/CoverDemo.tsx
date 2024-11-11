import { Cover } from "@/components/ui/cover";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom'

export function CoverDemo() {
  const navigate = useNavigate()

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-b from-background to-background/80">
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold max-w-7xl mx-auto text-center relative z-20 py-12 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-200 dark:via-white dark:to-white">
        Build amazing websites <br /> at <Cover>warp speed</Cover>
      </h1>
      <p className="mt-8 text-xl sm:text-2xl md:text-3xl text-center max-w-3xl mx-auto text-muted-foreground">
        Create stunning, responsive web applications faster than ever before with our cutting-edge tools and components.
      </p>
      <div className="mt-12 flex flex-col sm:flex-row gap-6">
        <Button size="lg" className="text-lg px-8 py-6" onClick={()=> { navigate('/auth') }}>Join Quiz</Button>
        <Button size="lg" variant="outline" className="text-lg px-8 py-6" onClick={()=> { navigate('/admin') }}>Admin Panel</Button>
      </div>
    </div>
  );
}