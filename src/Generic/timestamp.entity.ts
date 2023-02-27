import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm"

export class Timestamp {
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'NOW()',
  })

  @UpdateDateColumn()
    updatedAt: Date

  @DeleteDateColumn()
    deletedAt: Date
}