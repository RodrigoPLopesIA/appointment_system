import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("users")
export default class User {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    active: boolean

}
