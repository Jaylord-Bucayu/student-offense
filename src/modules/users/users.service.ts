import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, FindManyOptions, Like, ObjectId, Repository } from 'typeorm';
import { classToPlain } from 'class-transformer';
import { GetUsersFilterDto } from './dto/filter-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly itemRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createUserDto: CreateUserDto) {


    const existingUser = await this.findOneEmail(createUserDto.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
   
    const newUser = new User({ ...createUserDto });
    await this.itemRepository.save(newUser);
     return newUser;
  }
  async findAll(filterDto: GetUsersFilterDto): Promise<any> {
    const { search, role, page, per_page, sort, from, to, firstname, middlename, lastname, email } = filterDto;

    let query: any = {};

    if (search) {
      query.$or = [
        { firstname: { $regex: new RegExp(search, 'i') } },
        { middlename: { $regex: new RegExp(search, 'i') } },
        { lastname: { $regex: new RegExp(search, 'i') } },
        { email: { $regex: new RegExp(search, 'i') } },
      ];
    }

    if (from || to) {
      query.createdAt = {};
      if (from) {
        query.createdAt.$gte = new Date(from);
      }
      if (to) {
        query.createdAt.$lte = new Date(to);
      }
    }

    if (role) {
      query.role = { $regex: new RegExp(role, 'i') };
    }

    if (firstname) {
      query.firstname = { $regex: new RegExp(firstname, 'i') };
    }

    if (middlename) {
      query.middlename = { $regex: new RegExp(middlename, 'i') };
    }

    if (lastname) {
      query.lastname = { $regex: new RegExp(lastname, 'i') };
    }

    if (email) {
      query.email = { $regex: new RegExp(email, 'i') };
    }

    // Pagination
    const pageSize = parseInt(per_page, 10) || 10; // Default to 10 items per page if not provided
    const currentPage = parseInt(page, 10) || 1;

    const [users, total] = await this.itemRepository.findAndCount({
      where: query,
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      order: sort ? { [sort.split('.')[0]]: sort.split('.')[1].toUpperCase() } : { createdAt: 'DESC' }, // Default sorting by createdAt descending
    });

    return {
      data: users,
      total,
      page: currentPage,
      per_page: pageSize,
      total_pages: Math.ceil(total / pageSize),
    };
  }
  async findOne(id: any): Promise<any> {
    const user = await this.itemRepository.findOneBy(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return classToPlain(user);
  }

  async findOneEmail(email:string){

    return await this.itemRepository.findOne({
      where: { email}});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  
  createFromFile(){

  }

  async updateUserPassword(userId: string, hashedPassword: string) {
     await this.itemRepository.update(userId, { password: hashedPassword });
     return 'Reset password successfully'
  }

  async updateUser(id: number | string | ObjectId, updateUserDto: UpdateUserDto): Promise<User> {
 
    const user = await this.findOne(id);
  
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    console.log(updateUserDto)

    Object.assign(user, updateUserDto);
    return this.itemRepository.save(user);
  }

  async currentUser(user:any){
    return await this.itemRepository.findOneBy({email:user.email});
  }

}
