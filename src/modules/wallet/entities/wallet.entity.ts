import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WalletBalances } from './wallet_balances.entity';
import { WalletTransaction } from './wallet_transactions.entity';

@Entity({ name: 'wallet' })
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { nullable: false, unique: true })
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => WalletBalances, (balance) => balance.wallet_id)
  balances: WalletBalances[];

  @OneToMany(() => WalletTransaction, (transaction) => transaction.wallet_id)
  transactions: WalletTransaction[];
}
