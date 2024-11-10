import { Router } from 'express'

import { createAccount } from '../controllers/accountController.js'

const router = Router()

router.post('/account', createAccount)

export default router
