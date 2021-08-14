const bodyParser = require("body-parser");
const {
    urlencoded
} = require("body-parser");
const express = require("express");
const app = express();
var _ = require("lodash")
const mongoose = require('mongoose');
app.use(bodyParser.urlencoded({
    extended: true
}));
const {MongoClient} = require('mongodb');
// const client = new MongoClient(uri);
app.use(express.static("public"));
app.set('view engine', 'ejs');



const posts = [];
const homeStartingContent = "Following are some of the blogs, which are so much appreciated by our readers around the world.";
const aboutContent = "We aim to provide a free platform to all the writers and readers around the globe. So that, they can learn and grow together while taking others in there journey of success.";
const contactContent = "It's nice seeing you here, drop your query. We will get back on you soon.";

mongoose.connect('mongodb+srv://deeqakkk:deepak123@blogwebsite.sycan.mongodb.net/daily-journal', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const blogSchema={
    title:String,
    content:String
};
const Blog=mongoose.model("Blog",blogSchema);

app.get("/", function (req, res) {
    Blog.find(function(err,blogs){
        if(!err)
        res.render("home", {
            ejsHomeContent: homeStartingContent,
            ejsPosts: blogs
        });
        else console.log(err);
    });
    
});


app.get("/posts/:postName", function (req, res) {
    let testCase = req.params.postName;

    var testCases = _.lowerCase(testCase);
    Blog.findOne({title:testCases},function(err,blogFound){
        if(!err)
        res.render("post", {
            ejsPostHeading: blogFound.title,
            ejsPostBody: blogFound.content
        });
        else console.log(err);
    })
   
});



app.get("/about", function (req, res) {
    res.render("about", {
        ejsaboutContent: aboutContent
    });
});
app.get("/contact", function (req, res) {
    res.render("contact", {
        ejscontactContent: contactContent
    });
});
app.get("/compose", function (req, res) {
    res.render("compose");
});
app.post("/createBlog", function (req, res) {
    res.redirect("/compose");
});
app.post("/compose", function (req, res) {
    const newBlog =new Blog ({
        title: req.body.ejsPostTitle,
        content: req.body.ejsPostContent
    });
    newBlog.save();
    // posts.push(newPost);
    res.redirect("/");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port,function(){
    console.log("Server running on port 3000")
});