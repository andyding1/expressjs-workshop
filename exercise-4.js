var Sequelize = require('sequelize');
var express = require('express');
var app = express();

var db = new Sequelize('reddit', 'andyding', '', {
    dialect: 'mysql'
});

var User = db.define('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING, // TODO: make the passwords more secure!
    email: Sequelize.STRING
});

// Even though the content belongs to users, we will setup the userId relationship later
var Content = db.define('content', {
    url: Sequelize.STRING,
    title: Sequelize.STRING,
    //userId: Sequelize.INTEGER
});

// Even though a vote has a link to user and content, we will setup the relationship later
var Vote = db.define('vote', {
    upVote: Sequelize.BOOLEAN,
    //userId: Sequelize.INTEGER,
    //contentId: Sequelize.INTEGER
});

// User <-> Content relationship
Content.belongsTo(User); // This will add a `setUser` function on content objects
User.hasMany(Content); // This will add an `addContent` function on user objects

// User <-> Vote <-> Content relationship
User.belongsToMany(Content, {
    through: Vote,
    as: 'Upvotes'
}); // This will add an `add`
Content.belongsToMany(User, {
    through: Vote
});

function getLatestContent(n) {
    return Content.findAll({
        include: [User],
        limit: n,
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(function(results) {
        var newResult = results.map(function(object){
            return object.dataValues;
        });
        //console.log(JSON.stringify(newResult,null,2));
        return newResult;
    });
    //db.close();
}

function htmlThis(contentArray) {
    var htmlString =
        '<div id="contents">\
        <h1>List of contents</h1>\
        <ul class="contents-list">';
    console.log(contentArray);
    contentArray.forEach(function(content) {
        htmlString +=
            '<li class="content-item">\
                <h2 class="content-item__title">\
                    <a href=' + content.url + '>' + content.title + '</a>\
                </h2>\
                <p>' + content.user.username + '</p>\
                </li>';
    });
    htmlString +=
        '</ul>\
        </div>';
    return htmlString;
}

app.get('/contents', function(req, res) {
    getLatestContent(5).then(function(result){
        res.send(htmlThis(result));
    });
});

var server = app.listen(process.env.PORT, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});