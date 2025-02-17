import jwt from "jsonwebtoken";

export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: any,
  expiresIn: any
) => {
  return jwt.sign(jwtPayload, secret as jwt.Secret, {
    expiresIn,
  });
};
