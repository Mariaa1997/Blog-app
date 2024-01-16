// bring in all dependencies
const dotenv=require('dotenv')
const express = require("express");
const mongoose=require("mongoose")
const app = express();
const cors = require('cors')
const multer = require('multer')
const path = require("path");
const cookieParser= require('cookie-parser')
const authRoute = require("./routes/api/auth.cjs");
const userRoute = require("./routes/api/users.cjs")
const postRoute = require("./routes/api/posts.cjs")
const commentRoute =require("./routes/api/comments.cjs")


// Connect to the database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('connected to mongo')
    } catch (error) {
        console.error("mongo connection error:",error);
        throw new Error("unable to connect to the database")
    }
}

//middlewares
dotenv.config();

app.use(express.json());
app.use('/images', express.static(path.join(__dirname,"/images")))
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentRoute)


//images 
const storage = multer.diskStorage({
    destination:(req,file,fn) => {
        fn(null, "images")
    },
    filename:(req,file,fn) => {
        fn(null, req.body.img)
    }
})

//upload img
const upload = multer({storage:storage})
app.post("/api/upload",upload.single('file'),(req,res) => {
    try {
        //handle the successful upload
        res.status(200).json("image has been uploaded")
    } catch (error) {
        //handle upload error
        console.error("image upload error:",error);
        res.status(500).json("Image upload failed")
    }
    
})

// to return the index.html on all non-AJAX requests
// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });

app.listen(process.env.PORT, function () {
    connectDB()
  console.log("Express app running on port:" +process.env.PORT);
});
