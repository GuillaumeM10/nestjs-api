import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostCreateDto } from './entity/post-create.dto';
import { PostUpdateDto } from './entity/post-update.dto';
import { PostEntity } from './entity/post.entity';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>
    ) {}

    async getAllPosts(queries) {
        let { page, limit, categories } = queries;

        limit = limit ? +limit : 10;
        page = page ? +page : 1;

        const query = await this.postRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.categories', 'categories')
            .leftJoinAndSelect('post.user', 'user')
            .select(['post.id', 'post.title', 'post.description', 'post.city', 'post.published', 'post.updatedAt', 'post.createdAt', 'user.firstName', 'user.lastName', 'categories.name', 'categories.id'])


        if(categories !== undefined) {
            query
                .where('categories.name IN (:...categories)', { categories: categories.split(',') })
        }

        const postList = query
                            .limit(limit)
                            .offset((page - 1) * limit)
                            .orderBy('post.id', 'DESC')
                            .getMany();

        return postList;
    }
    async getOnePostById(id: number) {
        const post = await this.postRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.comments', 'comments')
            .leftJoinAndSelect('post.categories', 'categories')
            .leftJoinAndSelect('post.user', 'user')
            .select(['post.id', 'post.title', 'post.description', 'post.city', 'post.published', 'post.updatedAt', 'post.createdAt', 'user.firstName', 'user.lastName', 'categories.name', 'categories.id', 'comments.id', 'comments.content', 'comments.createdAt','comments.updatedAt', 'comments.deletedAt'])
            .where('post.id = :id', { id })
            .orderBy('comments.id', 'DESC')
            .getOne();

        return post;
    }
    async createPost(data: PostCreateDto) {
        try {
            return await this.postRepository.save(data);
        } catch (error) {
            console.log(error);
            
            return error['detail'];
        }
    }
    async updatePost(id: number, data: PostUpdateDto) {
        const post = await this.postRepository.findOneBy({ id });
        const postUpdate = { ...post, ...data };
        await this.postRepository.save(postUpdate);

        return postUpdate;
    }
    async softDeletePost(id: number) {
        return await this.postRepository.softDelete(id);
    }
}
