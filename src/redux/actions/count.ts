import {
  INCREMENT,
  DECREMENT,
} from '../actionTypes/count'

export const increment = () => ({ type: INCREMENT })
export const decrement = () => ({ type: DECREMENT })