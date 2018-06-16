import { connect } from 'react-redux';

import { setScore } from './teamsReducer';

const teamContainer = (i) => {
  const mapStateToProps = (state) => {
    const {
      score,
    } = state[`team${i}`] || {};

    return {
      score,
    }
  };

  const mapDispatchToProps = {
    setScore: setScore(i)
  };

  return connect(mapStateToProps, mapDispatchToProps);
}

export default teamContainer;
