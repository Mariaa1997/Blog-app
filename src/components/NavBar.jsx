import { Link, useLocation, useNavigate } from "react-router-dom"
import { CiSearch } from "react-icons/ci";
import { GiHamburgerMenu } from 'react-icons/gi';
import { useContext, useState } from "react";
import Menu from "./Menu"
import {UserContext} from "../Context/UserContext"

// Import statements...

const NavBar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const showMenu = () => {
    setMenu(!menu);
  };

  const handleSearch = () => {
    navigate(prompt ? `?search=${prompt}` : "/");
  };

  const { user } = useContext(UserContext);

  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-gradient-to-b from-pink-500 to-purple-500 text-white font-body-bold-italic animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-extrabold text-dramatic font-body-bold-italic"><Link to="/">Blog</Link></h1>

      {path === "/" && (
        <div className="flex justify-center items-center space-x-2">
          <p onClick={handleSearch} className="cursor-pointer"><CiSearch /></p>
          <input
            onChange={(e) => setPrompt(e.target.value)}
            className="outline-none px-3 bg-transparent border-b-2 border-white text-white placeholder-white focus:border-pink-500"
            placeholder="Search a post"
            type="text"
          />
        </div>
      )}

      <div className="hidden md:flex items-center justify-center space-x-4">
        {user ? <h3><Link to="/create" className="text-white">Create</Link></h3> : <h3><Link to="/login" className="text-white">Login</Link></h3>}
        {user ? (
          <div onClick={showMenu} className="relative">
            <p className="cursor-pointer text-white text-2xl icon-hamburger"><GiHamburgerMenu/></p>
            {menu && <Menu className="bg-pink-500 text-white"/>}
          </div>
        ) : (
          <h3><Link to="/signup" className="text-white">Sign Up</Link></h3>
        )}
      </div>

      <div onClick={showMenu} className="md:hidden text-lg">
        <p className="cursor-pointer text-white text-2xl icon-hamburger"><GiHamburgerMenu /></p>
        {menu && <Menu className="bg-pink-500 text-white" />}
      </div>
    </div>
  );
};

export default NavBar;