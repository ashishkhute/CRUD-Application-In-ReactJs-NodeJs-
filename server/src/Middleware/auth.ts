import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt, { Secret  } from "jsonwebtoken";
import { TOKEN_SECRET } from "../Services/UserService";


export const Authorize = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get the token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token not provided" });
  }

  try {
    
    const key = TOKEN_SECRET;
    if (!key) {
      throw new Error("Token secret is not defined");
    }
    const decoded = jwt.verify(token, key as Secret);
    
    req.body.email = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid access token" });
  }
};

export const VerifyUser = () =>{
  
}



