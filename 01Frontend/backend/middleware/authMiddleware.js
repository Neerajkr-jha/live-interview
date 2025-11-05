import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import jwt from "jsonwebtoken"
import  User  from "../models/User.js";
// mongoose.set("debug", true);

 const verifyJWT = asyncHandler(async(req, res, next) => {
    //  const token =  req.cookies?accessToken || req.header
    try {
         const token =  req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    // console.log('start');
    
         if (!token){
            throw new ApiError(401,"Unauthorized request")
         }
            // console.log('end');

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select
        ("-password -refreshToken")
    
        if (!user){
            // NEXT_VIDEO: discuss about frontend 
            throw new ApiError(401,"Invalid Access Token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})


export default verifyJWT
































// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// const protect = async (req, res, next) => {
//   let token;
//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {
//       // Get token from header (e.g., "Bearer eyJhbGci...")
//       token = req.headers.authorization.split(' ')[1];

//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Get user from the token's ID and attach to request object
//       // We exclude the password from the user object attached to the request
//       req.user = await User.findById(decoded.id).select('-password');
      
//       next(); // Proceed to the next middleware or route handler
//     } catch (error) {
//       console.error(error);
//       res.status(401).json({ error: 'Not authorized, token failed' });
//     }
//   }
//   if (!token) {
//     res.status(401).json({ error: 'Not authorized, no token' });
//   }
// };

// export default protect;