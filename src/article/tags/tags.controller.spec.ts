import { Test, TestingModule } from '@nestjs/testing';
import { TagService } from '../tag/tag.service';
import { TagsController } from './tags.controller';

describe('Tags Controller', () => {
  let controller: TagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [TagService],
    }).compile();

    controller = module.get<TagsController>(TagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
