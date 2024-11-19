export class CreateStudentOffenceDto {
  student_id: string;
  offense_name: string;
  location: string;
  status?: string; // default value will be 'pending' if not provided
  date_of_service: Date;
  section_name:string;
  service_time:string;
}
