import { Module } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { IdentityController } from './identity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Identity } from './entities/identity.entity';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  controllers: [IdentityController],
  providers: [IdentityService],
  imports: [TypeOrmModule.forFeature([Identity]), WalletModule],
})
export class IdentityModule {}
