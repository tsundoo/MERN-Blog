import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Signup() {

  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const hanldeChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("All fields are required");
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await axios.post('/api/auth/signup', formData);
      if (res.data.success === false) {
        setLoading(false);
        return setErrorMessage(res.data.message || "User already exists");
      }
      navigate('/signin');
    } catch (error) { 
      setErrorMessage(error.response?.data?.message || "Something went wrong!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

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
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Username" />
              <TextInput
                id="username"
                type="text"
                placeholder="Username"
                required={true}
                onChange={hanldeChange}
              />
            </div>
            <div>
              <Label value="Email" />
              <TextInput
                id="email"
                type="email"
                placeholder="name@email.com"
                required={true}
                onChange={hanldeChange}
              />
            </div>
            <div>
              <Label value="Password" />
              <TextInput
                id="password"
                type="password"
                placeholder="Password"
                required={true}
                onChange={hanldeChange}
              />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
              { loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="ml-2">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          <div className="flex justify-center gap-2 mt-3 text-sm">
            <span>Already have an Account?</span>
            <Link to="/signin" className="text-blue-500">
              Sign In
            </Link>
          </div>

          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}

        </div>
      </div>
    </div>
  )
}
