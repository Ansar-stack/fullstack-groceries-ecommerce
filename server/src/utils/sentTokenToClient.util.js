
export const sentTokenToClient = (cookieName, token, res)=>{
    res.cookie(cookieName, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
        sameSite: true
    })
}