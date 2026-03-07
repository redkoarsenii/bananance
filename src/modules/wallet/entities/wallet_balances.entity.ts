import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Wallet } from './wallet.entity';

@Entity({ name: 'wallet_balances' })
@Unique('wallet_asset_unique', ['wallet_id', 'asset_symbol'])
export class WalletBalances {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { nullable: false })
  wallet_id: string;

  @Column('varchar', { length: 20 })
  asset_symbol: string;

  @Column('numeric', { default: 0 })
  available: string;

  @Column('numeric', { default: 0 })
  locked: string;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Wallet, (wallet) => wallet.balances)
  @JoinColumn({ name: 'wallet_id' })
  wallet: Wallet;
}
