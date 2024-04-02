import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthModule } from '../src/auth/auth.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await prismaService.user.create({
      data: {
        id: 1,
        name: 'test',
        email: 'test@example.com',
        password: 'password',
        createdAt: '12/12/2022',
        updatedAt: '"12/12/2022"',
      },
    });
  });

  it('POST /auth/login - should return 200 OK with access token when valid credentials are provided', async () => {
    // Arrange
    const loginDto = { email: 'test@example.com', password: 'password' };

    // Act
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.accessToken).toBeDefined();
  });

  it('POST /auth/login - should return 401 Unauthorized when invalid credentials are provided', async () => {
    // Arrange
    const loginDto = {
      email: 'invalid@example.com',
      password: 'invalidpassword',
    };

    // Act
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto);

    // Assert
    expect(response.status).toBe(401);
  });
});
