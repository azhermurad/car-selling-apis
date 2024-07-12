import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import fs from 'fs/promises';
import path from 'path';
import { AppModule } from '../src/app.module';


describe('AppController (e2e)', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const filePath = path.join(__dirname, '..', 'test.sqlite');
    try {
      await fs.unlink(filePath);
    } catch (error) {}
  });

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
    const userPayload = {
      email: 'john.doeqa@exaample.csom',
      password: 'John Doe',
    };
    return request(app.getHttpServer())
      .post('/user/signup')
      .send(userPayload)
      .expect(201)
      .then((user) => {
        expect(user.body.email).toEqual(userPayload.email);
      }).catch((e)=>{
console.log(e)
      });
  });
  it('signup and check that session is store', async () => {
    const userPayload = {
      email: 'john.doeqa@exaample.csom',
      password: 'John Doe',
    };
    const res = await request(app.getHttpServer())
      .post('/user/signup')
      .send(userPayload)
      .expect(201);
    const cookie = res.get('Set-Cookie');
    expect(cookie).not.toBeNull();
    const currentUser = await request(app.getHttpServer()).get(
      '/user/current-user',
    ).set("Cookie",cookie);
    expect(currentUser.status).toEqual(200);
    console.log(currentUser.header);
  });
});

// POST http://localhost:3000/user/signup
// Content-Type: application/json

// {
//     "email": "aasign1u@ami1l.com",
//     "password": "azhera"
// }

// the

// in the session base authantication the session is set-cookie
// when the we perform the request the
// the brosew automatically add the cookie to the request
// on the backene the session middleware parse the cookie and add it to req.session.____
// the session middleware is the one that parse the cookie and add it to the req.session