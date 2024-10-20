import { useState } from "react";
import { InfiniteMovingCards } from "@/components/infinite-moving-cards";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button"; // Shadcn button import
import UserLoggedin from "./user-page-components/UserLog";

const User = () => {
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [value, setValue] = useState("")


    if (!submitted) {
        return (
            <>
                {/* Infinite scroll section */}
                <InfiniteMovingCards />

                {/* Main content - positioned closer to the scroll */}
                <main className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8 flex flex-col items-center justify-start mt-20">
                    {/* Title and subtitle */}
                    <div className="text-center mb-2">
                        <h1 className="text-4xl font-bold">Enter the code to join</h1>
                        <p className="text-xl text-gray-500">It's on the screen in front of you</p>
                    </div>

                    {/* OTP Input */}
                    <div className="mb-6 flex justify-center">
                        <InputOTP
                        maxLength={6}
                        value={value}
                        onChange={(value) => setValue(value)}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot
                                    index={0}
                                    className="w-12 h-12 text-2xl p-2 border border-gray-300 rounded-lg"
                                />
                                <InputOTPSlot
                                    index={1}
                                    className="w-12 h-12 text-2xl p-2 border border-gray-300 rounded-lg"                                />
                                <InputOTPSlot
                                    index={2}
                                    className="w-12 h-12 text-2xl p-2 border border-gray-300 rounded-lg"
                                />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot
                                    index={3}
                                    className="w-12 h-12 text-2xl p-2 border border-gray-300 rounded-lg"
                                />
                                <InputOTPSlot
                                    index={4}
                                    className="w-12 h-12 text-2xl p-2 border border-gray-300 rounded-lg"
                                />
                                <InputOTPSlot
                                    index={5}
                                    className="w-12 h-12 text-2xl p-2 border border-gray-300 rounded-lg"
                                />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>

                    {/* Name Input */}
                    <div className="mb-6 w-full flex justify-center">
                        <input
                            type="text"
                            className="border border-gray-300 rounded-lg p-2 w-64 text-xl text-center text-black"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Join Button (Shadcn button) */}
                    <Button
                        variant="default"
                        size="lg"
                        className="w-56 h-10 text-lg"
                        onClick={() => {
                            console.log(value); // Log the OTP value
                            console.log(name); // Log the name
                            setSubmitted(true);
                        }}
                    >
                        Join
                    </Button>
                </main>
            </>
        );
    }
    return (
        <UserLoggedin name={name} code={value} /> // Pass the complete OTP code
    );
};

export default User;
