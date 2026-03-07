import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { WalletTransaction } from './entities/wallet_transactions.entity';
import { WalletBalances } from './entities/wallet_balances.entity';

@Module({
  controllers: [WalletController],
  providers: [WalletService],
  imports: [
    TypeOrmModule.forFeature([Wallet, WalletTransaction, WalletBalances]),
  ],
})
export class WalletModule {}
