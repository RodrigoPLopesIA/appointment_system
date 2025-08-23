import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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

}
