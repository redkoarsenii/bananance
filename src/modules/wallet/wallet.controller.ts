import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  Patch,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { DepositDto } from './dto/deposit-wallet.dto';
import { BuyAssetDto } from './dto/buy-asset.dto';

@Controller({ path: 'wallet', version: '1' })
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  createWallet(@Query('id') id: string) {
    return this.walletService.createWallet(id);
  }

  @Get()
  getWallet(@Query('id') id: string) {
    return this.walletService.getWallet(id);
  }

  @Patch(':id/deposit')
  depositUSDT(@Param('id') id: string, @Body() dto: DepositDto) {
    return this.walletService.depositUSDT(id, dto.amount);
  }

  @Get(':walletId/balances')
  getBalances(@Param('walletId') walletId: string) {
    return this.walletService.getBalances(walletId);
  }

  @Get(':walletId/transactions')
  getTransactions(@Param('walletId') walletId: string) {
    return this.walletService.getTransactions(walletId);
  }

  @Post('walletId/buy')
  buyAsset(@Param('walletId') walletId: string, @Body() dto: BuyAssetDto) {
    return this.walletService.buyAsset(walletId, dto);
  }

  @Delete()
  deleteWallet(@Param('id') id: string) {
    return this.walletService.deleteWallet(id);
  }
}
