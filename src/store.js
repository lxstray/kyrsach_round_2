import { createStore } from 'redux';

const initialState = {
  geo: {
    lat: '53.9024716',
    lon: '27.5618225'
  }
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_GEO':
          return {
            ...state,
            geo: action.payload
          };
        default:
          return state;
      }
};

const store = createStore(rootReducer);

export default store;
