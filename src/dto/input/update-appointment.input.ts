import { Field, InputType } from "type-graphql";

@InputType()
export default class UpdateAppointmentInput {
  
  @Field({ nullable: true })
  date?: Date;
  
  @Field({ nullable: true })
  description?: string;
}
