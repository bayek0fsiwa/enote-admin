import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { useRef } from "react"
import { register } from "@/http/api"
import { useMutation } from "@tanstack/react-query"
import { LoaderPinwheel } from "lucide-react"

const RegisterPage = () => {
    const navigate = useNavigate();
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const mutation = useMutation({
        mutationFn: register,
        onSuccess: () => {
            navigate("/auth/login");
        },
    })

    const handleRegister = () => {
        const name = nameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!name || !email || !password) {
            return alert("Email and Password require")
        }

        mutation.mutate({ name, email, password })
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Register</CardTitle>
                    <CardDescription>
                        Enter your email and password below to regiter your account.<br />
                        {mutation.isError && <span className="text-red-500 text-sm">{mutation.error.message}</span>}
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input ref={nameRef} id="name" type="text" placeholder="your name" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input ref={emailRef} id="email" type="email" placeholder="mail@example.com" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input ref={passwordRef} id="password" type="password" placeholder="password" required />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={handleRegister} disabled={mutation.isPending}>
                        {mutation.isPending && <LoaderPinwheel className="animate-spin" />}
                        <span className="ml-1">Sign up</span>
                    </Button>
                    <div className="mt-0 text-center text-sm">
                        Already have an account?{' '}
                        <Link to={"/auth/login"} className="underline">
                            Sign In
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default RegisterPage;
