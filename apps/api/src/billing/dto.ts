import { IsString, IsEnum } from 'class-validator';

export class CreateCheckoutDto {
  @IsString()
  plan: 'STARTER' | 'PRO' | 'AGENCY';

  @IsEnum(['monthly', 'annual'])
  interval: 'monthly' | 'annual';
}

export class BuyCreditsDto {
  @IsEnum(['small', 'medium', 'large'])
  package: 'small' | 'medium' | 'large';
}
