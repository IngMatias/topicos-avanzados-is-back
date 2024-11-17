import { Router } from 'express'
import { getCurrenciesClient, getCurrencyPairClient } from '../clients/currencySoapClient.js'
const router = Router()

router.get('/currencies', getCurrenciesClient)
router.get('/currencyPair', getCurrencyPairClient)

export default router
