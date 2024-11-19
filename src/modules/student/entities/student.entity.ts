import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Student extends AbstractEntity<Student> {
  @Column()
  student_id: string;

  @Column()
  first_name: string;

  @Column({ nullable: true })
  middle_initial: string;

  @Column()
  last_name: string;

  @Column()
  section_name: string;

  @Column()
  grade_level: string;
}
