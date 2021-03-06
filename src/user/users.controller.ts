import {
  Controller,
  Post,
  Body,
  Request,
  UseFilters,
  UseGuards,
  Get,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from './user.service';
import { AuthService } from './auth/auth.service';
import { User } from './entity/user.entity';
import { Neo4jErrorFilter } from 'nest-neo4j';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt.auth-guard';

@Controller('users')
export class UsersController {
  private readonly TAG = 'UsersController';

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseFilters(Neo4jErrorFilter)
  @Post('/')
  async postIndex(@Body() createUserDto: CreateUserDto): Promise<any> {
    Logger.debug('postIndex', this.TAG);
    Logger.debug(createUserDto.user, this.TAG);

    const user: User = await this.userService.create(
      createUserDto.user.username,
      createUserDto.user.password,
      createUserDto.user.email,
      createUserDto.user.bio,
      createUserDto.user.image,
    );

    const token = this.authService.createToken(user);

    return {
      user: {
        ...user.toJson(),
        token,
      },
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async postLogin(@Request() request, loginDto: LoginDto): Promise<any> {
    Logger.log('login', this.TAG);

    const token = this.authService.createToken(request.user);

    return {
      user: {
        ...request.user.toJson(),
        token,
      },
    };
  }
}
