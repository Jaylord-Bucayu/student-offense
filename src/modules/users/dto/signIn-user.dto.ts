import { ObjectId } from "typeorm";

export class SignInUser {
   user:{
    id:string | ObjectId | any; 
    email:string;
    role:string;
    sub: string;
    iat: number,
    exp: number;
   }
}