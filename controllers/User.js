const User = require('../models/users');
const Upload = require('../models/upload');

const jwt = require('jsonwebtoken');
const path = require("path");
module.exports.login = async function(req, res) {

    try {
        let user = await User.findOne({ email: req.body.email });

        if (!user || user.password != req.body.password) {
            return res.json(422, {
                message: "Invalid username or password"
            });
        }

        return res.json(200, {
            message: 'Sign in successful, here is your token, please keep it safe!',
            data: {
                user,
                token: jwt.sign(user.toJSON(), 'codeial', { expiresIn: '10000000' })
            }
        })

    } catch (err) {
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}

module.exports.register = (req, res) => {
    if (!req.body.email) {
        return res.status(400).send({
            message: "content can't be empty"
        });
    }

    const register = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        userType: req.body.password
    });
    register.save().then(
            data => {
                res.send(data);
            })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error occured"

            });
        });
};

module.exports.editUser = async(req, res) => {

    let found = await User.findById({ id: req.params.id },
        (err, user) => {
            if (err) {
                res.send(err);
            }
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password;
            user.save(err => {
                if (err) {

                    res.send(err);
                }
                res.json({ message: 'Updated ' });

            });
        }
    )

};

module.exports.upload = async function(req, res) {
    try {
        // get the uploadedAvatar from statics of model file, which contains the values using multer
        Upload.uploadedAvatar(req, res, function(err) {
            if (err) {
                console.log("Multer Error", err);
            }

            //if there is a file in your request, use this
            if (req.file) {
                // create a new entry in your DB
                Upload.create({
                    avatar: path.join(Upload.avatarPath, "/", req.file.filename),
                    filename: req.file.filename,
                });
            }
        });

        //  this.upload.save();


        return res.json(200, {

            message: "upload Successfull",


        });
        // return res.redirect("back");
    } catch (err) {
        console.log("********", err);
        return res.json(500, {
            message: "Internal Server Error",
        });
    }


};

module.exports.verify = async(req, res) => {
    const user = await User.findById(req.user);
    res.json({
        //displayName:user.displayName,
        id: user._id,
    });


};