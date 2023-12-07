const ErrorResponse = require("../utils/ErrorResponse");
const jwt = require("jsonwebtoken");
const Personnel = require("../models/Personnel");

// Login Permission
exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1];

  if (!token)
    throw new ErrorResponse(401, "Not authorize to access this route");
  // verify the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await Personnel.findById(decoded._id);
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) return next();
  throw new ErrorResponse(403, "No Permission Admin login is required!");
};

exports.isAdminOrOwner = (req, res, next) => {
  const userId = req.params?.id || null;
  if (req.user && (req.user.isAdmin || req.user._id.toString() === userId)) return next();
  throw new ErrorResponse(403, "No Permission Admin login or account owner");
};

exports.isAdminOrLead = (req, res, next)=>{
  const deptId = req.params.id || null;
  console.log(req.user.departmentId)
  if(req.user &&(req.user.isAdmin|| (req.user.isLead && req.user.departmentId.toString() ===deptId)))
    return next();
    throw new ErrorResponse(403, "No Permission Admin login or Department Lead");
}
