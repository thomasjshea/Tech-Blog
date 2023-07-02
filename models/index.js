const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');
const BlogPost = require('./BlogPost');

User.hasMany(BlogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

BlogPost.belongsTo(User, {
    foreignKey: 'user_id',
});

BlogPost.hasMany(Comment, {
    foreignKey: 'BlogPost_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(BlogPost, {
    foreignKey: 'comment_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "CASCADE"
});


module.exports = { User, BlogPost, Comment}