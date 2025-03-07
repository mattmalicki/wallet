import jwt from "jsonwebtoken";
import { jwtSecretKey, jwtRefreshSecretKey } from "../../config/secrets";

function signAccessToken(userId: string) {
  const accessToken = jwt.sign({ id: userId }, jwtSecretKey, {
    expiresIn: "1h",
  });
  return accessToken;
}

function signRefreshToken(userId: string) {
  const refreshToken = jwt.sign({ id: userId }, jwtRefreshSecretKey, {
    expiresIn: "30d",
  });
  return refreshToken;
}

function checkRefreshToken(token: string): any {
  try {
    return jwt.verify(token, jwtRefreshSecretKey);
  } catch (error) {
    return error;
  }
}

export { signAccessToken, signRefreshToken, checkRefreshToken };
