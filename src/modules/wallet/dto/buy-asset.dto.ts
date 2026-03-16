import { IsNumber, IsString, Min } from 'class-validator';

export class BuyAssetDto {
  @IsString()
  assetSymbol: string;

  @IsNumber()
  @Min(0.00000001)
  quantity: number;
}
