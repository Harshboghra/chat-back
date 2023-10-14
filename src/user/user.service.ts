import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    let user: User = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = createUserDto.password;

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findById(id: number) {
    return this.userRepository.findOne({ where: { id: id } });
  }

  findByEmail(email: string) {
    return this.userRepository.find({ where: { email: email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  getcurrentUser(user) {
    if (user) {
      return user;
    } else {
      return null;
    }
  }
}
