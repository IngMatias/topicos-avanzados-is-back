import { Account, Currency, Transaction } from '../models/index.js'

import { getUserIdFromReq } from '../auth/auth.js'

import { fn, literal, Op } from 'sequelize'

export const createAccount = async (req, res) => {
  const userId = getUserIdFromReq(req)
  const { currencyId, accountNumber, description, amount } = req.body

  // Validations
  if (!currencyId || !accountNumber || !amount) {
    res.status(400).json({
      success: false,
      message: 'Datos Inválidos'
    })
    return
  }

  try {
    const createdAccount = await Account.create({
      userId,
      currencyId,
      accountNumber,
      description
    })

    await Transaction.create({
      accountId: createdAccount?.dataValues?.id,
      currencyId: createdAccount?.dataValues?.currencyId,
      description: 'Saldo Inicial',
      type: 'IN',
      amount,
      date: createdAccount?.dataValues?.createdAt
    })

    res.json(createdAccount)
  } catch (e) {
    console.error(e)
    res.status(500).json({
      success: false,
      message: e.message
    })
  }
}

export const getAccounts = async (req, res) => {
  const userId = getUserIdFromReq(req)
  const { currencyId, accountNumberStartsWith } = req.query

  const where = { userId }
  try {
    if (currencyId) {
      where.currencyId = currencyId
    }

    if (accountNumberStartsWith) {
      where.accountNumber = {
        [Op.like]: `${accountNumberStartsWith}%`
      }
    }

    const gettedAccounts = await Account.findAll({
      where,
      include: [{
        model: Currency
      }, {
        model: Transaction,
        attributes: [],
        required: false
      }
      ],
      attributes: {
        include: [
          [
            fn(
              'sum',
              literal('CASE WHEN transactions.type = \'IN\' THEN transactions.amount ELSE 0 END')
            ),
            'total_in'
          ],
          [
            fn(
              'sum',
              literal('CASE WHEN transactions.type = \'OUT\' THEN transactions.amount ELSE 0 END')
            ),
            'total_out'
          ]
        ]
      },
      group: ['account.id']
    })
    res.json(gettedAccounts)
  } catch (e) {
    console.error(e)
    res.status(500).json({
      success: false,
      message: e.message
    })
  }
}

export const getAccount = async (req, res) => {
  const userId = getUserIdFromReq(req)
  const { id } = req.query
  try {
    const gettedAccounts = await Account.findOne({
      where: {
        id,
        userId
      },
      include: [{
        model: Currency
      }]
    })

    res.json(gettedAccounts)
  } catch (e) {
    console.error(e)
    res.status(500).json({
      success: false,
      message: e.message
    })
  }
}

export const deleteAccount = async (req, res) => {
  const userId = getUserIdFromReq(req)
  const { id } = req.body

  const deletedAccount = await Account.destroy({
    where: {
      id,
      userId
    }
  })

  res.json(deletedAccount)
}

export const updateAccount = async (req, res) => {
  const userId = getUserIdFromReq(req)
  const { id, accountNumber, description } = req.body

  if (!id || !accountNumber || !description) {
    res.status(400).json({
      success: false,
      message: 'Datos Inválidos'
    })
    return
  }

  try {
    const updatedAccount = await Account.update({
      accountNumber,
      description
    }, {
      where: {
        id,
        userId
      }
    })

    res.json(updatedAccount)
  } catch (e) {
    console.error(e)
    res.status(500).json({
      success: false,
      message: e.message
    })
  }
}
