import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { auth } from "../middlewares/auth.middleware";
import User from "../dto/models/User";




@Resolver()
@UseMiddleware(auth)
export default class AppointmentResolver {


    @Query(() => User)
    public async getAppointments(@Ctx() ctx: any) {
        return ctx.user;
    }
}