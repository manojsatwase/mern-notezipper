const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// register user
const registerUser = asyncHandler(
    async (req,res)=> {
        const {name,email,password,pic} = req.body;
        // check if its user exist in are dbs
        const userExists = await User.findOne({email});
        if(userExists){
            res.status(400) // status for error
            throw new Error('User Already Exists')
        }
        const user = await User.create({
            name,
            email,
            password,
            pic
        })
        if(user){
            // 201 status code for successfull
            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                password:user.password,
                isAdmin:user.isAdmin,
                pic:user.pic,
                token:generateToken(user._id),
            })
        }else{
            // server error
            res.status(400);
            throw new Error('Error Occured!');
        }   
     } 
)
// login user
const loginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
  
    const checkPassword = await user.matchPassword(password);

    if(user && checkPassword){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            password:user.password,
            isAdmin:user.isAdmin,
            pic:user.pic,
            token:generateToken(user._id),
        })
    }else{
        res.status(400);
        throw new Error('Invalid Email or Password!');
    }

})

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.pic = req.body.pic || user.pic;
      console.log(user.name, req.body.name)
      if (req.body.password) {
        user.password = req.body.password;
      }
  
      const updatedUser = await user.save();
       console.log(updatedUser);
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        pic: updatedUser.pic,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User Not Found");
    }
  });
  

module.exports = {registerUser,loginUser,updateUserProfile};