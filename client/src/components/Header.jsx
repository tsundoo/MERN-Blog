import { Navbar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { TextInput, Button } from "flowbite-react";
import { AiOutlineSearch} from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

export default function Header() {
  const path = useLocation().pathname;
  return (
    <Navbar className="border-b-2">
      <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-2xl font-semibold dark:text-white">
        <span className="px-2 py1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white ">Tsundo&apos;s</span> 
        Blog
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline" 
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch/>
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
          <FaMoon />
        </Button>
        <Link to="/signin">
          <Button gradientDuoTone="purpleToPink" outline>
            Sign in
          </Button>
          <Navbar.Toggle />
        </Link>
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/" active={path === "/"} className="text-sm sm:text-base">
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} to="/about" active={path === "/about"} className="text-sm sm:text-base">
          About
        </Navbar.Link>
        <Navbar.Link as={Link} to="/projects" active={path === "/projects"} className="text-sm sm:text-base">
          Projects
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
