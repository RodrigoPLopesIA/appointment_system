import { Field, InputType } from "type-graphql";



@InputType()
export default class LoginInput{

    @Field()
    email: String
    
    @Field()
    password: String
}