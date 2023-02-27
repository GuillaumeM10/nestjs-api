import { CategoryEntity } from "src/category/entities/category.entity";
import { Timestamp } from "src/Generic/timestamp.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("post")
export class PostEntity extends Timestamp{
  @PrimaryGeneratedColumn()
    id: number
  
  @Column({
    nullable: false,
    unique: true
  })
  title: string
  
  @Column({
    nullable: true
  })
  description: string

  @Column()
  city: string

  @Column({
    default: false
  })
  published: boolean

  @ManyToMany(() => CategoryEntity, category => category.posts, {
    cascade: ["insert"]
  })
  @JoinTable()
  categories: CategoryEntity[]
}