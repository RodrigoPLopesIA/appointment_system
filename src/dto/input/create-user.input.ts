import { Field, InputType } from "type-graphql";

@InputType()
export default class CreateUserInput{
    @Field()
    name: String

    @Field()
    email: String


    @Field()
    password: String 
    
    @Field()
    active: Boolean
}