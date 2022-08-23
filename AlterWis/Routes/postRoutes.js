const express = require('express');
const { postsList, addPost, deletePost, getPostById, updatePost, updateFile, deleteFile, addPostFiles, updatePostLike, updatePostComments, updatePostShares, deleteLike, deleteComment, deleteShare, updatePostFile } = require('../controllers/postController');
const { AuthenticatorJWT } = require('../middlewares/authenticator');
const upload = require('../middlewares/multer');

const router = express.Router();

router.get('/list', AuthenticatorJWT, postsList);
router.get('/get/:id', getPostById);
router.post('/add', upload.array('files', 5), addPost);
router.post('/update/:id', updatePost);
router.delete('/delete/:id', AuthenticatorJWT ,deletePost);
router.post('/file/upload', addPostFiles) 

router.post('/add/:postID/likes', updatePostLike);
router.post('/add/:postID/comments', updatePostComments);
router.post('/add/:postID/shares', updatePostShares); 
router.post('update/:postID/files', updatePostFile)
router.delete('/delete/like/:postID/:likeID',AuthenticatorJWT ,deleteLike);
router.delete(
    '/delete/comment/:postID/:commentID',AuthenticatorJWT, deleteComment);
router.delete('/delete/share/:postID/:shareID',AuthenticatorJWT,AuthenticatorJWT, deleteShare);
router.delete('/delete/file/:postID/:fileID',AuthenticatorJWT, deleteFile);


module.exports = router;