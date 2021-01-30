import { Router } from 'express';
import { getRepository, Raw } from 'typeorm';
import { UserORM } from '../entities/user.entity';

const userRoute = Router();

userRoute.get('/', async (request, response) => {
  try {
    const take = Number(request.query.take || 5);
    const skip = Number(request.query.skip || 0);
    const name = request.query.name;

    const userRepository = getRepository(UserORM);

    const users = await userRepository.find({
      where: {
        name: Raw(alias => (name ? `alias ILIKE '%${name}%'` : 'true')),
      },
      take,
      skip,
    });

    return response.json(users);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

userRoute.post('/', (request, response) => {});

export default userRoute;
