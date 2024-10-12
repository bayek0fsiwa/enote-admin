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
import { useMutation } from "@tanstack/react-query"
import { login } from "@/http/api"
import { LoaderPinwheel } from "lucide-react"

const LoginPage = () => {

  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/dashboard/home");
    },
    onError: () => {
      navigate("/auth/login");
    }
  })

  const handleLogin = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      return alert("Email and Password require")
    }

    mutation.mutate({ email, password })
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email and password below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
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

          <Button onClick={handleLogin} className="w-full" disabled={mutation.isPending}>
            {mutation.isPending && <LoaderPinwheel className="animate-spin" />}
            <span className="ml-1">Sign in</span>
          </Button>
          <div className="mt-0 text-center text-sm">
            Don't have an account?{' '}
            <Link to={"/auth/register"} className="underline">
              Sign Up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginPage;
