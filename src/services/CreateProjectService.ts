import { getRepository } from "typeorm";
import { ParticipantsORM } from "../entities/participants.entity";
import { ProjectORM } from "../entities/project.entity";
import { UserORM } from "../entities/user.entity";
import { Project } from "../interface/project.interface";

export class CreateProjectService {
  public async execute(project: Project) {
    const projectRepository = getRepository(ProjectORM);

    const newProject = new ProjectORM();

    newProject.name = project.name;
    newProject.dt_begin = project.dt_begin;
    newProject.dt_end = project.dt_end;
    newProject.price = project.price;
    newProject.risc = project.risc;

    const savedProject = await projectRepository.save(newProject);

    if(!savedProject) throw new Error('Project not saved!');

    if(project.users) {
      const participantRepository = getRepository(ParticipantsORM);
      const userRepository = getRepository(UserORM);

      await Promise.all(project.users.map(async user => {
        const isUser = await userRepository.findOne({ id: Number(user) });

        if(!isUser) throw new Error('User don´t exists!');

        const participant = new ParticipantsORM();

        participant.id_project = savedProject.id;
        participant.id_user = isUser.id;

        return await participantRepository.save(participant);
      }));
    }

    return await projectRepository.findOne({
      where: {
        id: savedProject.id,
      },
      relations: [
        'participants',
        'participants.user',
      ]
    });
  }
}
