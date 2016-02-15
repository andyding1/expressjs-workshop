var Sequelize = require('sequelize');

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
User.belongsToMany(Content, {through: Vote, as: 'Upvotes'}); // This will add an `add`
Content.belongsToMany(User, {through: Vote});

//db.sync(); // Only needs to be used once!

function createNewUser(username, password, callback){
    User.create({
        username: username,
        password: password,
    }).then(function(result){
        callback(result);
    });
}

// createNewUser('anonymous','ding',function(userCreated){
//     console.log(userCreated);
// });

// function createNewContent(userId,url,title,callback){
//     Content.create({
//         userId: userId,
//         url: url,
//         title: title
//     }).then(function(result){
//         callback(result);
//     });
// }

function createNewContent(userId,url,title,callback){
    User.findById(userId).then(function(user){
        user.createContent({
            url: url,
            title: title
        }).then(function(result){
            callback(result);
        });
    });
}

// createNewContent('1','https://www.google.com/','Great search engine',console.log);
// createNewContent('1','https://www.reddit.com/','Front page of the web',console.log);
// createNewContent('1','https://www.stackoverflow.com/','For all your coding needs',console.log);
// createNewContent('1','https://www.facebook.com/','Book with your face on it',console.log);
// createNewContent('1','https://news.google.com/','Bunch of news',console.log);
// createNewContent('1','http://www.ign.com/','News/review for games and geek stuff',console.log);
// createNewContent('1','http://www.metacritic.com/','Good review site',console.log);
// createNewContent('1','http://www.yelp.com/','Good site to find a good place to eat',console.log);
// createNewContent('1','https://www.youtube.com/','Watching videos',console.log);
// createNewContent('1','http://kotaku.com/','Gamer news',console.log);