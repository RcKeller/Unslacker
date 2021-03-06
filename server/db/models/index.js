/*
MODEL INITIALIZER
Uses require() to pass the imports around as a func.
*/
export default function loadModels () {
  //  Auth/User & Meta data
  require('./config')
  require('./user')
  require('./quiz')
  require('./response')
}

/*
RESTful MODELS (and their dummy data generators)
For express-restify-mongoose
*/
import Config, { dummyConfigs } from './config'
import User, { dummyUsers } from './user'
import Quiz, { dummyQuizzes } from './quiz'
import Response, { dummyResponses } from './response'

export { Config, User, Quiz, Response }
export const restDummies = [ dummyConfigs, dummyUsers, dummyQuizzes, dummyResponses ]
