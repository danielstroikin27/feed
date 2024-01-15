import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Various e2e tests', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    app.close();
  });

  it('/ GET', () => {
    return request(app.getHttpServer()).get('/').expect(404);
  });

  it('Create post with bad body', () => {
    return request(app.getHttpServer())
      .post('/posts')
      .send({
        title: 'Test Title',
        body: 'Test Body',
        user: '',
      })
      .expect(400);
  });

  it('Create post with good body', () => {
    return request(app.getHttpServer())
      .post('/posts')
      .send({
        title: 'Test Title',
        body: 'Test Body',
        user: 'Test User',
      })
      .expect(201);
  });

  it('Retrieve top creators with bad limit', () => {
    return request(app.getHttpServer())
      .get('/statistics/topcreators?limit=s')
      .expect(406);
  });

  it('Retrieve top creators with good limit', () => {
    return request(app.getHttpServer())
      .get('/statistics/topcreators?limit=3')
      .expect(200);
  });
});
