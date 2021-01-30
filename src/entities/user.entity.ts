import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ParticipantsORM } from "./participants.entity";

@Entity('user')
export class UserORM {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany((type) => ParticipantsORM, participants => participants.user)
  participants: ParticipantsORM[];
}
