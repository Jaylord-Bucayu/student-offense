// section.entity.ts
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Grade extends AbstractEntity<Grade> {
  @Column()
  level: number;

  @Column({ nullable: true })
  type: string;

}
