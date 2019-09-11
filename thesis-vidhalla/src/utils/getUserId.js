import jwt from "jsonwebtoken";

const getUserId = (request, requireAuth = true) => {
  const authorizationHeader = request.request.headers.authorization;

  if (authorizationHeader) {
    const token = authorizationHeader.replace("Bearer ", "");
    const decodedToken = jwt.verify(token, "s3cr37");
    return decodedToken.userId;
  }

  if (requireAuth) {
    throw new Error("Authentication required");
  }

  const token = authorizationHeader.replace("Bearer ", "");
  const decodedToken = jwt.verify(token, "s3cr37");

  return decodedToken.userId;
};

export default getUserId;
