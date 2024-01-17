import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
// import { URL } from "../utilities/url";
import Dashboard from "../components/Dashboard";
import Loading from "../components/Loading";

const BlogPage = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/posts/user/" + user._id);
      setPosts(res.data);
      setNoResults(res.data.length === 0);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  console.log(posts);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-pink-500 via-purple-500 to-purple-600 text-white">
      <NavBar />
      <div className="px-8 md:px-[200px] flex-grow">
      <h1 className="font-extrabold md:text-4xl text-2xl mb-8 text-center">
          Your Blog Posts
        </h1>
        {loading ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loading />
          </div>
        ) : !noResults && Array.isArray(posts) ? ( 
          posts.map((post) => (
            <Link
              key={post._id}
              to={user ? `/posts/${post._id}` : "/login"}
            >
              <Dashboard key={post._id} post={post} />
            </Link>
          ))
        ) : (
          <h3 className="text-center font-bold mt-16"> No posts available. Start creating!</h3>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
