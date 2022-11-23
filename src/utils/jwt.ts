import jwt from "jsonwebtoken";
import config from "../config/default";

const privateKey = config.privateKey as string;
const publicKey = config.publicKey as string;

export function signJwt(object: object, option?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(option && option),
    algorithm: "RS256",
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
}
