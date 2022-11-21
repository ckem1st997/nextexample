import { DefaultSession } from "next-auth";

export interface UserAuth extends DefaultSession {
    jwt: string;
    userId: string;
}