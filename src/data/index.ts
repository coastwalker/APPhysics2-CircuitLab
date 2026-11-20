import { QUESTIONS_PART_1 } from './questionsPart1'
import { QUESTIONS_PART_2 } from './questionsPart2'
import { QUESTIONS_PART_3 } from './questionsPart3'
import { ALL_FRQS } from './frqs'
import { MODULES, getModuleById } from './modules'
import { MCQQuestion } from '../types'

export const ALL_MCQS: MCQQuestion[] = [
  ...QUESTIONS_PART_1,
  ...QUESTIONS_PART_2,
  ...QUESTIONS_PART_3,
]

export { ALL_FRQS, MODULES, getModuleById }
