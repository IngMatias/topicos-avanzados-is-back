import { Router } from 'express'

import healthRoute from './healthRoute.js'
import envRoute from './envRoute.js'
import accountRoute from './accountRoute.js'

const router = Router()

const endpointV1 = process.env.ENDPOINT_V1

router.use(endpointV1, accountRoute)
router.use(endpointV1, healthRoute)
router.use(endpointV1, envRoute)

export default router
