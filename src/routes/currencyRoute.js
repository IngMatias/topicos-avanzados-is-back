import { Router } from 'express'

import {
  getCurrencies
} from '../controllers/currencyController.js'

const router = Router()

router.get('/currencies', getCurrencies)

export default router
