//WEBSITE SETUP

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeContent = "Hey there! Welcome to your own personal blog! At the moment, it isn't linked to an outside database. With that being the case, it isn't yet possible to make the blog accessbile to multiple users. This will be implemented at some point, so stay tuned!";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

const allPosts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

// HOME PAGE

app.get('/', function(req, res) {
  res.render('home', {
    homeContent: homeContent,
    allPosts: allPosts
  });
});

// COMPOSE PAGE

app.get('/compose', function(req, res) {
  res.render('compose');
});

app.post('/compose', function(req, res) {
  const postInfo = {
    postTitle: req.body.postTitle,
    postBody: req.body.postBody
  };

  allPosts.push(postInfo);
  res.redirect('/');
});

// ABOUT PAGE

app.get('/about', function(res, res) {
  res.render('about', {
    aboutContent: aboutContent
  });
});

// CONTACT PAGE

app.get('/contact', function(res, res) {
  res.render('contact', {
    contactContent: contactContent
  });
});

// INDIVIDUAL POSTS

app.get('/posts/:postName', function(req, res) {
  const requestedTitle = req.params.postName;
  allPosts.forEach(function(post) {
    const storedTitle = post.postTitle;
    if (_.lowerCase([string = storedTitle]) === _.lowerCase([string = requestedTitle])) {
      res.render('post', {
        postTitle: post.postTitle,
        postBody: post.postBody
      });
    }
  });
});






app.listen(3000, function() {
  console.log("Server started on port 3000");
});
