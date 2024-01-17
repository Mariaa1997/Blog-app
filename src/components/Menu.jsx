import { useContext } from "react"
import { UserContext } from "../Context/UserContext"
import axios from "axios"
// import { URL } from "../utilities/url"
import { Link, useNavigate } from "react-router-dom"


const Menu = () => {
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/auth/logout", { withCredentials: true });
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div  className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 w-[200px] z-10 flex flex-col items-start rounded-sm p-4 space-y-4 shadow-lg absolute">
      {!user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/login">Login</Link></h3>}
      {!user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/signup">Sign Up</Link></h3>}
      {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to={"/profile/" + user._id}>My Profile</Link></h3>}
      {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/create">Let's Create</Link></h3>}
      {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to={"/blog/" + user._id}>My blogs</Link></h3>}
      {user && <h3 onClick={handleLogout} className="text-white text-sm hover:text-gray-500 cursor-pointer font-bold">Logout</h3>}
    </div>
  );
};

export default Menu;