import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from 'axios';
import { URL } from "../utilities/url";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/signup", { username, email, password });
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
      setError(false);
      setLoading(false);
      navigate("/login");
    } catch (err) {
      setLoading(false);
      setError(true);
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-gradient-to-r from-pink-500 to-purple-500">
        <h1 className="text-lg md:text-xl font-extrabold text-white"><Link to="/">My Blog</Link></h1>
        <h3 className="text-white"><Link to="/login">Login</Link></h3>
      </div>
      <div className="w-full flex justify-center items-center h-[80vh] bg-gradient-to-r from-pink-200 to-purple-300">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%] bg-white rounded-lg p-6 shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
          <h1 className="text-2xl md:text-3xl font-bold text-left text-pink-500">Create an account</h1>
          <input onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-2 border-2 border-pink-500 outline-0 focus:border-purple-500 transition duration-300" type="text" placeholder="username" />
          <input onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-pink-500 outline-0 focus:border-purple-500 transition duration-300" type="text" placeholder="email" />
          <input onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border-2 border-pink-500 outline-0 focus:border-purple-500 transition duration-300" type="password" placeholder="password" />
          <button onClick={handleRegister} className="w-full px-4 py-4 text-lg font-bold text-white bg-pink-500 rounded-lg hover:bg-purple-500 hover:text-white transition duration-300" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          {error && <p className="text-red-500 text-sm">Sign Up failed- try again.</p>}
          <div className="flex justify-center items-center space-x-3 text-gray-700 font-italic">
            <p>Already have an account?</p>
            <p className="hover:text-black"><Link to="/login">Click <strong>HERE</strong></Link></p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUpForm;
