import { 
  Body, 
  Controller, 
  Post, 
  Res, 
  UseGuards, 
  Request 
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { User } from '../../domain';
import { LocalAuthGuard, Public } from '../../infrastructure';
import { LoginCommand } from './models/login.command';
import type { Response } from 'express';

@ApiTags('auth')  
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()  
  @ApiOperation({ summary: 'Register new user', description: 'Create a new user account with email and password' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'User registered successfully', type: User })
  async register(@Body() dto: RegisterDto): Promise<{id: string}> {
    return {
      id: await this.authService.register(dto)
    };
  }

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login', description: 'Authenticate user and return JWT token via httpOnly cookie' })
  @ApiBody({ schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        password: { type: 'string', example: 'password123' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Login successful (JWT set in cookie)' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(
    @Request() req: Request & { user: LoginCommand },
    @Res({ passthrough: true }) res: Response,
  ) {
    const command = new LoginCommand(req.user.userId, req.user.email);
    const { access_token } = await this.authService.login(command);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60,
    });

    return { message: 'Login successful' };
  }
}
