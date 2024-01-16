import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../utilities/url";
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
      const res = await axios.get(URL + "/api/posts/user/" + user._id);
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
    <div>
      <NavBar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loading ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loading />
          </div>
        ) : !noResults && Array.isArray(posts) ? ( 
          posts.map((post) => (
            <Link
              key={post._id}
              to={user ? `/posts/post/${post._id}` : "/login"}
            >
              <Dashboard key={post._id} post={post} />
            </Link>
          ))
        ) : (
          <h3 className="text-center font-bold mt-16">No posts available</h3>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
