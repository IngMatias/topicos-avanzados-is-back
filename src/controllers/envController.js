export const getEnv = (req, res) => {
  res.send(process.env.ENV)
}
