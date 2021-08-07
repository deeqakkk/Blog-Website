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
const homeStartingContent = "This is all about home starting content, which wiill be displayed in home page";
const aboutContent = "About page is a unique page for this blog page where you can find all my social media handles";
const contactContent = "Sorry about 'AboutPage', actually its here where you can find all the contacts details";

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