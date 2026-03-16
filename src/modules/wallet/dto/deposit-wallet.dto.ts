// DTO для депозиту
import { IsNumber, Min } from 'class-validator';

export class DepositDto {
  @IsNumber()
  @Min(0.01)
  amount: number; // сума в USDT
}
