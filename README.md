# API de Controle Financeiro Pessoal

API REST desenvolvida com NestJS, MongoDB e Mongoose para registrar receitas e despesas.

## Configuração

1. Instale as dependências: `npm install`
2. Crie um arquivo `.env` na raiz.
3. Adicione sua conexão do MongoDB Atlas:

```env
MONGODB_URI=mongodb+srv://USUARIO:SENHA@SEU_CLUSTER.mongodb.net/controle_financeiro?retryWrites=true&w=majority
PORT=3000
```

4. Inicie: `npm run start:dev`

## Rotas

### POST /transacoes

Exemplo de JSON:

```json
{
  "descricao": "Conta de Luz",
  "valor": 150.50,
  "tipo": "despesa",
  "categoria": "Moradia",
  "consumoConsciente": true
}
```

### GET /transacoes

Retorna `historico` e `metricas` (`saldoTotal`, `totalDespesas` e `totalGastoImpulso`).

O campo `consumoConsciente` deve ser `false` quando a despesa for considerada um gasto não essencial/por impulso.
