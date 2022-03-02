import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SigninDto } from './dto/Signin.dto';
import { SignupDto } from './dto/Signup.dto';
import { User } from './models/users.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ){}

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    public async signup(@Body() signupDto: SignupDto): Promise<User>{
        return this.usersService.signup(signupDto);
    }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    public async signin(
        @Body() signinDto: SigninDto
    ): Promise<{ name: string, jwtToken: string, email: string }>{
        return this.usersService.signin(signinDto);
    }

    @Get('delete/:id')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.OK)
    public async remove(@Param('id') id: string): Promise<User>{
        return this.usersService.remove(id);
    }
    
    @Get()
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.OK)
    public async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }
    
}
