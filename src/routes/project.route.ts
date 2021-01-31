import { Router } from 'express';
import { getRepository } from 'typeorm';
import { ParticipantsORM } from '../entities/participants.entity';
import { ProjectORM } from '../entities/project.entity';
import { Project } from '../interface/project.interface';
import { CreateProjectService } from '../services/CreateProjectService';
import { UpdateProjectService } from '../services/UpdateProjectService';

const projectRoute = Router();

projectRoute.get('/', async (request, response) => {
  try {
    const take = Number(request.query.take || 5);
    const skip = Number(request.query.skip || 0);

    const projectRepository = getRepository(ProjectORM);

    const projects = await projectRepository.findAndCount({
      relations: ['participants', 'participants.user'],
      take,
      skip,
    });

    return response.json({
      data: projects[0],
      total: projects[1],
      take,
      skip
    });
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

projectRoute.post('/', async (request, response) => {
  try {
    const { name, dt_begin, dt_end, price, risc, users } = request.body;
    const project: Project = {
      name,
      dt_begin: new Date(dt_begin),
      dt_end: new Date(dt_end),
      price: Number(price),
      risc: Number(risc),
      users,
    };

    const createProject = new CreateProjectService();
    const savedProject = await createProject.execute(project);

    return response.json(savedProject);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

projectRoute.put('/:id_project', async (request, response) => {
  try {
    const { id_project } = request.params;
    const { name, dt_begin, dt_end, price, risc, users } = request.body;
    const project: Project = {
      name,
      dt_begin: new Date(dt_begin),
      dt_end: new Date(dt_end),
      price: Number(price),
      risc: Number(risc),
      users,
    };

    const updateProject = new UpdateProjectService();
    const savedProject = await updateProject.execute(
      Number(id_project),
      project,
    );

    return response.json(savedProject);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

projectRoute.delete('/:id_project', async (request, response) => {
  try {
    const { id_project } = request.params;
    const projectRepository = getRepository(ProjectORM);

    const project = await projectRepository.findOne({ id: Number(id_project) });

    if (!project) throw new Error('Project don´t exists!');

    const participantsRepository = getRepository(ParticipantsORM);

    await participantsRepository.delete({ id_project: project.id });
    await projectRepository.delete({ id: project.id });

    return response.status(204).send('Product Deleted!');
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default projectRoute;
