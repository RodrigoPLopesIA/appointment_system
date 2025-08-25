import { Repository } from "typeorm";
import { Appointment } from "../entity/Appointment";
import CreateAppointmentInput from "../dto/input/create-appointment.input";
import UpdateAppointmentInput from "../dto/input/update-appointment.input";





export default class AppointmentService {
  constructor(private readonly repository: Repository<Appointment>) {}


  async getAllByUser(userId: string): Promise<Appointment[]> {
    return await this.repository.find({
      where: { user: { id: userId } },
      order: { date: "ASC" },
    });
  }

  async create(userId: string, data: CreateAppointmentInput): Promise<Appointment> {
    const appointment = this.repository.create({
      ...data,
      user: { id: userId }, 
    });
    return await this.repository.save(appointment);
  }
  async update(userId: string, appointmentId: string, data: UpdateAppointmentInput): Promise<Appointment | null> {
    const appointment = await this.repository.findOne({
      where: { id: appointmentId, user: { id: userId } },
    });
    if (!appointment) return null;

    Object.assign(appointment, data);
    return await this.repository.save(appointment);
  }

  async delete(userId: string, appointmentId: string): Promise<boolean> {
    const appointment = await this.repository.findOne({
      where: { id: appointmentId, user: { id: userId } },
    });
    if (!appointment) return false;

    await this.repository.remove(appointment);
    return true;
  }

  async getById(userId: string, appointmentId: string): Promise<Appointment | null> {
    return await this.repository.findOne({
      where: { id: appointmentId, user: { id: userId } },
    });
  }
}
