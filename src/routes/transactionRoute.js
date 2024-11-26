import { Router } from 'express'

import {
  createTransaction,
  getTransactions,
  getTransaction,
  deleteTransaction,
  updateTransaction
} from '../controllers/transactionController.js'

const router = Router()

router.post('/transaction', createTransaction)
router.get('/transactions', getTransactions)
router.get('/transaction', getTransaction)
router.delete('/transaction', deleteTransaction)
router.put('/transaction', updateTransaction)

export default router
