import { Router } from 'express';
import { getRepository } from 'typeorm';
import { ProjectORM } from '../entities/project.entity';
import { Project } from '../interface/project.interface';
import { CreateProjectService } from '../services/CreateProjectService';

const projectRoute = Router();

projectRoute.get('/', async (request, response) => {
  try {
    const take = Number(request.query.take || 5);
    const skip = Number(request.query.skip || 0);

    const projectRepository = getRepository(ProjectORM);

    const projects = await projectRepository.find({ take, skip });

    return response.json(projects);
  } catch (error) {
    return response.status(400).json({ message: error });
  }
});

projectRoute.post('/', async (request, response) => {
  try {
    const { name, dt_begin, dt_end, price, risc } = request.body;
    const project: Project = {
      name,
      dt_begin: new Date(dt_begin),
      dt_end: new Date(dt_end),
      price: Number(price),
      risc: Number(risc),
    };

    const createProject = new CreateProjectService();
    const savedProject = await createProject.execute(project);

    return response.json(savedProject);
  } catch (error) {
    console.log(error);
    return response.status(400).json({ message: error });
  }
});

projectRoute.put('/:id_project', (request, response) => {});

projectRoute.delete('/:id_project', (request, response) => {});

export default projectRoute;
