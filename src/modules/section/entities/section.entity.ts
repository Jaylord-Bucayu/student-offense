// section.entity.ts
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Section extends AbstractEntity<Section> {
  @Column()
  level: string;

  @Column()
  section_name: string;
}
