import "dotenv/config";
import jwt from "jsonwebtoken";

const payload: jwt.JwtPayload = {
  iss: "http://purpleshorts.co.in",
  sub: "Mahesh5726",
};

// const jwtSecretKey = "HelloWorld@1234";
const jwtSecretKey = process.env.SECRET_KEY || process.exit(1);

console.log(jwtSecretKey);

const token = jwt.sign(payload, jwtSecretKey, {
  algorithm: "HS256",
});

console.log("Token: ", token);

try {
  const decodePayload = jwt.verify(token, jwtSecretKey);
  console.log("\nDecoded Payload: ", decodePayload);
} catch (e) {
  console.log("\nError: ", e);
}
