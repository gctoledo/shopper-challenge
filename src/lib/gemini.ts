import { GoogleGenerativeAI } from '@google/generative-ai'
import { env } from '../env'

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY)

export const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-pro',
})
