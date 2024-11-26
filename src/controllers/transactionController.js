import { Account, Transaction, Currency, Category } from '../models/index.js'

import { getUserIdFromReq } from '../auth/auth.js'

import { Op } from 'sequelize'
import transactionCategory from '../models/transactionCategory.js'

export const createTransaction = async (req, res) => {
  const {
    accountId,
    categories,
    currencyId,
    description,
    type,
    amount,
    date
  } = req.body

  const userId = getUserIdFromReq(req)
  if (!accountId || !currencyId || !description || !type || !amount || !date) {
    res.status(400).json({
      success: false,
      message: 'Datos Inválidos'
    })
    return
  }

  try {
    const promises = categories.map(async (cat) =>
      await Category.findOrCreate({
        where: {
          userId,
          description: cat
        }
      }).then(([value]) => value))
    const createdCategories = await Promise.all(promises)

    const createdTransaction = await Transaction.create({
      accountId,
      currencyId,
      description,
      type,
      amount,
      date
    })

    await transactionCategory.bulkCreate(
      createdCategories.map((cat) => {
        console.log('cat', Object.keys(cat))
        return ({
          categoryId: cat.dataValues.id,
          transactionId: createdTransaction.dataValues.id
        })
      })
    )
    res.json(createdTransaction)
  } catch (e) {
    console.error(e)
    res.status(500).json({
      success: false,
      message: e.message
    })
  }
}

export const getTransactions = async (req, res) => {
  // const userId = getUserIdFromReq(req)
  const {
    accountId,
    categoryId,
    currencyId,
    type,
    amountFrom,
    amountTo,
    dateFrom,
    dateTo
  } = req.query

  const where = { }

  if (accountId) {
    where.accountId = accountId
  }
  if (categoryId) {
    where.categoryId = categoryId
  }
  if (currencyId) {
    where.currencyId = currencyId
  }
  if (type) {
    where.type = type
  }

  const amount = {}
  if (amountFrom) {
    amount[Op.gte] = amountFrom
  }
  if (amountTo) {
    amount[Op.lte] = amountTo
  }
  if (amountFrom || amountTo) {
    where.amount = amount
  }

  const date = {}
  if (dateFrom) {
    amount[Op.gte] = dateFrom
  }
  if (dateTo) {
    amount[Op.lte] = dateTo
  }
  if (dateFrom || dateTo) {
    where.date = date
  }
  try {
    const gettedTransactions = await Transaction.findAll({
      where,
      include: [{
        model: Currency
      }, {
        model: Account
      }, {
        model: Category,
        through: { attributes: [] }
      }]
    })

    res.json(gettedTransactions)
  } catch (e) {
    console.error(e)
    res.status(500).json({
      success: false,
      message: e.message
    })
  }
}

export const getTransaction = async (req, res) => {
  // const userId = getUserIdFromReq(req)
  const { id } = req.query
  try {
    const gettedTransaction = await Transaction.findOne({
      where: {
        id
      },
      include: [{
        model: Currency
      }, {
        model: Account
      }, {
        model: Category,
        through: { attributes: [] }
      }]
    })

    res.json(gettedTransaction)
  } catch (e) {
    console.error(e)
    res.status(500).json({
      success: false,
      message: e.message
    })
  }
}

export const deleteTransaction = async (req, res) => {
  const userId = getUserIdFromReq(req)
  const { id } = req.body

  if (!id) {
    res.status(400).json({
      success: false,
      message: 'Datos Inválidos'
    })
    return
  }

  try {
    const deleteTransaction = await Transaction.destroy({
      where: {
        id
      },
      include: [{
        model: Account,
        where: {
          userId
        }
      }]
    })

    res.json(deleteTransaction)
  } catch (e) {
    console.error(e)
    res.status(500).json({
      success: false,
      message: e.message
    })
  }
}

export const updateTransaction = async (req, res) => {
  const userId = getUserIdFromReq(req)
  const {
    id,
    accountId,
    categories,
    currencyId,
    description,
    type,
    amount,
    date
  } = req.body

  if (!id || !accountId || !currencyId || !description || !type || !amount || !date) {
    res.status(400).json({
      success: false,
      message: 'Datos Inválidos'
    })
    return
  }
  try {
    const promises = categories.map(async (cat) =>
      await Category.findOrCreate({
        where: {
          userId,
          description: cat
        }
      }).then(([value]) => value))
    const createdCategories = await Promise.all(promises)

    const updatedTransaction = await Transaction.update({
      accountId,
      currencyId,
      description,
      type,
      amount,
      date
    }, {
      where: {
        id
      },
      include: [{
        model: Account
      }]
    })

    await transactionCategory.destroy({ where: { transactionId: id } })
    await transactionCategory.bulkCreate(
      createdCategories.map((cat) => ({ transactionId: id, categoryId: cat.dataValues.id }))
    )

    res.json(updatedTransaction)
  } catch (e) {
    console.error(e)
    res.status(500).json({
      success: false,
      message: e.message
    })
  }
}
