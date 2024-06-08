const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

require('dotenv').config()
const Person = require('./models/person')

const app = express()

/* middleware*/

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

// morgan middleware (logs info on request)

morgan.token('content', function (req) { return JSON.stringify(req.body) })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

/* log info about database */

app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    response.send('' + '' +
      `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
  })
})

/* get all persons */

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

/* get a person with specific id */

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {

      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

/* delete person from database */

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

/* add person to database*/

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  console.log(body)

  if (body === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person(body)

  person.save()
    .then(savedPerson => {
    response.json(savedPerson)
    })
    .catch(error => next(error))
})

/* update number in database */

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

/* error handling middleware*/

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }


  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

/* START BACKEND */

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})