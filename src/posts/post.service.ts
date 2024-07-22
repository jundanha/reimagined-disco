import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.model';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private readonly postModel: typeof Post,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postModel.findAll();
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postModel.findByPk(id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async create(authorId: number, createPostDto: CreatePostDto): Promise<Post> {
    return this.postModel.create({ ...createPostDto, authorId });
  }

  async update(
    id: number,
    authorId: number,
    updatePostDto: UpdatePostDto,
  ): Promise<Post> {
    const post = await this.findOne(id);
    if (post.authorId !== authorId) {
      throw new ForbiddenException(
        'You do not have permission to update this post',
      );
    }
    post.update(updatePostDto);
    return post;
  }

  async delete(id: number, authorId: number): Promise<void> {
    const post = await this.findOne(id);
    if (post.authorId !== authorId) {
      throw new ForbiddenException(
        'You do not have permission to delete this post',
      );
    }
    await post.destroy();
  }
}
