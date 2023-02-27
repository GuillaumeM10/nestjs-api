import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';

@Injectable()
export class PostService {
  constructor(  
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>
  ){}

  async getAllPosts(){
    return await this.postRepository.find()
  }

  async getOnePostById(id: number){
    return await this.postRepository.findOneBy({id})
  }

  async createPost(data: any){
    console.table(data)
    try{
      const newPost = await this.postRepository.create(data)
      await this.postRepository.save(newPost)

      return newPost
    }catch(error){
      return error
    }
  }

  async updatePost(id: number, data: any){
    const post = await this.postRepository.findOneBy({id})
    if(!post) return 'Post not found'
    await this.postRepository.update(id, data)

    return await this.postRepository.findOneBy({id})
  }

  async softDeletePost(id: number){
    const post = await this.postRepository.findOneBy({id})
    if(!post) return 'Post not found'
    await this.postRepository.softDelete(id)

    return 'Post deleted successfully'
  }

}
