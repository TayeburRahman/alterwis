const Post = require('../Models/postModel');
const { successResponseObject, errorResponseObject } = require('./ResponseObject'); 
const fs = require("fs");
const { cloudinary_cloud_name, cloudinary_api_key, cloudinary_api_secret } = require('../config/prod');
const cloudinary = require('cloudinary').v2;
const config = require('../config/keys');



const postsList = [
    {
        user: {
            _id: "1",
            fullName: "Fatbardh Asani",
            picture: "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            title: "SYSTEM ENGINEER",
            location: "Markham, Ontorio"
        },
        description: "Physiological respiration involves the mechanisms that ensure that the composition of the tunctional residual capacity is kept of constant, and equilibrates with the gases dissolved in marketing pulmonary capillary blood, and thus throughout the body.",
        files: [
            {
                _id: "1",
                file: "https://images.pexels.com/photos/13010671/pexels-photo-13010671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                mimeType: "image/jpeg",
                fileType: "image"
            },
            {
                _id: "2",
                file: "https://images.pexels.com/photos/13010671/pexels-photo-13010671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                mimeType: "image/jpeg",
                fileType: "image"
            },
            {
                _id: "3",
                file: "https://images.pexels.com/photos/13010671/pexels-photo-13010671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                mimeType: "image/jpeg",
                fileType: "image"
            },
            {
                _id: "4",
                file: "https://images.pexels.com/photos/13010671/pexels-photo-13010671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                mimeType: "image/jpeg",
                fileType: "image"
            },
        ],
        timeOfPost: "Sunday, July 14th 2022, 3:28:50 pm",
        likes: [
            {
                _id: "1",
                fullName: "Saeed Ahmed",
                picture: "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            },
            {
                _id: "2",
                fullName: "Ahmed Shehzad",
                picture: "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            },
            {
                _id: "3",
                fullName: "Zahid Mehmood",
                picture: "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            },
        ],
        comments: [
            {
                _id: "1",
                fullName: "Saeed Ahmed",
                picture: "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                comment: "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without",
            },
            {
                _id: "2",
                fullName: "Ahmed Shehzad",
                picture: "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                comment: "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without",
            },
            {
                _id: "3",
                fullName: "Zahid Mehmood",
                picture: "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                comment: "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without",
            },
        ],
        shares: [
            {
                _id: "1",
                fullName: "Saeed Ahmed",
                picture: "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            },
            {
                _id: "2",
                fullName: "Ahmed Shehzad",
                picture: "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            },
            {
                _id: "3",
                fullName: "Zahid Mehmood",
                picture: "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            },
        ]
    },
    {
        user: {
            _id: "3",
            fullName: "Saeed Ahmed",
            picture: "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            title: "Web Developer",
            location: "Sadiqabad, Pakistan"
        },
        description: "Physiological respiration involves the mechanisms that ensure that the composition of the tunctional residual capacity is kept of constant, and equilibrates with the gases dissolved in marketing pulmonary capillary blood, and thus throughout the body.",
        files: [
            {
                _id: "1",
                file: "https://images.pexels.com/photos/13010671/pexels-photo-13010671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                mimeType: "image/jpeg",
                fileType: "image"
            },
            {
                _id: "2",
                file: "https://images.pexels.com/photos/13010671/pexels-photo-13010671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                mimeType: "image/jpeg",
                fileType: "image"
            },
            {
                _id: "3",
                file: "https://images.pexels.com/photos/13010671/pexels-photo-13010671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                mimeType: "image/jpeg",
                fileType: "image"
            },
            {
                _id: "4",
                file: "https://images.pexels.com/photos/13010671/pexels-photo-13010671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                mimeType: "image/jpeg",
                fileType: "image"
            },
        ],
        timeOfPost: "Sunday, July 14th 2022, 3:28:50 pm",
        likes: [
            {
                _id: "1",
                fullName: "Saeed Ahmed",
                picture: "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            },
            {
                _id: "2",
                fullName: "Ahmed Shehzad",
                picture: "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            },
            {
                _id: "3",
                fullName: "Zahid Mehmood",
                picture: "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            },
        ],
        comments: [
            {
                _id: "1",
                fullName: "Saeed Ahmed",
                picture: "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                comment: "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without",
            },
            {
                _id: "2",
                fullName: "Ahmed Shehzad",
                picture: "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                comment: "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without",
            },
            {
                _id: "3",
                fullName: "Zahid Mehmood",
                picture: "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                comment: "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without",
            },
        ],
        shares: [
            {
                _id: "1",
                fullName: "Saeed Ahmed",
                picture: "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            },
            {
                _id: "2",
                fullName: "Ahmed Shehzad",
                picture: "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            },
            {
                _id: "3",
                fullName: "Zahid Mehmood",
                picture: "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            },
        ]
    },
    {
        user: {
            _id: "2",
            fullName: "Zahid Mehmood",
            picture: "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            title: "Mobile Developer",
            location: "Lahore, Pakistan"
        },
        description: "Physiological respiration involves the mechanisms that ensure that the composition of the tunctional residual capacity is kept of constant, and equilibrates with the gases dissolved in marketing pulmonary capillary blood, and thus throughout the body.",
        files: [
            {
                _id: "1",
                file: "https://images.pexels.com/photos/13010671/pexels-photo-13010671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                mimeType: "image/jpeg",
                fileType: "image"
            },
            {
                _id: "2",
                file: "https://images.pexels.com/photos/13010671/pexels-photo-13010671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                mimeType: "image/jpeg",
                fileType: "image"
            },
            {
                _id: "3",
                file: "https://images.pexels.com/photos/13010671/pexels-photo-13010671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                mimeType: "image/jpeg",
                fileType: "image"
            },
            {
                _id: "4",
                file: "https://images.pexels.com/photos/13010671/pexels-photo-13010671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                mimeType: "image/jpeg",
                fileType: "image"
            },
        ],
        timeOfPost: "Sunday, July 14th 2022, 3:28:50 pm",
        likes: [
            {
                _id: "1",
                fullName: "Saeed Ahmed",
                picture: "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            },
            {
                _id: "2",
                fullName: "Ahmed Shehzad",
                picture: "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            },
            {
                _id: "3",
                fullName: "Zahid Mehmood",
                picture: "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            },
        ],
        comments: [
            {
                _id: "1",
                fullName: "Saeed Ahmed",
                picture: "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                comment: "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without",
            },
            {
                _id: "2",
                fullName: "Ahmed Shehzad",
                picture: "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                comment: "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without",
            },
            {
                _id: "3",
                fullName: "Zahid Mehmood",
                picture: "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                comment: "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without",
            },
        ],
        shares: [
            {
                _id: "1",
                fullName: "Saeed Ahmed",
                picture: "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            },
            {
                _id: "2",
                fullName: "Ahmed Shehzad",
                picture: "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            },
            {
                _id: "3",
                fullName: "Zahid Mehmood",
                picture: "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            },
        ]
    },

]


exports.postsList = async (req, res) => {
    const posts = await Post.find({ user: req.user._id }).sort({ createdAt: -1 });
    if (posts) {
        res.json(successResponseObject({ posts }, 'Posts List'));
    }
    else {
        // res.json(errorResponseObject({ posts: postsList }, 'No Posts found'));
        res.json(successResponseObject({ posts: postsList }, 'Default Posts'));
    }
}


exports.getPostById = async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id });
    if (post) {
        res.json(successResponseObject({ post }, 'Data found'));
    }
    else {
        res.json(errorResponseObject({ data: 'No data' }, 'No Post found'));
    }
}


exports.addPostFiles = async (req, res) =>{
console.log("dsgdsh",req.files)

     try{

        cloudinary.config({
            cloud_name: "alterwis",
            api_key: "719956432848721" ,
            api_secret: "z8G0foC7BjYVhYRYAAQiUeqs3GQ"
        });
    
        const urls = [];
        const files = req.files;
    
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const path = file.path;
            const image = await cloudinary.uploader.upload(path);
    
            urls.push({
                _id: i + 1,
                file: image.url,
                mimeType: 'image/jpeg',
                fileType: 'image',
            });
        }

        res.json(successResponseObject({ files: urls }, 'Post added successfuly!'))
     }catch{
        res.status(401).json(errorResponseObject({ data: 'No data' }, 'Post could not be added.'))

     }

}


exports.addPost = async (req, res) => {

    cloudinary.config({
        cloud_name: "alterwis",
        api_key: "719956432848721" ,
        api_secret: "z8G0foC7BjYVhYRYAAQiUeqs3GQ"
    });

    const urls = [];
    const files = req.files;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const path = file.path;
        const image = await cloudinary.uploader.upload(path); 
        urls.push({
            _id: image.public_id,
            file: image.url,
            mimeType: 'image/jpeg',
            fileType: 'image',
        });
    }


    let dt= new Date();
    let date=("0"+ dt.getDate()).slice(-2);
    let month = ("0" + (dt.getMonth() + 1)).slice(-2);
    let year= dt.getFullYear(); 
    let hour= dt.getHours();
    let minutes= dt.getMinutes();
    let second= dt.getSeconds(); 
    let outPutData = year + "-" + month + "-" + date + " " + hour +":"+ minutes + ":" + second

    const post = new Post({
        userID: req.body.userID,
        description: req.body.description,
        timeOfPost: req.body.timeOfPost,
        states: req.body.states,
        files: urls,
        timeOfPost: outPutData,
    });
 
    const savePost = await post.save();

    if (savePost) {
        res.json(
            successResponseObject({ post: savePost }, 'Post added successfuly!')
        );
    } else {
        res.json(
            errorResponseObject({ data: 'No data' }, 'Post could not be added.')
        );
    }
};

// update all post 

exports.updatePost = async (req, res) => { 
 
      const post =  await Post.findByIdAndUpdate(
           req.params.id,
           req.body
       ); 

       if(post){
        res.json(successResponseObject("success",'Post added successfuly!'));

       }else{
        res.json(errorResponseObject({ data: 'No data' }, 'No Post found')) 
       }
}


// update Like

exports.updatePostLike = async (req, res) => {
    const { likes } = req.body;
    
    try {
        const response = await Post.findOneAndUpdate(
            { _id: req.params.postID },
            {
                $addToSet: {
                    likes,
                },
            },
            { returnOriginal: false }
        );

        res.json(response);
    } catch (error) {
        return res
            .status(500)
            .json(errorResponseObject({ data: 'No data' }, 'No Post found'));
    }
};

// update Sheres 

exports.updatePostShares = async (req, res) => {
    const { shares } = req.body;
    try {
        const response = await Post.findOneAndUpdate(
            { _id: req.params.postID },
            {
                $push: {
                    shares,
                },
            },
            { returnOriginal: false }
        );

        res.json(response);
    } catch (error) {
        return res
            .status(500)
            .json(errorResponseObject({ data: 'No data' }, 'No Post found'));
    }
};



// update files 
exports.updatePostFile = async (req, res) => {
    
    cloudinary.config({
        cloud_name: "alterwis",
        api_key: "719956432848721" ,
        api_secret: "z8G0foC7BjYVhYRYAAQiUeqs3GQ"
    });

    const urls = [];
    const { files } = req.body;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const path = file.path;
        const image = await cloudinary.uploader.upload(path);

        urls.push({
            _id: i + 1,
            file: image.url,
            mimeType: 'image/jpeg',
            fileType: 'image',
        });
    }

 
    try {
        const response = await Post.findOneAndUpdate(
            { _id: req.params.id },
            {
                $push: {
                    files,
                },
            },
            { returnOriginal: false }
        );

        res.json(response);
    } catch (error) {
        return res
            .status(500)
            .json(errorResponseObject({ data: 'No data' }, 'No Post found'));
    }
};



// update  Comments
exports.updatePostComments = async (req, res) => {
    const { comments } = req.body;
    try {
        const response = await Post.findOneAndUpdate(
            { _id: req.params.postID },
            {
                $push: {
                    comments,
                },
            },
            { returnOriginal: false }
        );

        res.json(response);
    } catch (error) {
        return res
            .status(500)
            .json(errorResponseObject({ data: 'No data' }, 'No Post found'));
    }
};



 
exports.deleteLike = async (req, res) => {

    try {
        const response = await Post.findOneAndUpdate(
            { _id: req.params.postID },
            {
                $pull: {
                    likes: {
                        _id: req.params.likeID,
                    },
                },
            },
            { returnOriginal: false }
        );

       return res.json(response);
    } catch (error) {
        return res
            .status(500)
            .json(errorResponseObject({ data: 'No data' }, 'No Post found'));
    }
};




exports.deleteComment = async (req, res) => { 

    try {
        const response = await Post.findOneAndUpdate(
            { _id: req.params.postID },
            {
                $pull: {
                    comments: {
                        comment: req.body.comment,
                    }
                }  ,
            },
            { returnOriginal: false }
        );

        res.json(response);
    } catch (error) {
        return res
            .status(500)
            .json(errorResponseObject({ data: 'No data' }, 'No Post found'));
    }
};




exports.deleteShare = async (req, res) => {

    try {
        const response = await Post.findOneAndUpdate(
            { _id: req.params.postID },
            {
                $pull: {
                    shares: {
                        _id: req.params.shareID,
                    },
                },
            },
            { returnOriginal: false }
        );

        res.json(response);
    } catch (error) {
        return res
            .status(500)
            .json(errorResponseObject({ data: 'No data' }, 'No Post found'));
    }
};



exports.deleteFile = async (req, res) => {
 
    try {
        const response = await Post.findOneAndUpdate(
            { _id: req.params.postID },
            {
                $pull: {
                    files: {
                        _id: req.params.fileID,
                    },
                },
            },
            { returnOriginal: false }
        );

        res.json(response);
    } catch (error) {
        return res
            .status(500)
            .json(errorResponseObject({ data: 'No data' }, 'No Post found'));
    }
};


























exports.deletePost = async (req, res) => {

    const post = await Post.findOne({ _id: req.params.id });
    console.log(post)
    if (post) {
        post.remove();
        res.json(successResponseObject({ data: "" }, 'Post deleted successfully'));
    }
    else {
        res.json(errorResponseObject({ data: 'No data' }, 'No Post found'));
    }
}

 