const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        unique: true,
    },
    user:{
        type: Array,
    },
    states: {
        type: Number,
        enum: [0,1, 2, 3],
        default: 1
    }
    ,
    description: {
        type: String,
        default: ""
    },
    files: {
        type: Array,
        default: []
    },
    timeOfPost: {
        type: String,
      
    },
    likes: {
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    },
    shares: {
        type: Array,
        default: []
    }
}, { timestamps: true }
);

const postModel = new mongoose.model('Post', postSchema);
module.exports = postModel;
