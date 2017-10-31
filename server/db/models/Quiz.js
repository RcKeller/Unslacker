import mongoose from 'mongoose'
import faker from 'faker'

const QuizSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  body: String,
  public: Boolean,
  responses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Response' }]
})
const Quiz = mongoose.model('Quiz', QuizSchema)
export default Quiz

/* *****
FAKE DATA GENERATOR: Quiz
******/
const dummyQuizes = (min, ids, developer) => {
  //  Check the db for existing data satisfying min required
  Quiz.count().exec((err, count) => {
    if (err) {
      console.warn(`Unable to count Quiz schema: ${err}`)
    } else if (count < min) {
      //  If it didn't, inject dummies.
      let fakes = []
      for (let i = 0; i < min; i++) {
        fakes[i] = new Quiz({
          _id: ids.Quiz[i],
          user: ids.User[i],
          title: faker.company.catchPhrase(),
          body: faker.lorem.paragraph(),
          public: faker.random.boolean(),
          responses: [
            ids.Response[i],
            ids.Response[i]
          ]
        })
      }
      //  Create a special Quiz for the webdev's profile
      fakes.push(new Quiz({...developer}))
      //  Create will push our fakes into the DB.
      Quiz.create(fakes, (error) => {
        if (!error) { console.log(`SEED: Created fake Quiz (${fakes.length})`) }
      })
    }
  })
}
export { dummyQuizes }
