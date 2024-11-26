import { Router } from 'express'

import {
  createAccount,
  getAccounts,
  getAccount,
  deleteAccount,
  updateAccount
} from '../controllers/accountController.js'

const router = Router()

router.post('/account', createAccount)
router.get('/accounts', getAccounts)
router.get('/account', getAccount)
router.delete('/account', deleteAccount)
router.put('/account', updateAccount)

export default router
