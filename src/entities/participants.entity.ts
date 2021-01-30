import { type } from "os";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectORM } from "./project.entity";
import { UserORM } from "./user.entity";

@Entity('participants')
export class ParticipantsORM {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_project: number;

  @Column()
  id_user: number;

  @ManyToOne((type) => ProjectORM, project => project.participants)
  @JoinColumn({ name: 'id_project', referencedColumnName: 'id' })
  project: ProjectORM;

  @ManyToOne((type) => UserORM, user => user.participants)
  @JoinColumn({ name: 'id_user', referencedColumnName: 'id' })
  user: UserORM;
}
