import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/auth-register';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/auth-login';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  register(registerUserDto: RegisterUserDto) {
    return this.userRepository.save(
      this.userRepository.create(registerUserDto),
    );
  }

  async login({ email, password }: LoginUserDto) {
    const user = await this.userRepository.findOneBy({ email, password });
    if (!user) throw new BadRequestException('Invalid user credentials!');
    return this.generateJwtToken(user);
  }

  async generateJwtToken({ id, email, role }: User) {
    const payload = { sub: id, email, role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
