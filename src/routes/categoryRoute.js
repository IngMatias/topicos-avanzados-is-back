import { Router } from 'express'

import {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory
} from '../controllers/categoryController.js'

const router = Router()

router.post('/category', createCategory)
router.get('/categories', getCategories)
router.get('/category', getCategory)
router.delete('/category', deleteCategory)
router.put('/category', updateCategory)

export default router
