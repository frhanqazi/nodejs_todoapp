import { app } from './app.js'
import { connectDb } from './data/database.js'

connectDb()
app.listen(4000, () => {
  console.log(
    `Server is working on PORT ${process.env.PORT} and ${process.env.NODE_ENV} Mode`
  )
})
