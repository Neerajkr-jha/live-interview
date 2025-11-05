import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js'
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { loginUser, logoutUser, registerUser } from '../controllers/authController.js';
import verifyJWT from '../middleware/authMiddleware.js';

const router = express.Router();

// Helper function to generate a JWT
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: '30d', // Token will expire in 30 days
//   });
// };





/**
 * @route   POST /api/users/register
 * @desc    Register a new user
 */
router.post('/register', registerUser)

//   const {accessToken,refreshToken}= await generateAccessAndRefereshTokens(user._id)

//     const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

//         const options = {  //Instead of repeating attributes for each cookie() call, you define them once in the options object, making the code DRY (Don't Repeat Yourself). // reusability adds also.
//         httpOnly: true, //This is a crucial security feature to mitigate cross-site scripting (XSS) attacks.
//         secure: true  //The secure attribute ensures the cookie is only sent over HTTPS, never over unencrypted HTTP connections.// This protects the cookie from being intercepted by attackers via man-in-the-middle (MITM) attacks on unencrypted connections.
//      }


//      return res
//      .status(200)
//      .cookie("accessToken", accessToken, options)
//      .cookie( "refreshToken", refreshToken, options)
//      .json(
//         new ApiResponse(
//             200,
//             {
//                 user: loggedInUser,accessToken, refreshToken
//             },
//            user.role === "counselor"?  "Counselor logged in successfully" : "User logged in successfully"
//         )
//      )

    
// })















/**
 * @route   POST /api/users/login
 * @desc    Authenticate user & get token
 */
router.post('/login',loginUser)


// router.post('/logout', logoutUser)

router.post('/logout', verifyJWT, logoutUser);


export default router;