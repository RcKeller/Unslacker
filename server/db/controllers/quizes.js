import REST from './restify'
import { Quiz } from '../models'

export default class Quizes extends REST {
  constructor () {
    super(Quiz)
  }
}
