import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostsController } from './post.controller';
import { PostsService } from './post.service';
import { Post } from './post.model';
import { User } from '../users/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Post, User])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
