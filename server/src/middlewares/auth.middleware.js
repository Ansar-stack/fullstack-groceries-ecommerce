import {User} from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import {generateAccessToken} from '../utils/tokens.util.js'
import {sentTokenToClient} from '../utils/sentTokenToClient.util.js'
export const authMiddleware =  async(req, res, next)=>{
    const {acc_token, ref_token} = req.cookies;
    if(!acc_token && !ref_token)return res.respond(401, "Unauthorized");
    if(acc_token){
        try {
            const decode = jwt.verify(acc_token, process.env.ACCESS_TOKEN_SECRET);
            console.log(decode.payload);
            const userFound = await User.findById(decode.payload);
            if(!userFound)return res.respond(401, "Invalid Access token: Unauthorized");
            req.user = userFound;
            return next();
        } catch (error) {
            // Check the refresh token
        };
        // Check the refresh token 
    }
    if(!ref_token)return res.respond(401, "Unauthorized");
    // Refresh token verification
    try {
        const decode = jwt.verify(ref_token, process.env.REFRESH_TOKEN_SECRET);
        const userFound =  await User.findById(decode.payload);
         if(!userFound)return res.respond(401, "Unauthorized");
            const accessToken = generateAccessToken(userFound.id);
            sentTokenToClient('acc_token', accessToken, res);
            req.user = userFound;
            return next();
    } catch (error) {
        return res.respond(401, "Unauthorized");
    }
}   