import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Credential from "./Credential";
import Appointment from "./Appointment";

@Entity({
    name: "users"
})
class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({
        unique: true
    })
    email: string

    @Column()
    birthdate: Date


    @Column({
        unique: true
    })
    nDni: number

    @OneToOne(() => Credential)
    @JoinColumn()
    credential: Credential
    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments: Appointment
}

export default User;