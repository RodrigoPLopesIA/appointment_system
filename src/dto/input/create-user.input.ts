import { Field, InputType } from "type-graphql";

@InputType()
export default class CreateUserDTO{
    @Field()
    name: String

    @Field()
    email: String

    @Field()
    active: Boolean
}