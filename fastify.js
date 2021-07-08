import Fastify from 'fastify'
import fastifyCors from 'fastify-cors'

const fastify = Fastify({
  logger: true
})

fastify.register(fastifyCors, {})

const candidates = [
  {
    id: 'ae588a6b-4540-5714-bfe2-a5c2a65f547a',
    name: 'Jimmy Coder',
    skills: ['javascript', 'es6', 'nodejs', 'express']
  }
]

// Fastify has built-in schema support for request (and response) validation and serialization
// Apart from security, this also makes it even faster
fastify.addSchema({
  $id: 'candidateSchema',
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    skills: { type: 'array' }
  }
})

fastify.post(
  '/candidates',
  { schema: { body: { $ref: 'candidateSchema#' } } },
  (req, res) => {
    candidates.push(req.body)
    res.code(201).send()
  }
)

fastify.get('/candidates/search', (req, res) => {
  if (req.query.id) {
    const candidate = candidates.find(cand => cand.id === req.query.id)
    candidate ? res.send(candidate) : res.code(404).send('Not found')
  }
  if (req.query.skills) {
    const skillsArr = req.query.skills.split(',')
  }
})

fastify.listen(process.env.HTTP_PORT || 3000, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})
