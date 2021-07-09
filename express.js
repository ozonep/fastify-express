import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

const candidates = [
  {
    id: 'ae588a6b-4540-5714-bfe2-a5c2a65f547a',
    name: 'Jimmy Coder',
    skills: ['javascript', 'es6', 'nodejs', 'express']
  }
]

app.post('/candidates', function (req, res) {
  candidates.push({
    id: req.body.id,
    name: req.body.name,
    skills: req.body.skills
  })
  res.status(201).send('Added entry!')
})

app.get('/candidates/search', function (req, res) {
  if (req.query.id) {
    const candidate = candidates.find(cand => cand.id === req.query.id)
    candidate ? res.send(candidate) : res.status(404).send('Not found')
  }
  if (req.query.skills) {
    const skillsArr = req.query.skills.split(',')
    let bestSkillsNumber = 0
    let bestCandidateIndex
    candidates.forEach((candidate, index) => {
      const skillsNumber = skillsArr.filter(skill => candidate.skills.includes(skill)).length
      if (skillsNumber > bestSkillsNumber) {
        bestSkillsNumber = skillsNumber
        bestCandidateIndex = index
      }
    })
    bestCandidateIndex >= 0 ? res.send(candidates[bestCandidateIndex]) : res.status(404).send('No candidates found for these skills')
  }
})

// This route is ONLY for benchmarking, since AutoCannon doesn't work with queries
app.get('/candidates/search/:candId', function (req, res) {
  const candidate = candidates.find(cand => cand.id === req.params.candId)
  candidate ? res.send(candidate) : res.status(404).send('Not found')
})

app.listen(process.env.HTTP_PORT || 3000, () => {
  console.log(`server listening on port ${process.env.HTTP_PORT || 3000}`)
})
