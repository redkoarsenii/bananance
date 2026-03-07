import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'assets' })
export class Asset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 64, unique: true, nullable: false })
  symbol: string;

  @Column('varchar', { length: 64, unique: false, nullable: false })
  name: string;

  @Column('boolean', { nullable: false, default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
