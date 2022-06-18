const badRequest = (req, res, next) => {
  res.status(404).json("Oops.. 404 NotFound!")
}

export { badRequest }