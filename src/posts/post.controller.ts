import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostsService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Req() req, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(req.user.userId, createPostDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(+id, req.user.userId, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Req() req, @Param('id') id: string) {
    return this.postsService.delete(+id, req.user.userId);
  }
}
