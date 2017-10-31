import mongoose from 'mongoose'
import faker from 'faker'

const ResponseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  team: String,
  title: String,
  body: String,
  public: Boolean,
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }
})
const Response = mongoose.model('Response', ResponseSchema)
export default Response

/* *****
FAKE DATA GENERATOR: Response
******/
const dummyResponses = (min, ids, developer) => {
  //  Check the db for existing data satisfying min required
  Response.count().exec((err, count) => {
    if (err) {
      console.warn(`Unable to count Response schema: ${err}`)
    } else if (count < min) {
      //  If it didn't, inject dummies.
      let fakes = []
      for (let i = 0; i < min; i++) {
        fakes[i] = new Response({
          _id: ids.Response[i],
          user: ids.User[i],
          team: faker.company.catchPhrase(),
          title: faker.company.catchPhrase(),
          body: faker.lorem.paragraph(),
          public: faker.random.boolean(),
          quiz: ids.Quiz[i]
        })
      }
      //  Create a special Response for the webdev's profile
      fakes.push(new Response({...developer}))
      //  Create will push our fakes into the DB.
      Response.create(fakes, (error) => {
        if (!error) { console.log(`SEED: Created fake Response (${fakes.length})`) }
      })
    }
  })
}
export { dummyResponses }
