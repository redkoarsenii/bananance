import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Wallet } from './wallet.entity';

@Entity({ name: 'wallet_transactions' })
export class WalletTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { unique: false, nullable: false })
  wallet_id: string;

  @Column('varchar', { unique: false, nullable: false })
  type: 'deposit_usdt' | 'buy_asset';

  @Column('varchar', { length: 255, unique: false, nullable: false })
  asset_symbol: string;

  @Column('numeric', { nullable: false, unique: false })
  amount: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Wallet, (wallet) => wallet.transactions)
  @JoinColumn({ name: 'wallet_id' })
  wallet: Wallet;
}
