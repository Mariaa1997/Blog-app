import { ImCross } from "react-icons/im";
import { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
// import { URL } from "../utilities/url";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);
  const [dog, setDog] = useState("");
  const [dogs, setDogs] = useState([]);
  const navigate = useNavigate();

  const deleteCategory = (i) => {
    let updatedDogs = [...dogs];
    updatedDogs.splice(i);
    setDogs(updatedDogs);
  };

  const addCategory = () => {
    let updatedDogs = [...dogs];
    updatedDogs.push(dog);
    setDog("");
    setDogs(updatedDogs);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: dogs,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;

      // Image upload
      try {
        const imgUpload = await axios.post("/api/upload", data);
        console.log(imgUpload);
      } catch (error) {
        console.log(error);
      }
    }

    // Post upload
    try {
      const res = await axios.post("/api/posts/create", post, {
        withCredentials: true,
      });
      navigate("/posts/:id" + res.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col bg-gradient-to-b from-purple-500 to-blue-500 text-white w-full">
   <NavBar />
      <div className="flex-grow p-6 md:p-[200px]">
        <h1 className="font-extrabold md:text-4xl text-2xl mb-8 text-center">Let's Create Something Awesome!</h1>
        <form className="flex flex-col space-y-6">
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter post title"
            className="px-4 py-2 outline-none bg-transparent border-b-2 border-white text-white placeholder-white focus:border-pink-500"
          />
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            className="px-4 bg-transparent text-white"
          />
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                value={dog}
                onChange={(e) => setDog(e.target.value)}
                className="flex-grow px-4 py-2 outline-none bg-transparent border-b-2 border-white text-white placeholder-white focus:border-pink-500"
                placeholder="Enter post category"
                type="text"
              />
              <div
                onClick={addCategory}
                className="bg-pink-500 text-white px-6 py-2 font-semibold rounded-full hover:bg-pink-600 transition duration-300"
              >
                Add
              </div>
            </div>

            {/* categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {dogs?.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center bg-white text-black px-3 py-1 rounded-full"
                >
                  <p className="mr-2">{c}</p>
                  <p
                    onClick={() => deleteCategory(i)}
                    className="text-white bg-red-500 rounded-full p-1 text-sm"
                  >
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            rows={15}
            cols={30}
            className="px-4 py-2 outline-none bg-transparent border-2 border-white text-white placeholder-white focus:border-pink-500"
            placeholder="Enter post description"
          />
          <button
            onClick={handleCreate}
            className="bg-pink-500 w-full text-white font-semibold px-6 py-2 md:text-xl text-lg rounded-full hover:bg-pink-600 transition duration-300"
          >
            Create
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

 export default CreatePostPage;  
