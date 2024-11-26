import { CurrencyExchange } from '../models/index.js'

export const getCurrencyExchange = async (req, res) => {
  const { date, currencyId } = req.body

  const where = { }

  if (date) {
    where.date = date
  }
  if (currencyId) {
    where.currencyId = currencyId
  }

  let gettedCurrencyExchange = await CurrencyExchange.findAll({ where })

  if (gettedCurrencyExchange.length === 0) {
    // Peticion al BCU
    // Crear currency exchange
    // Obtener nuevamente el resultado
    gettedCurrencyExchange = await CurrencyExchange.findAll({ where })
  }

  res.json(gettedCurrencyExchange)
}
