const mongoose = require("mongoose");

const multer = require("multer");
const path = require("path");
const AVATAR_PATH = path.join("/uploads/Files/avatars");
const uploadSchema = new mongoose.Schema({
    startDate: {
        type: Date
    },
    DeadLine: {
        type: Date
    },
    avatar: {
        type: String,
    },
    filename: {
        type: String,
    },
}, {
    timestamps: true,
});

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "..", AVATAR_PATH));
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + '.pdf');
    },
});

uploadSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
    "avatar"
);
uploadSchema.statics.avatarPath = AVATAR_PATH;

const Upload = mongoose.model("Upload", uploadSchema);

module.exports = Upload;