import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from '../user/user.entity';

@Entity({ name: 'otp' })
export class Otp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    otp: string;

    @Column()
    mobile_number: string;

    @Column()
    expiry: Date;

    @Column('varchar', {default: 'not-verified'})
    status: string;

    @ManyToOne(() => User, (user: User) => user.id)
    public user: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}