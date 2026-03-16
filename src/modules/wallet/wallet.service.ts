import { Injectable, NotFoundException } from '@nestjs/common';
import { BuyAssetDto } from './dto/buy-asset.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { Repository } from 'typeorm';
import { WalletBalances } from './entities/wallet_balances.entity';
import { WalletTransaction } from './entities/wallet_transactions.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(WalletBalances)
    private readonly walletBalanceRepository: Repository<WalletBalances>,
    @InjectRepository(WalletTransaction)
    private readonly walletTransactionsRepository: Repository<WalletTransaction>,
  ) {}

  async createWallet(id: string) {
    const userWallet: Wallet = this.walletRepository.create({
      user_id: id,
    });

    const createdWallet = await this.walletRepository.save(userWallet);

    const userInitialBalance: WalletBalances =
      this.walletBalanceRepository.create({
        wallet_id: userWallet.id,
        asset_symbol: 'USDT',
      });

    const createdUserInitialBalance =
      await this.walletBalanceRepository.save(userInitialBalance);

    return {
      userWallet: {
        id: createdWallet.id,
        user_id: createdWallet.user_id,
        created_at: createdWallet.created_at,
      },
      initialBalance: {
        id: createdUserInitialBalance.id,
        wallet_id: createdUserInitialBalance.wallet_id,
        asset_symbol: createdUserInitialBalance.asset_symbol,
        available: createdUserInitialBalance.available,
        locked: createdUserInitialBalance.locked,
      },
    };
  }

  async getWallet(userId: string) {
    const userWallet = await this.walletRepository.findOne({
      where: { user_id: userId },
    });

    if (!userWallet) {
      throw new NotFoundException('Wallet not found');
    }

    return {
      id: userWallet.id,
      user_id: userWallet.user_id,
      created_at: userWallet.created_at,
      updated_at: userWallet.updated_at,
    };
  }

  async depositUSDT(userId: string, amount: number) {
    const wallet = await this.getWallet(userId);

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    const usdtBalance = await this.walletBalanceRepository.findOne({
      where: {
        wallet_id: wallet.id,
        asset_symbol: 'USDT',
      },
    });

    if (!usdtBalance) {
      throw new NotFoundException('Balance not found');
    }

    usdtBalance.available = String(Number(usdtBalance.available) + amount);

    const savedBalance = await this.walletBalanceRepository.save(usdtBalance);

    return {
      asset_symbol: savedBalance.asset_symbol,
      amount: savedBalance.available,
    };
  }

  getBalances(walletId: string) {
    return `${walletId}`;
  }

  getTransactions(walletId: string) {
    return `${walletId}`;
  }

  buyAsset(walletId: string, dto: BuyAssetDto) {
    return `${walletId}${dto.assetSymbol}`;
  }

  async deleteWallet(userId: string) {
    await this.walletRepository.delete({ user_id: userId });

    return 'wallet deleted successfully';
  }
}
