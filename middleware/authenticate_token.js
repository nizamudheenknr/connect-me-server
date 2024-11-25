
// import jwt from 'jsonwebtoken'



// export const authenticate_token = (req,res,next) => {
// const token = req.header("Authorization")
// if(!token){
//     return res.status(403).json({message:"Access denied, no token provided."})
// }

// try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified; 
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token." });
//   }
// }

// export default authenticate_token









export const authenticate_token = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1]; 

  if (!token) {
      return res.status(403).json({ message: "Access denied, no token provided." });
  }

  try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified; 
      next();
  } catch (error) {
      res.status(401).json({ message: "Invalid token." });
  }
};

export default authenticate_token;
