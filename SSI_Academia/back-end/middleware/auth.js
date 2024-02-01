import jwt from "jsonwebtoken";

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access Denied! No token provided.");
  try {
    const decodedPayload = jwt.verify(token, "jwtPrivateKey");
    req.user = decodedPayload;
    next();
  } catch (error) {
    return res.status(400).send("Invalid token");
  }
}

export { auth };
