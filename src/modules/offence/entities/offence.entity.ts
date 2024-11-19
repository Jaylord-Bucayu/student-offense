// offense.entity.ts
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Offense extends AbstractEntity<Offense> {

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  level: string;

}
