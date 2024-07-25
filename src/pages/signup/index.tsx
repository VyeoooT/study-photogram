import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icon"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUserAuth } from "@/context/userAuthContext"
import { UserSignIn } from "@/types"
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import images from '@/assets/images/index'

const initialValues: UserSignIn = {
    email: "",
    password: "",
    confirmPassword: "",
}

interface SignupProps {}

function Signup({}: SignupProps) {
    const [userInfo, setUserInfo] = useState<UserSignIn>(initialValues)
    const { googleSignIn, signUp } = useUserAuth()
    const navigate = useNavigate()
    
    // login with email, password
    const handleSubmit = async(e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await signUp(userInfo.email, userInfo.password)
            navigate("/")
            console.log("The user info: ", userInfo)
        } catch (error) {
            console.log("Error: ", error)
        }
    }

    // login with account google
    const handleGoogleSignIn = async(e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        try {
            await googleSignIn()
            navigate("/")
        } catch (error) {
            console.log("Error: ", error)
        }
    }

    return (
        <div className="w-full h-screen bg-slate-800">
            <div className="container h-full flex items-center mx-auto p-6">
                <div className="w-full flex justify-center items-center">
                    {/* intro images */}
                    <div className="w-2/3 p-6 lg:block hidden">
                        <div className="grid grid-cols-2 gap-2">
                            <img className="w-2/3 h-auto aspect-video object-cover rounded-3xl place-self-end" src={images.img2} />
                            <img className="w-2/5 h-auto aspect-auto object-cover rounded-3xl" src={images.img1} />
                            <img className="w-2/5 h-auto aspect-auto object-cover rounded-3xl place-self-end" src={images.img4} />
                            <img className="w-2/3 h-auto aspect-video object-cover rounded-3xl" src={images.img3} />
                        </div>
                    </div>

                    {/* card form */}
                    <div className="max-w-sm rounded-xl border bg-card text-card-foreground shadow-sm">
                        <Card>
                            <form onSubmit={handleSubmit}>
                                <CardHeader className="space-y-1">
                                    <CardTitle className="text-2xl text-center mb-4">
                                        PhotoGram
                                    </CardTitle>
                                    <CardDescription>
                                        Enter your email below to create your account
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="grid gap-4">
                                    <div className="grid">
                                        <Button variant="outline" onClick={handleGoogleSignIn}>
                                            <Icons.google className="mr-2 h-4 w-4" />
                                            Google
                                        </Button>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-background px-2 text-muted-foreground">
                                                Or
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="example@domain.com"
                                            value={userInfo.email}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setUserInfo({ ...userInfo, email: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Password"
                                            value={userInfo.password}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setUserInfo({ ...userInfo, password: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="confirmpassword">Confirm password</Label>
                                        <Input
                                            id="confirmpassword"
                                            type="password"
                                            placeholder="Confirm password"
                                            value={userInfo.confirmPassword}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setUserInfo({
                                                    ...userInfo,
                                                    confirmPassword: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </CardContent>

                                <CardFooter className="flex flex-col">
                                    <Button className="w-full" type="submit">
                                        Sign Up
                                    </Button>
                                    <p className="mt-3 text-sm text-center">
                                        Already have an account? <Link className="underline" to="/login">Login</Link>
                                    </p>
                                </CardFooter>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
