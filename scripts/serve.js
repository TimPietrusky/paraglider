import {readFileSync} from 'fs'
import path from 'path'
import express from 'express'
import log from 'winston'
import globby from 'globby'
import pkg from '../package.json' // eslint-disable-line import/extensions
import routes from './routes'

const target = path.join(__dirname, '../docs')
const views = path.join(__dirname, '../views')

const serve = () => {
  const PORT = process.env.PORT || pkg.config.devPort
  const app = express()
  app.use(express.static('docs'))
  app.set('view engine', 'pug')
  const options = {
    data: {
      name: pkg.name,
      description: pkg.description
    }
  }
  globby([path.join(views, '*.pug'), `!${path.join(views, '_*.pug')}`]).then(files => {
    routes.forEach(({pathName, file}) => {
      app.get(pathName, ({params}, res) => {
        const param = file.split(':')[1]
        let fileName = params[param] || file
        const json = readFileSync(path.join(target, `${fileName}.json`)).toString()
        const styles = JSON.parse(json)
        options.data.fileName = fileName
        options.data.styles = styles
        options.data.files = files.map(file => path.parse(file).name)
        res.render(fileName, options)
      })
    })
    app.listen(PORT, () => {
      log.info(`Example app listening on port ${PORT}!`)
    })
  }).catch(err => {
    throw err
  })
}

export default serve
