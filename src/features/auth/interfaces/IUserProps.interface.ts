import { HydratedDocument } from "mongoose";

interface IUserProps {
    _id : string;
    name : string;
    email : string;
    phone : string;
    password : string;
    role? : 'user' | 'admin';
    createdAt: Date;
    updatedAt : Date;
}

export type IUser = HydratedDocument<IUserProps>