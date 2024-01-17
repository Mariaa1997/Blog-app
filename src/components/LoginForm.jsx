import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import { useContext, useState } from "react"
import axios from "axios"
import { URL } from "../utilities/url"
import { UserContext } from "../Context/UserContext"


// Import statements...

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(URL + "/api/auth/login", { email, password }, { withCredentials: true });
      setUser(res.data);
      navigate("/");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-gradient-to-r from-purple-500 to-pink-500">
        <h1 className="text-lg md:text-xl font-extrabold text-white"><Link to="/">Blog</Link></h1>
        <h3 className="text-white"><Link to="/signup">Sign Up</Link></h3>
      </div>
      <div className="w-full flex justify-center items-center h-[80vh] bg-gradient-to-r from-purple-300 to-pink-200">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%] bg-white rounded-lg p-6 shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
          <h1 className="text-2xl md:text-3xl font-bold text-left text-purple-500">Log in to your account</h1>
          <input onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-purple-500 outline-0 focus:border-pink-500 transition duration-300" type="text" placeholder="Email" />
          <input onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border-2 border-purple-500 outline-0 focus:border-pink-500 transition duration-300" type="password" placeholder="Password" />
          <button onClick={handleLogin} className="w-full px-4 py-4 text-lg font-bold text-white bg-purple-500 rounded-lg hover:bg-pink-500 hover:text-white transition duration-300">Log in</button>
          {error && <h3 className="text-red-500 text-sm">Oops, try again!</h3>}
          <div className="flex justify-center items-center space-x-3 text-gray-700">
            <p>New User?</p>
            <p className="hover:text-black"><Link to="/signup">Click <strong>HERE</strong></Link></p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginForm;
