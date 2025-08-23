import { InputType, Field } from "type-graphql";

@InputType()
export default class CreateAppointmentInput {
  @Field()
  date: Date;

  @Field()
  description: string;
}
