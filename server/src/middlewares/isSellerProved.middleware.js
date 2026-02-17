export const isSellerApproved = (req, res, next) => {
  if (!req.user) {
    return res.respond(401, "Not authenticated");
  }
  if (req.user.role !== "seller") {
    return res.respond(403, "Only sellers can add products");
  }
  if (!req.user.isSellerApproved) {
    return res.respond(403, "Seller is not approved yet");
  }
  next();
};
