import { Avatar, Navbar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { TextInput, Button, Dropdown } from "flowbite-react";
import { AiOutlineSearch} from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";

export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch(); 
  const { currentUser } = useSelector((state) => state.user);   
  const { theme } = useSelector((state) => state.theme);

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
        <Button 
        className="w-12 h-10 hidden sm:inline" 
        color="gray" 
        pill
        onClick={() => dispatch(toggleTheme())}
        >
          { theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown 
            arrowIcon={false} 
            inline 
            label={<Avatar src={currentUser.avatar} alt="user" rounded />}
            >
            <Dropdown.Header>
              <span className="block text-sm">{currentUser.username}</span>
              <span className="block text-xs font-bold truncate">{currentUser.email}</span>
            </Dropdown.Header>
              <Link to={`/dashboard?tab=profile`}>
                <Dropdown.Item>
                  Profile
                </Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item>
                Sign Out
              </Dropdown.Item>
          </Dropdown>
        ) : (
        <Link to="/signin">
          <Button gradientDuoTone="purpleToPink" outline>
            Sign In
          </Button>
        </Link>
        )}
        <Navbar.Toggle />
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
