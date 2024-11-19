import { AbstractEntity } from '../../../common/database/abstract.entity';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Entity('User')
export class User extends AbstractEntity<User> {
  
  @Exclude()
  @Column({ type: 'string' })
  password: string;

  @Exclude()
  @Column({ type: 'string' })
  token: string;

  @Column({ type: 'string', default: "" })
  firstname: string;

  @Column({ type: 'string', default: "" })
  middlename: string;

  @Column({ type: 'string', default: "" })
  lastname: string;

  @Column({ type: 'string', default: "" })
  email: string;

  @Column({ type: 'string', default: "LOCAL" })
  provider: string;

  @Column({ type: 'string', default: "USER" })
  role: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
  

  @Expose()
  get fullName(): string {
    return `${this.firstname} ${this.lastname}`;
  }

  constructor(entity?: Partial<User>) {
    super(entity); // Pass entity to the super constructor
  }
}
