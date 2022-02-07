import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column()
  age: number;

  @Column()
  
  email: string;

  @Column()
  mobile_number: number;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;
}