const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  persons
    ? response.json(persons)
    : response.status(404).end()
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)

  const person = persons.find(p => p.id === id)

  person
    ? response.json(person)
    : response.status(404).end()

})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({error: 'name missing'})
  } else if (!body.number) {
    return response.status(400).json({error: 'number missing'})
  } else if (persons.map(p => p.name).includes(body.name)) {
    return response.status(400).json({error: 'name must be unique'})
  }

  const person = {
    id: Math.ceil(Math.random()*1000),
    name: body.name,
    number: body.number
  }

  persons.push(person)
  response.json(person)

})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)

  if (persons.map(p => p.id).includes(id)) {
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
  } else {
    response.status(404).end
  }
})

app.get('/info', (request, response) => {

  const responseHtml = `<p>Phonebook has info for ${persons.length} people</p>
    <p>${Date()}</p>`
  response.send(responseHtml)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

