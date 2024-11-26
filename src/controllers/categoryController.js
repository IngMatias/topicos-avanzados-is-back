import { Category } from '../models/index.js'

import { getUserIdFromReq } from '../auth/auth.js'

import { Op } from 'sequelize'

export const createCategory = async (req, res) => {
  const userId = getUserIdFromReq(req)
  const { description } = req.body

  if (!description) {
    res.status(400).json({
      success: false,
      message: 'Datos Inválidos'
    })
    return
  }

  const createdCategory = await Category.create({
    userId,
    description
  })

  res.json(createdCategory)
}
export const getCategories = async (req, res) => {
  const userId = getUserIdFromReq(req)
  const { descriptionStartsWith } = req.body

  const where = { userId }

  if (descriptionStartsWith) {
    where[Op.like] = `${descriptionStartsWith}%`
  }

  const gettedCategories = await Category.findAll({ where })

  res.json(gettedCategories)
}
export const deleteCategory = async (req, res) => {
  const userId = getUserIdFromReq(req)
  const { id } = req.body

  if (!id) {
    res.status(400).json({
      success: false,
      message: 'Datos Inválidos'
    })
    return
  }

  const deletedCategories = await Category.destroy({
    where: {
      id,
      userId
    }
  })

  res.json(deletedCategories)
}
export const updateCategory = async (req, res) => {
  const userId = getUserIdFromReq(req)
  const { id, description } = req.body

  if (!id || !description) {
    res.status(400).json({
      success: false,
      message: 'Datos Inválidos'
    })
    return
  }

  const updatedCategory = await Category.update({
    description
  }, {
    where: {
      id,
      userId
    }
  })

  res.json(updatedCategory)
}
