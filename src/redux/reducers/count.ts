import {
  INCREMENT,
  DECREMENT,
} from '../actionTypes/count'

const initialState = {
  _value: 0,
}

const Counter = (state = initialState, action: any) => {
  
  switch(action.type) {
    case INCREMENT:
      return {
        ...state,
        _value: state._value + 1
      }
    case DECREMENT:
      return {
        ...state,
        _value: state._value - 1
      }
    default:
      return state
  }
}

export default Counter