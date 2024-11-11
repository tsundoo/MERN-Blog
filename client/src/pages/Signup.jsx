import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-10">

        {/* left side */}
        <div className="flex-1">
          <Link to="/" className="font-bold text-4xl dark:text-white">
            <span className="px-2 py1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white ">Tsundo&apos;s</span> 
              Blog
          </Link>
          <p className="text-gray-500 text-sm mt-5">
            This is a demo project. You can signup with your email and password or with Google
          </p>
        </div>

        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Username" />
              <TextInput
                id="username"
                type="text"
                placeholder="Username"
                required={true}
              />
            </div>
            <div>
              <Label value="Email" />
              <TextInput
                id="email"
                type="email"
                placeholder="name@email.com"
                required={true}
              />
            </div>
            <div>
              <Label value="Password" />
              <TextInput
                id="password"
                type="password"
                placeholder="Password"
                required={true}
              />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              Sign Up
            </Button>
          </form>

          <div className="flex justify-center gap-2 mt-3 text-sm">
            <span>Already have an Account?</span>
            <Link to="/signin" className="text-blue-500">
              Sign In
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
