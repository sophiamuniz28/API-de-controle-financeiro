import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CriarTransacaoDto {
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  valor: number;

  @IsString()
  @IsIn(['receita', 'despesa'])
  tipo: 'receita' | 'despesa';

  @IsString()
  @IsNotEmpty()
  categoria: string;

  @IsBoolean()
  consumoConsciente: boolean;
}