const bodyParser = require("body-parser");
const {
    urlencoded
} = require("body-parser");
const express = require("express");
const app = express();
var _ = require("lodash")

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.set('view engine', 'ejs');


let urlLink = "";

const posts = [];
const homeStartingContent = "Following are some of the blogs, which are so much appreciated by our readers around the world.";
const aboutContent = "We aim to provide a free platform to all the writers and readers around the globe. So that, they can learn and grow together while taking others in there journey of success.";
const contactContent = "It's nice seeing you here, drop your query. We will get back on you soon.";

app.get("/", function (req, res) {
    res.render("home", {
        ejsHomeContent: homeStartingContent,
        ejsPosts: posts
    });
});
// Route Parameter

app.get("/posts/:postName", function (req, res) {
    let testCase = req.params.postName;
    
    var testCases=_.lowerCase(testCase);
    posts.forEach(post => {
        if (post.postTitle === testCases)
            {
                res.render("post",{
                    ejsPostHeading:post.postTitle,
                    ejsPostBody:post.postContent
                });
            }    ;
            
            
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
    const newPost = {
        postTitle: req.body.ejsPostTitle,
        postContent: req.body.ejsPostContent
    };
    posts.push(newPost);
    res.redirect("/");
});

app.listen(3000, function (req, res) {
    console.log("Server running on Port 3000");
});