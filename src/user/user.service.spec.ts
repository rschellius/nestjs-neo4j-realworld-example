import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { EncryptionService } from './encryption/encryption.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, EncryptionService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
