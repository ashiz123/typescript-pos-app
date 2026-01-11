import express from 'express'
import { authHandler } from '../../middlewares/authHandler.js'
import { CategoryController } from './category.controller'
import { categoryService } from './category.service'

const categoryController = new CategoryController(categoryService)

const router = express.Router()

router.get('/', authHandler, categoryController.getAllCatgories)
router.post('/create', authHandler, categoryController.createCategory)
router.put('/update/:id', categoryController.updateCategory)
router.delete('/delete/:id', categoryController.deleteCategory)

export default router
