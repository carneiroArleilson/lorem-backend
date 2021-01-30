import { getRepository } from "typeorm";
import { ParticipantsORM } from "../entities/participants.entity";
import { ProjectORM } from "../entities/project.entity";
import { Project } from "../interface/project.interface";

export class UpdateProjectService {
  public async execute(id_project: number, { name, dt_begin, dt_end, price, risc, users }: Project) {
    const projectRepository = getRepository(ProjectORM);
    const project = await projectRepository.findOne({ id: id_project });

    if(!project) throw new Error('Project don´t exists!');

    if(name) project.name = name;
    if(dt_begin) project.dt_begin = dt_begin;
    if(dt_end) project.dt_end = dt_end;
    if(price) project.price = price;
    if(risc) project.risc = risc;

    const savedProject = await projectRepository.save(project);

    if(users) {
      const participantRepository = getRepository(ParticipantsORM);
      await Promise.all(users.map(async user => {
        const participant = await participantRepository.findOne({
          where: {
            id_project: savedProject.id,
            id_user: user
          }
        });

        if(participant) return;

        return await participantRepository.save({
          id_project: savedProject.id,
          id_user: user
        });
      }));
    }

    return await projectRepository.findOne({
      where: {
        id: savedProject.id
      },
      relations: [
        'participants',
        'participants.user'
      ]
    });
  }
}
