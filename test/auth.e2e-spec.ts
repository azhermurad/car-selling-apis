import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    
    // app.use(cookieSession({ keys: ['aadfdgsas'] }));
    // app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  it('singup user using email and password', () => {
    const userPayload = { email: 'john.doeqa@exaample.csom', password: 'John Doe' };
    return request(app.getHttpServer())
      .post('/user/signup')
      .send(userPayload)
      .expect(201)
      .then((user) => {
        expect(user.body.email).toEqual(userPayload.email)
      })
  });
});

// POST http://localhost:3000/user/signup
// Content-Type: application/json

// {
//     "email": "aasign1u@ami1l.com",
//     "password": "azhera"
// }



// the 