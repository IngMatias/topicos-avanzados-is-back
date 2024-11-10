import { Router } from 'express'

import { getEnv } from '../controllers/envController.js'

const router = Router()

router.get('/env', getEnv)

export default router
