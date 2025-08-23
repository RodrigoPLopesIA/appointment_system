import { Field, ID, ObjectType } from "type-graphql";
import { Appointment } from "./Appointment";

@ObjectType()
export default class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => [Appointment])
  appointments: [Appointment];

  @Field()
  active: boolean;
}
