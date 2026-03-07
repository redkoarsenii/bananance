import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class Identity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, unique: true, nullable: false })
  email: string;

  @Column('varchar', { length: 255, unique: false, nullable: false })
  password_hash: string;

  @Column('varchar', { length: 20, unique: false, nullable: false })
  status: 'active' | 'blocked';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  last_login_at: Date | null;
}
