import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterIdentityDto } from './dto/register-identity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Identity } from './entities/identity.entity';
import { ResponseIdentityDto } from './dto/response-identity.dto';
import { UpdateIdentityDto } from './dto/update-identity.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class IdentityService {
  constructor(
    @InjectRepository(Identity)
    private readonly identityRepository: Repository<Identity>,
  ) {}

  async register(registerDto: RegisterIdentityDto) {
    const { email, password, confirm_password } = registerDto;

    if (password !== confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }

    const existing = await this.identityRepository.findOne({
      where: { email },
    });
    if (existing) {
      throw new BadRequestException('User with this email already exists');
    }

    const password_hash = await bcrypt.hash(password, 10);

    const identity = this.identityRepository.create({
      email,
      password_hash,
      status: 'active',
    });

    const saved = await this.identityRepository.save(identity);

    return {
      id: saved.id,
      email: saved.email,
      status: saved.status,
      created_at: saved.created_at,
      last_login_at: saved.last_login_at,
    };
  }

  findAll() {
    return this.identityRepository.find();
  }

  async findOne(id: string): Promise<ResponseIdentityDto> {
    const identity = await this.identityRepository.findOne({
      where: { id },
    });
    if (!identity) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return {
      id: identity.id,
      email: identity.email,
      status: identity.status,
      created_at: identity.created_at,
      last_login_at: identity.last_login_at,
    };
  }

  remove(id: string) {
    return this.identityRepository.delete(id);
  }

  async update(
    id: string,
    dto: UpdateIdentityDto,
  ): Promise<ResponseIdentityDto> {
    const identity = await this.identityRepository.findOne({ where: { id } });

    if (!identity) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (dto.email) {
      const existingEmailUser = await this.identityRepository.findOne({
        where: { email: dto.email },
      });

      if (existingEmailUser && existingEmailUser.id !== id) {
        throw new BadRequestException('Email already in use');
      }
      identity.email = dto.email;
    }

    if (dto.password) {
      if (!dto.password || dto.password !== dto.confirm_password) {
        throw new BadRequestException('Passwords do not match');
      }
      identity.password_hash = await bcrypt.hash(dto.password, 10);
    }

    const saved = await this.identityRepository.save(identity);

    return {
      id: saved.id,
      email: saved.email,
      status: saved.status,
      created_at: saved.created_at,
      last_login_at: saved.last_login_at,
    };
  }
}
