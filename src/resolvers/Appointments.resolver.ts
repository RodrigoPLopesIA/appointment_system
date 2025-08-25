import { Arg, Ctx, ID, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { auth } from "../middlewares/auth.middleware";
import { Appointment } from "../dto/models/Appointment";
import {Appointment as AppointmentEntity} from "../entity/Appointment";
import AppointmentService from "../services/AppointmentService";
import { AppDataSource } from "../data-source";
import CreateAppointmentInput from "../dto/input/create-appointment.input";
import UpdateAppointmentInput from "../dto/input/update-appointment.input";
import User from "../dto/models/User";

interface Context {
  user: User;
}

const appointmentService = new AppointmentService(
  AppDataSource.getRepository(AppointmentEntity)
);

@Resolver()
@UseMiddleware(auth)
export default class AppointmentResolver {
  @Query(() => [Appointment])
  public async myAppointments(@Ctx() ctx: Context): Promise<Appointment[]> {
    return appointmentService.getAllByUser(ctx.user.id);
  }

  @Query(() => Appointment, { nullable: true })
  async appointmentById(@Arg("id", () => ID) id: string, @Ctx() ctx: Context) {
    return appointmentService.getById(ctx.user.id, id);
  }

  // 3️⃣ Criar novo appointment
  @Mutation(() => Appointment)
  async createAppointment(
    @Arg("data") data: CreateAppointmentInput,
    @Ctx() ctx: Context
  ) {
    return appointmentService.create(ctx.user.id, data);
  }

  // 4️⃣ Atualizar appointment
  @Mutation(() => Appointment, { nullable: true })
  async updateAppointment(
    @Arg("id", () => ID) id: string,
    @Arg("data") data: UpdateAppointmentInput,
    @Ctx() ctx: Context
  ) {
    return appointmentService.update(ctx.user.id, id, data);
  }

  @Mutation(() => Boolean)
  async deleteAppointment(
    @Arg("id", () => ID) id: string,
    @Ctx() ctx: Context
  ) {
    return appointmentService.delete(ctx.user.id, id);
  }
}
