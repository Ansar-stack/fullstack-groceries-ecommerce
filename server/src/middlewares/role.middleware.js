
export const authorize = (...allowedRoles)=>{
    return (req, res, next)=>{
        if(!allowedRoles.includes(req.user.role)){
            return res.respond(403, "Forbidden");
        };
        next();
    };
};