import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ParticipantsORM } from './participants.entity';

@Entity('project')
export class ProjectORM {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  dt_begin: Date;

  @Column()
  dt_end: Date;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price: number;

  @Column({ default: 0 })
  risc: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(type => ParticipantsORM, participants => participants.project, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  participants: ParticipantsORM[];
}
