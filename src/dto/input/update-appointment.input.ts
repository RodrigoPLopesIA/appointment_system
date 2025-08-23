import { Field } from "type-graphql";

export default class UpdateAppointmentInput {
  
  @Field({ nullable: true })
  date?: Date;
  
  @Field({ nullable: true })
  description?: string;
}
