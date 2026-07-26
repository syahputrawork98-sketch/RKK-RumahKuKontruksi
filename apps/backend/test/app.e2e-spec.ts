import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('HealthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    await app.init();
  });

  it('/api/v1/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/health')
      .expect(200)
      .expect((res: request.Response) => {
        const body = res.body as unknown;
        if (
          !body ||
          typeof body !== 'object' ||
          !('status' in body) ||
          !('service' in body) ||
          !('timestamp' in body)
        ) {
          throw new Error('Invalid response body');
        }

        const typedBody = body as {
          status: string;
          service: string;
          timestamp: string;
        };
        expect(typedBody.status).toBe('ok');
        expect(typedBody.service).toBe('rkk-backend');
        const timestamp = new Date(typedBody.timestamp);
        expect(timestamp.toISOString()).toBe(typedBody.timestamp);
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
