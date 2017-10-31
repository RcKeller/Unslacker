import REST from './restify'
import { Response } from '../models'

export default class Responses extends REST {
  constructor () {
    super(Response)
  }
}
