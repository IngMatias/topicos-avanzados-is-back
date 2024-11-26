import { getCurrencyPairClient } from '../clients/currencySoapClient.js'
import { Currency, CurrencyExchange } from '../models/index.js'

export const getCurrencyExchange = async (req, res) => {
  const { date, currencyId } = req.body

  const where = { }

  if (date) {
    where.date = date
  } else {
    where.date = new Date()
  }
  if (currencyId) {
    where.currencyId = currencyId
  }

  let gettedCurrencyExchange = await CurrencyExchange.findAll({ where })

  if (gettedCurrencyExchange.length === 0) {
    // Peticion al BCU
    const gettedCurrency = await Currency.findOne({
      id: currencyId
    })

    const currencyPair = await getCurrencyPairClient({ code: gettedCurrency.dataValues.code, date })

    // Obtener nuevamente el resultado
    gettedCurrencyExchange = await CurrencyExchange.create({
      currencyId,
      date: currencyPair.date,
      buy: currencyPair.buy,
      sell: currencyPair.sell
    })
  }

  res.json(gettedCurrencyExchange)
}
