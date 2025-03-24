import { createHash } from "crypto";
//import type { User } from "@prisma/client";
import { SignUpWithUsernameAndPasswordError, type SignUpWithUsernameAndPasswordResult } from "./+type";
import { prisma } from "../../extras/prisma";
import { sign, type JwtPayload } from "jsonwebtoken";
import { jwtSecretKey } from "../../environment";



const signUpWithUsernameAndPassword = async (parameters: {
    username: string;
    password: string;
}): Promise<SignUpWithUsernameAndPasswordResult> => {
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                username: parameters.username,
            }
        });

        if (existingUser) {
            throw SignUpWithUsernameAndPasswordError.CONFLICTING_USERNAME;
        }

        const hashedPassword = createHash("sha256").update(parameters.password).digest("hex"); //function chaining
        const user = await prisma.user.create({
            data: {
                username: parameters.username,
                password: hashedPassword,
            }
        });

        //Generate Token
        const jwtPayload: JwtPayload = {
            iss: "http://purpleshorts.co.in",
            sub: user.id,
            username: user.username,
        }

        const token = sign(jwtPayload, jwtSecretKey, {
            expiresIn: "30d",
        });

        const result: SignUpWithUsernameAndPasswordResult = {
            token,
            user,
        };

        return result;
    } catch (e) {
        console.error(e);
        throw SignUpWithUsernameAndPasswordError.UNKNOWN;
    }
}
