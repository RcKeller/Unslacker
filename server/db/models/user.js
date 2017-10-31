import mongoose from 'mongoose'
import faker from 'faker'

const UserSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  username: String,
  email: { type: String, lowercase: true },
  tokens: Array,
  google: Object
})
const User = mongoose.model('User', UserSchema)
export default User

/* *****
FAKE DATA GENERATOR: User
******/
const dummyUsers = (min, ids, developer) => {
  //  Check the db for existing data satisfying min required
  User.count().exec((err, count) => {
    if (err) {
      console.warn(`Unable to count Decision schema: ${err}`)
    } else if (count < min) {
      //  If it didn't, inject dummies.
      let fakes = []
      for (let i = 0; i < min; i++) {
        fakes[i] = new User({
          _id: ids.User[i],
          name: faker.name.findName(),
          username: faker.internet.userName(),
          admin: false,
          team: faker.company.catchPhrase()
        })
      }
      //  Create a special user for the webdev's profile
      fakes.push(new User({...developer}))
      //  Create will push our fakes into the DB.
      User.create(fakes, (error) => {
        if (!error) { console.log(`SEED: Created fake User (${fakes.length})`) }
      })
    }
  })
}
export { dummyUsers }
