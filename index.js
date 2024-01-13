import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var blogList = [
    {
        id : 1,
        title : "Title-1",
        content : "This is a blog.",
        authorName : "Aakash Sharma"
    }
]

app.get("/", (req,res)=>{
    res.render("index.ejs",{
        blogList : blogList
    });
})
app.get("/post/:id",(req,res)=>{
    // res.redirect("/");
    const user_id = req.params.id-1;
    // console.log(user_id);
    // var num = 
    console.log(blogList[user_id]);
    var blogObject = blogList[user_id];
    res.render("post.ejs",{
        blog : blogObject,
    })
})
app.post("/post", (req,res)=>{
    // console.log("It was handeled.");
    // console.log(req.body);
    var blog = req.body;
    Object.defineProperty(blog,'id',{
        value : blogList.length+1,
        writable : false
    })
    blogList.push(blog);
    res.redirect("/");
})

app.listen(port,()=>{
    console.log(`Server is running on ${port} port.`);
})