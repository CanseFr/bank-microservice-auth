import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { AuthEntity } from './entity/auth.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, JwtService, PrismaService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return an AuthEntity when valid credentials are provided', async () => {
      // Arrange
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password',
      };
      const expectedAuthEntity: AuthEntity = {
        accessToken: 'validAccessToken',
      };
      jest.spyOn(authService, 'login').mockResolvedValue(expectedAuthEntity);

      // Act
      const result = await controller.login(loginDto);

      // Assert
      expect(result).toEqual(expectedAuthEntity);
    });

    it('should throw an error when invalid credentials are provided', async () => {
      // Arrange
      const loginDto: LoginDto = {
        email: 'invalid@example.com',
        password: 'invalidpassword',
      };
      jest
        .spyOn(authService, 'login')
        .mockRejectedValue(new Error('Invalid credentials'));

      // Act & Assert
      await expect(controller.login(loginDto)).rejects.toThrowError(
        'Invalid credentials',
      );
    });
  });
});
