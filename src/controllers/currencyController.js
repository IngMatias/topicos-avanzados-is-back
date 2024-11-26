import { Currency } from '../models/index.js'

export const getCurrencies = async (req, res) => {
  const gettedCurrencies = await Currency.findAll({})

  res.json(gettedCurrencies)
}
