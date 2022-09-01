import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      if(decoded.id == process.env.ADMIN_ID) next()
      else 'Not authorized to post problems, token failed! ;('
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized to post problems, token failed! ;(')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token! :|')
  }
})

export default protect;