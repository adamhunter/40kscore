
const SET_SCORE = (i) => `teams${i}/SET_SCORE`;

const teamReducerFactory = (i) => {
  const initialState = {
    names: `Team ${i}`,
    score: 0,
    goals: [],
  }

  const reducer = (state = initialState, action = {}) => {
    console.log('in reducer', state);
      switch(action.type) {
        case SET_SCORE(i):
          const score = action.payload;
          return {
            ...state,
            score,
          };
        default:
          return state;
      }
  }

  return reducer;
};

const setScore = (i) => {
  return (score) => {
    return {type: SET_SCORE(i), payload: score};
  }
};

export {
  setScore,
}

export default teamReducerFactory;
