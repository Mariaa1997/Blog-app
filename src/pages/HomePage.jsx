import axios from "axios"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"
// import {IF, URL} from "../utilities/url"
import { useContext, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Loading from "../components/Loading"
import { UserContext } from "../Context/UserContext"
import Dashboard from "../components/Dashboard"


const HomePage = () => {
  
  const {search}=useLocation()
  // console.log(search)
  const [posts,setPosts]=useState([])
  const [noResults,setNoResults]=useState(false)
  const [loading,setLoading]=useState(false)
  const {user}=useContext(UserContext)
  // console.log(user)

  const fetchPosts=async()=>{
    setLoading(true)
    try{
      const res=await axios.get("/api/posts/"+search)
      // console.log(res.data)
      setPosts(res.data)
      if(res.data.length===0){
        setNoResults(true)
      }
      else{
        setNoResults(false)
      }
      setLoading(false)
      
    }
    catch(err){
      console.log(err)
      setLoading(true)
    }
  }

  useEffect(()=>{
    fetchPosts()

  },[search])



  return (
    
    <>
    <NavBar/>
<div className="px-8 flex flex-col md:px-[100px] min-h-[80vh] bg-gradient-to-b from-pink-500 to-purple-500 text-white">
{loading ? (
  <div className="h-[40vh] flex flex-col-reverse justify-center items-center">
    <Loading />
  </div>
) : (
  Array.isArray(posts) && posts.length > 0 ? (
    posts.map((post) => (
      <Link key={post._id} to={user ? `/posts/${post._id}` : "/login"}>
        <Dashboard key={post._id} post={post} />
      </Link>
    ))
  ) : (
    <h3 className="text-center font-bold mt-16">
      {noResults ? "No posts available" : "Loading..."}
    </h3>
  )
)}

    </div>
    <Footer/>
    </>
    
  )
}

export default HomePage