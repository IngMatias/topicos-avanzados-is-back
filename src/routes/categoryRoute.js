import { Router } from 'express'

import {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory
} from '../controllers/categoryController.js'

const router = Router()

router.post('/category', createCategory)
router.get('/categories', getCategories)
router.delete('/categories', deleteCategory)
router.put('/categories', updateCategory)

export default router
