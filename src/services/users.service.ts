import {User} from "../models/users.model";
import {CreateUserDto} from "../dtos/create-user.dto";
import {validate} from "class-validator";
import {CustomError} from '../utils/custom-error';
import {UpdateUserDto} from "../dtos/update-user.dto";
import {LoginDto} from "../dtos/login.dto";
import * as bcrypt from 'bcrypt';

class UsersService {

  async get() {
    return User.findAll();
  }

  async create(body: CreateUserDto) {
    const userDTO = new CreateUserDto(body);
    const errors: any = await validate(userDTO)
    if (errors.length) throw new CustomError('common.validationError', errors[0].constraints);
    const isExist = await User.findOne({
      where: {
        email: userDTO.email
      }
    })
    if (isExist) throw new CustomError('user.alreadyExist', null);
    const user = await User.create(userDTO)
    return {
      user,
      token: user.generateToken()
    }
  }

  async update(body: UpdateUserDto, userId: number) {
    const userDTO = new UpdateUserDto(body);
    const errors: any = await validate(userDTO)
    if (errors.length) throw new CustomError('common.validationError', errors[0].constraints);
    const user = await User.findByPk(userId);
    if (!user) throw new CustomError('common.notFound', null);
    await user.update(userDTO);
    return {
      user,
      token: user.generateToken()
    }
  }

  async auth(body: LoginDto) {
    const loginDTO = new LoginDto(body);
    const errors: any = await validate(loginDTO)
    if (errors.length) throw new CustomError('common.validationError', errors[0].constraints);
    const user = await User.findOne({
      where: {
        email: loginDTO.email
      }
    });
    if (!user) throw new CustomError('common.unauthorized', null);
    const check = await bcrypt.compare(loginDTO.password, user.password);
    if (!check) throw new CustomError('common.unauthorized', null);
    return {
      user,
      token: user.generateToken()
    }
  }


}


export default new UsersService();