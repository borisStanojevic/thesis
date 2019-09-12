import jwt from "jsonwebtoken";

const generateJwt = userId => {
  return jwt.sign({ userId }, "s3cr37", {
    expiresIn: "5 days"
  });
};

export default generateJwt;
