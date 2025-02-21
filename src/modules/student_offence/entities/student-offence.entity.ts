// student-offense.entity.ts
import { ObjectId } from 'mongodb';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Student } from 'src/modules/student/entities/student.entity';
import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class StudentOffense extends AbstractEntity<StudentOffense>{

  @Column()
  student_id: ObjectId;

  @Column()
  offense_name: string;

  @Column()
  location: string;

  @Column({default:1})
  count: number;

  @Column({ default: 'pending' })
  status: string;

  @Column({ type: 'date' })
  date_of_service: Date;

  @Column()
  student_name: string;

  @Column()
  section_name: string;

  @Column()
  service_time: string;

  @Column()
  grade_level: string;

}
