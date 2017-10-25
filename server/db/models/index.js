/*
MODEL INITIALIZER
Uses require() to pass the imports around as a func.
*/
export default function loadModels () {
  //  Auth/User & Meta data
  require('./config')
  require('./user')
}

/*
RESTful MODELS (and their dummy data generators)
For express-restify-mongoose
*/
import Config, { dummyConfigs } from './config'
import User, { dummyUsers } from './user'

export { Config, User }
export const restDummies = [ dummyConfigs, dummyUsers ]
