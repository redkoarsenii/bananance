import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Asset } from './asset.entity';

@Entity('asset_prices')
export class AssetPrice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  asset_id: string;

  @Column({ type: 'numeric' })
  price_usdt: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToOne(() => Asset)
  @JoinColumn({ name: 'asset_id' })
  asset: Asset;
}
