import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import { isValidObjectId } from 'mongoose';
import { getMongoRepository, MongoRepository, ObjectID } from 'typeorm';

import { User } from '../entities/User';

export default class UserRepository implements IUserRepository {
  private repository: MongoRepository<User>;

  constructor() {
    this.repository = getMongoRepository(User);
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.repository.create(data);

    return this.repository.save(user);
  }

  public async save(user: User) {
    await this.repository.update(user.id, user);
    return user;
  }

  public async saveMany(users: User[]) {
    await Promise.all(users.map(user => this.repository.update(user.id, user)));
  }

  public async findAll() {
    return await this.repository.find({ where: { deleted_at: null } });
  }

  public async findAllByCompanyName(name: string) {
    return await this.repository.find({
      where: { 'company.name': { $eq: name } },
    });
  }

  public async findAllWithDeleted() {
    return await this.repository.find();
  }

  public async findById(id: ObjectID | string) {
    return id && isValidObjectId(id)
      ? await this.repository.findOne(id, { where: { deleted_at: null } })
      : undefined;
  }

  public async findByIdWithDeleted(id: ObjectID | string) {
    return id && isValidObjectId(id)
      ? await this.repository.findOne(id)
      : undefined;
  }

  public async findByEmail(email: string) {
    return await this.repository.findOne({
      where: { email, deleted_at: null },
    });
  }

  public async delete(user: User) {
    await this.repository.delete(user);
  }

  public async deleteMany(users: User[]) {
    await this.repository.deleteMany(users);
  }
}
