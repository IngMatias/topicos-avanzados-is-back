import { User } from '../models/index.js'

export const createUser = async (req, res) => {
  // const {} = req.body

  const createdUser = await User.create()

  res.json(createdUser)
}
