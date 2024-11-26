import { Router } from 'express'

import healthRoute from './healthRoute.js'
import envRoute from './envRoute.js'
import userRoute from './userRoute.js'
import accountRoute from './accountRoute.js'
import transactionRoute from './transactionRoute.js'
import currencyRoute from './currencyRoute.js'
import categoryRoute from './categoryRoute.js'

const router = Router()

const endpointV1 = process.env.ENDPOINT_V1

router.use(endpointV1, healthRoute)
router.use(endpointV1, envRoute)
router.use(endpointV1, userRoute)
router.use(endpointV1, accountRoute)
router.use(endpointV1, transactionRoute)
router.use(endpointV1, currencyRoute)
router.use(endpointV1, categoryRoute)

export default router
