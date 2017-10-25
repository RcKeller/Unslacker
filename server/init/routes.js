import db from '../db'
const controllers = db.controllers

//  GENERATE ROUTES
export default (app) => {
  console.log('REST: Initializing rest API routes')
  /*
  RESTful APIs
  */
  app.use(new controllers.Configs().API())
  app.use(new controllers.Users().API())
  console.log(`REST: API live for all ${Object.keys(controllers).length - 1} core models.`)
}
