import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Appointment } from "./Appointment"

@Entity("users")
export default class User {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column({nullable: false})
    password: string

    @Column()
    active: boolean

    @OneToMany(() => Appointment, appointment => appointment.user)
    appointments: Appointment[]

}
