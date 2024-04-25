import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import * as argon from 'argon2';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

// circular dependency between user and auth service could be avoided but is kept to test the forwardRef solution

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async hashData(data: string) {
    return await argon.hash(data);
  }

  async verifyHash(unhashed: string, hashed: string) {
    return await argon.verify(hashed, unhashed);
  }

  async verifyUser(dto: LoginDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    const match = await this.verifyHash(dto.password, user.hash);
    if (!match) {
      throw new HttpException(
        'Password is incorrect !',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  signToken(
    sub: number,
    email: string,
    roleId: number,
    firstName: string,
    lastName,
  ) {
    const payload = { sub, email, roleId, firstName, lastName };
    return this.jwtService.sign(payload);
  }

  async login(dto: LoginDto) {
    const user = await this.verifyUser(dto);
    const token = this.signToken(
      user.id,
      user.email,
      user.roleId,
      user.firstName,
      user.lastName,
    );
    return { token };
  }

  async register(dto: RegisterDto) {
    if (dto.password !== dto.password_confirmation) {
      throw new HttpException(
        'Passwords do not match !',
        HttpStatus.BAD_REQUEST,
      );
    }
    const createDto: CreateUserDto = {
      password: dto.password,
      email: dto.email,
      roleId: dto.roleId,
      statusId: dto.statusId,
      firstName: dto.firstName,
      lastName: dto.lastName,
      phone: dto.phone,
      clientProfileId: null,
    };
    const user = await this.userService.createUser(createDto);
    const token = this.signToken(
      user.id,
      user.email,
      user.roleId,
      user.firstName,
      user.lastName,
    );
    return { token };
  }
}
