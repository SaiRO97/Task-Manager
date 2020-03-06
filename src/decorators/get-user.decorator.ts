import { createParamDecorator } from "@nestjs/common";
import { User } from "src/auth/auth.entity";

export const GetUser = createParamDecorator((req):User => {
    return req.user;
})