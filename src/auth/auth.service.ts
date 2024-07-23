import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.validateUser(email, password);
    if (user) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // console.log('user: ', user.dataValues.id);
    // console.log('user: ', user.dataValues.email);
    const payload = {
      username: user.dataValues.email,
      sub: user.dataValues.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
