import REST from './restify'
import { Quiz } from '../models'

export default class Quizzes extends REST {
  constructor () {
    super(Quiz)
  }
}
