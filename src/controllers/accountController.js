import Account from '../models/account.js'

export const createAccount = async (req, res) => {
  const { accountNumber } = req.body

  const createdAccount = await Account.create({
    accountNumber
  })

  res.json(createdAccount)
}
