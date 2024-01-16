import axios from "axios"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"
import {IF, URL} from "../utilities/url"
import { useContext, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Loading from "../components/Loading"
import { UserContext } from "../context/UserContext"
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
      const res=await axios.get(URL+"/api/posts/"+search)
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
<div className="px-8 md:px-[200px] min-h-[80vh]">
        {loading?<div className="h-[40vh] flex justify-center items-center"><Loading/></div>:!noResults?
        posts.map((post)=>(
          <>
          <Link to={user?`/posts/post/${post._id}`:"/login"}>
          <Dashboard key={post._id} post={post}/>
          </Link>
          </>
          
        )):<h3 className="text-center font-bold mt-16">No posts available</h3>}
    </div>
    <Footer/>
    </>
    
  )
}

export default HomePage