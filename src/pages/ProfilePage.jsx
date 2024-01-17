import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import axios from "axios";
import { IF, URL } from "../utilities/url";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import ProfilePosts from "../components/ProfilePosts";

const ProfilePage = () => {
  const param = useParams().id;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [updated, setUpdated] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/api/users/" + user._id);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      const res = await axios.put(
        "/api/users/" + user._id,
        { username, email, password },
        { withCredentials: true }
      );
      setUpdated(true);
    } catch (err) {
      console.log(err);
      setUpdated(false);
    }
  };

  const handleUserDelete = async () => {
    try {
      const res = await axios.delete("/api/users/" + user._id, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/signup");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get("/api/posts/user/" + user._id);
      setPosts(res.data);
      
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [param]);

  useEffect(() => {
    fetchUserPosts();
  }, [param]);


  return (
    <div>
      <NavBar />
      <div className="min-h-[80vh] px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
        <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0 space-y-8">
          <h1 className="text-3xl font-bold mb-4 text-pink-700 animation-fade-in">My Posts:</h1>
          {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((p) => <ProfilePosts key={p._id} p={p} />)
          ) : (
            <p className="text-center font-bold mt-4 text-purple-600">
              Where are your posts?!?
            </p>
          )}
        </div>
        <div className="md:sticky md:top-12  flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end ">
          <div className=" flex flex-col space-y-4 items-start">
            <h1 className="text-2xl font-bold mb-4 text-pink-700">My Profile</h1>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="outline-none px-4 py-2 text-gray-700 bg-pink-200 rounded-md w-full"
              placeholder="Your username"
              type="text"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="outline-none px-4 py-2 text-gray-700 bg-pink-200 rounded-md w-full"
              placeholder="Your email"
              type="email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="outline-none px-4 py-2 text-gray-700 bg-pink-200 rounded-md w-full"
              placeholder="Your password"
              type="password"
            />
            <div className="flex items-center space-x-4 mt-8">
              <button
                onClick={handleUserUpdate}
                className="text-white font-semibold bg-pink-500 px-4 py-2 hover:bg-pink-600 rounded-md"
              >
                Update
              </button>
              <button
                onClick={handleUserDelete}
                className="text-white font-semibold bg-purple-500 px-4 py-2 hover:bg-purple-600 rounded-md"
              >
                Delete
              </button>
            </div>
            {updated && (
              <h3 className="text-green-500 text-sm text-center mt-4">
                User updated successfully!
              </h3>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
