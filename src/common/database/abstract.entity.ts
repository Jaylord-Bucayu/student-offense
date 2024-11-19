import { CreateDateColumn, ObjectId, ObjectIdColumn, UpdateDateColumn } from "typeorm";

export abstract class AbstractEntity<T> {
  @ObjectIdColumn()
  id: ObjectId;

  
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
  

  constructor(entity?: Partial<T>) {
    Object.assign(this, entity);
  }
}
