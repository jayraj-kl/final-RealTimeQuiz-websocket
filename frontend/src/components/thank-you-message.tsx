'use client'

import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function ThankYouMessage() {
  const navigate = useNavigate();

  const handleRestartClick = () => {
    // Redirect to the /user page
    navigate('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[300px] text-center">
          <CardHeader className="space-y-1 p-4">
            <CardTitle className="text-2xl font-bold text-primary">Thank You!</CardTitle>
            <CardDescription className="text-sm">Your journey with us was amazing</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
            </motion.div>
            <p className="text-base mb-3">We hope you enjoyed the experience!</p>
            <Badge variant="secondary" className="text-xs px-2 py-1">You're Awesome!</Badge>
          </CardContent>
          <CardFooter className="flex justify-center p-4">
            <Button 
              variant="outline"
              onClick={handleRestartClick}
              className="text-sm px-3 py-1"
            >
              Start Again
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
      {/* <AnimatedTestimonialsDemo /> */}
    </div>
  )
}
