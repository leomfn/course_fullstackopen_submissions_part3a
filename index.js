const express = require('express')
const app = express()

app.use(express.json())

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
  console.log('GET request on /api/persons registered')

  persons
    ? response.json(persons)
    : response.status(404).end()
})

app.get('/api/persons/:id', (request, response) => {
  console.log(`GET request on /api/persons/${request.params.id}`)

  const id = Number(request.params.id)

  const person = persons.find(p => p.id === id)

  person
    ? response.json(person)
    : response.status(404).end()

})

app.post('/api/persons', (request, response) => {
  console.log('POST request on /api/persons')

  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({error: 'name or number missing'})
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
  console.log(`DELETE request on /api/persons/${request.params.id}`)

  const id = Number(request.params.id)
  console.log('delete id', id)

  if (persons.map(p => p.id).includes(id)) {
    console.log('id to delete exists')
    persons = persons.filter(p => p.id !== id)
    console.log(persons)
    response.status(204).end()
  } else {
    console.log('id to delete does not exist')
    response.status(404).end
  }
})

app.get('/info', (request, response) => {
  console.log('GET request on /info registered')

  const responseHtml = `<p>Phonebook has info for ${persons.length} people</p>
    <p>${Date()}</p>`
  response.send(responseHtml)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

