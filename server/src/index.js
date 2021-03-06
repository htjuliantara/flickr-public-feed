import Express from 'express'
import * as bodyParser from 'body-parser'
import Axios from 'axios'
import { chunk } from 'lodash'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config();
const app = Express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.get('/photos', async (req, res, next) => {
  try {
    const tags = req.query.tags
    const page = req.query.page || 1
    
    let url = 'https://www.flickr.com/services/feeds/photos_public.gne?format=json'
    if (tags) url = `${url}&tags=${tags}`
    
    const getPhotos = await Axios.get(url)
    const cleanData = getPhotos.data.replace('jsonFlickrFeed(', '').slice(0, -1)

    let items = JSON.parse(cleanData).items
    const total = items.length
    if (page <= total) {
      items = chunk(items, 1)[page - 1]
    } else {
      items = []
    }

    if (items.length > 0) {
      const meta = {
        total: parseInt(total),
        page: parseInt(page)
      }

      res.send({items, meta})  
    } else {
      const msg = {
        message: 'Photos not found'
      }
      res.status(404)
      res.send(msg)
    }
    
  } catch (e) {
    next(e) 
  }
})

const server = app.listen(process.env.PORT)

export default server
