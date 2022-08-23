const express = require('express');
require('dotenv').config()
const userRoutes = require('./Routes/userRoutes');
const filesRoutes = require('./Routes/uploadFilesRoutes');
const postRoutes = require('./Routes/postRoutes');
const mongoose = require('mongoose');
const config = require('./config/keys'); 
const cloudinary = require('cloudinary').v2;
const app = express();
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const socketServer = require('./socketServer'); 
// const Cryptr = require('cryptr');
const connectDB = require('./database/connection');
const AppError = require('./util/appError');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const upload = require('./middlewares/multer');
// const cryptr = new Cryptr(config.crptrSecret);
const port = process.env.PORT || 5001 ;


 


// connect socket server
socketServer(new Server(server));
 

/******MongoDb Connection******/
connectDB() 

const sessionsMap = {};

// io.on('connection', socket => {
//     console.log('New Connection');
//     console.log('user connected');

//     // socket.on("join", ({ userId, username }) => {
        
//     //     setInterval(() => {
//     //         io.emit('msg', { data: [1, 2, 3] });
//     //     }, 5000);
//     // })

//     socket.on("join", ({ userId, username }) => {
//         sessionsMap[userId] = socket.id;
//         console.log(sessionsMap);
//         socket.emit("new", "wjqfhdkq3r831r80")
//         socket.on("Get Online Status", (online) => {
//             io.emit('Outputting Online Status', `Online`);
//             const receiverId = sessionsMap[online.receiver];
//             if (receiverId) {
//                 socket.emit('Outputting Online Status', `Online`);
//             } else {
//                 socket.emit("Outputting Online Status", "");
//             }
//         });


//         socket.on("The user is typing....", (typing) => {
//             const receiverId = sessionsMap[typing.receiver];
//             socket.broadcast.to(receiverId).emit('outputting typing', `Typing...`);
//         });

//         socket.on("Delete Chat", (deleteChat) => {
//             Chat.findOneAndDelete({ "$or": [{ _id: deleteChat.chatId, "sender": deleteChat.userId, "receiver": deleteChat.receiverId }, { _id: deleteChat.chatId, "sender": deleteChat.receiverId, "receiver": deleteChat.userId }] })
//                 .exec((error, data) => {
//                     if (error) {
//                         console.log(error);
//                     }
//                     if (data) {
//                         data.cloudinary_id && cloudinaryCon.uploader.destroy(data.cloudinary_id)
//                         data.remove();
//                         data.save();
//                         Chat.find({ "$or": [{ "sender": deleteChat.userId, "receiver": deleteChat.receiverId }, { "sender": deleteChat.receiverId, "receiver": deleteChat.userId }] })
//                             .populate('sender')
//                             .exec((err, result) => {
//                                 if (err) {
//                                     console.log(err);
//                                 }
//                                 result.map(r => r.message = cryptr.decrypt(r.message));
//                                 const receiverId = sessionsMap[deleteChat.receiverId];
//                                 socket.broadcast.to(receiverId).emit('Output Chat Message', result);
//                                 socket.emit("Output Chat Message", result);

//                             });

//                     }

//                 });
//         });

//         socket.on("Input Chat Message", (msg) => {
//             const encryptedMessage = cryptr.encrypt(msg.message);
//             let chat = new Chat({
//                 message: encryptedMessage,
//                 cloudinary_id: msg.cloudinary_id,
//                 sender: msg.userId,
//                 receiver: msg.receiver,
//                 timeOfSending: msg.nowTime,
//                 type: msg.type
//             });

//             chat.save((error, doc) => {
//                 if (error) {
//                     console.log(error);
//                 }
//                 Chat.find({ "$or": [{ "sender": msg.userId, "receiver": msg.receiver }, { "sender": msg.receiver, "receiver": msg.userId }] })
//                     .populate("sender")
//                     .exec((err, result) => {
//                         if (err) {
//                             console.log(error);
//                         }
//                         result.map(r => r.message = cryptr.decrypt(r.message));
//                         const receiverId = sessionsMap[msg.receiver];
//                         socket.broadcast.to(receiverId).emit('Output Chat Message', result);
//                         socket.emit("Output Chat Message", result);

//                     });
//             });
//         });
//     });

// });



/************ MiddleWares  ********************/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/api/users', userRoutes);
app.use('/api/files', filesRoutes);
app.use('/api/posts', postRoutes);


app.post('/file/uploads/', upload.array('files', 5), async (req, res) => {
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

    res.send(urls);
});





app.get('/', async (req, res) => {
    res.send('Server is running...')
})


app.all('*', (req, res, next) =>
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
);
app.use(globalErrorHandler);
 
app.listen(port, () => {
    console.log(`Listening on port   http://localhost:${port}`) 

  })