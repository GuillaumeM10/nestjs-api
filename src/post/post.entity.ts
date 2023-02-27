import { Timestamp } from "src/Generic/timestamp.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("post")
export class PostEntity extends Timestamp{
  @PrimaryGeneratedColumn()
    id: number
  
  @Column()
    title: string
  
  @Column()
    description: string

  @Column()
    city: string

  @Column()
    published: boolean
}