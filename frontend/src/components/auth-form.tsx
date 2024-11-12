'use client'

import { useState } from 'react'
// @ts-ignore 
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios from 'axios'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/hooks/use-toast"
import { BackgroundBeamsWithCollisionDemo } from './BackgroundBeamsWithCollisionDemo'
import { useNavigate } from 'react-router-dom'

const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string().regex(/^\d{10}$/, { message: "Phone number must be 10 digits" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

const signinSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
})

type SignupInputs = z.infer<typeof signupSchema>
type SigninInputs = z.infer<typeof signinSchema>

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const signupForm = useForm<SignupInputs>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: '', phoneNumber: '', password: '', confirmPassword: '' },
  })

  const signinForm = useForm<SigninInputs>({
    resolver: zodResolver(signinSchema),
    defaultValues: { email: '', password: '' },
  })


  const onSignup = async (data: SignupInputs) => {
    setIsLoading(true)
    try {
      await axios.post('https://live-quiz-app.jayrajkladkat.workers.dev/api/v1/user/signup', data)
      toast({ title: "Success", description: "Account created successfully" })
      signupForm.reset()
      navigate('/user') // Redirect to home page after successful signup
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast({ title: "Error", description: error.response.data.error, variant: "destructive" })
      } else {
        toast({ title: "Error", description: "An unexpected error occurred", variant: "destructive" })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const onSignin = async (data: SigninInputs) => {
    setIsLoading(true)
    try {
      const response = await axios.post('https://live-quiz-app.jayrajkladkat.workers.dev/api/v1/user/signin', data)
      toast({ title: "Success", description: "Signed in successfully" })
      console.log('Token:', response.data.token)
      navigate('/user') // Redirect to home page after successful signin
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast({ title: "Error", description: error.response.data.error, variant: "destructive" })
      } else {
        toast({ title: "Error", description: "An unexpected error occurred", variant: "destructive" })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex-grow flex">
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 z-10">
          <div className="w-full max-w-[350px]">
            <h2 className="text-2xl font-bold mb-2">Authentication</h2>
            <p className="text-muted-foreground mb-6">Sign up or sign in to your account.</p>
            <Tabs defaultValue="signup" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                <TabsTrigger value="signin">Sign In</TabsTrigger>
              </TabsList>
              <TabsContent value="signup">
                <Form {...signupForm}>
                  <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-4">
                    <FormField
                      control={signupForm.control}
                      name="email"
                      render={({ field }: { field: any }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="phoneNumber"
                      render={({ field }: { field: ReturnType<typeof signinForm['control']['register']> }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="1234567890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="password"
                      render={({ field }: { field: ReturnType<typeof signupForm['control']['register']> }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                {...field}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="confirmPassword"
                      render={({ field }: { field: ReturnType<typeof signupForm['control']['register']> }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showConfirmPassword ? "text" : "password"}
                                {...field}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing up..." : "Sign Up"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="signin">
                <Form {...signinForm}>
                  <form onSubmit={signinForm.handleSubmit(onSignin)} className="space-y-4">
                    <FormField
                      control={signinForm.control}
                      name="email"
                      render={({ field }: { field: ReturnType<typeof signinForm['control']['register']> }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signinForm.control}
                      name="password"
                      render={({ field }: { field: ReturnType<typeof signinForm['control']['register']> }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                {...field}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden md:block w-1/2 relative overflow-hidden">
          <BackgroundBeamsWithCollisionDemo />
        </div>
      </div>
    </div>
  )
}