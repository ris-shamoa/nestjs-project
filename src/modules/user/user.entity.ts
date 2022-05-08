import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Otp } from '../otp/otp.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null, nullable: true })
  name: string;

  @Column({ default: null, nullable: true })
  email: string;

  @Column({ unique: true })
  mobile_number: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ nullable: true })
  profile_image: string;

  @Column({ nullable: true })
  prescription: string;

  @Column({ default: 'not_registered' })
  status: string;

  @OneToMany(() => Otp, (otp: Otp) => otp.id)
  public opts: Otp[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}