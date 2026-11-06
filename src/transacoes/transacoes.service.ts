import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriarTransacaoDto } from './dto/criar-transacao.dto';
import { Transacao, TransacaoDocument } from './schemas/transacao.schema';

@Injectable()
export class TransacoesService {
  constructor(
    @InjectModel(Transacao.name)
    private readonly transacaoModel: Model<TransacaoDocument>,
  ) {}

  async criar(dados: CriarTransacaoDto) {
    const novaTransacao = new this.transacaoModel(dados);
    return novaTransacao.save();
  }

  async listarComMetricas() {
    const historico = await this.transacaoModel.find().sort({ createdAt: -1}).lean();

    let totalReceitas = 0;
    let totalDespesas = 0;
    let totalGastoImpulso = 0;

    for (const transacao of historico) {
      if (transacao.tipo === 'receita') {
        totalReceitas += transacao.valor;
      } else if (transacao.tipo === 'despesa') {
        totalDespesas += transacao.valor;

        if (transacao.consumoConsciente === false) {
          totalGastoImpulso += transacao.valor;
        }
      }
    }

    return {
      historico,
      metricas: {
        saldoTotal: Number((totalReceitas - totalDespesas).toFixed(2)),
        totalDespesas: Number(totalDespesas.toFixed(2)),
        totalGastoImpulso: Number(totalGastoImpulso.toFixed(2)),
      },
    };
  }
}