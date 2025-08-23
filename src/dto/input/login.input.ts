import { Field, InputType } from "type-graphql";



@InputType()
export default class LoginDTO{

    @Field()
    email: String
    
    @Field()
    password: String
}