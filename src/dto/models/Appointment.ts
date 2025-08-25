import { ObjectType, Field, ID } from "type-graphql";
import User from "./User";

@ObjectType()
export class Appointment {
  @Field(() => ID)
  id: string;

  @Field()
  date: Date;

  @Field({ nullable: true })
  description?: string;

  
  @Field(() => User, { nullable: true })
  user?: User;
  
  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
