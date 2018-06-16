import React from 'react';
import { Provider } from 'react-redux';
import { range } from 'lodash';
// import { escape as h } from 'lodash';
// import './App.css';

import 'bootstrap/dist/css/bootstrap.css';

import store from './store';
import teamContainer from './teamContainer';

const TeamName = (props) => {
  const { name } = props;

  return (
    <header>
      <h1
        contentEditable
        onInput={e => console.log(e.target.innerHTML)}
        suppressContentEditableWarning={true}
      >
        { name }
      </h1>
    </header>
  );
};

const ScorableInput = (props) => {
  const {
    score = 0,
    updateScore,
  } = props;

  const count = Number(score) + 1;
  const boxes = range(0, count);

  const handleKeyUp = (e) => {
    const { which, keyCode } = e;
    const code = which || keyCode;

    switch (code) {
      case 13:
        console.log('pressed enter');
        return;
      case 8:
      case 46:
        if (e.target.value === '') {
          console.log('empty field delete or backsapce pressed');
        }
        return;
      default:
        return;
    }
  }

  const handleOnChange = (e) => {
    const update = e.target.checked ? +1 : -1;
    updateScore(score + update);
  }

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              onKeyUp={handleKeyUp}
            />
          </div>
          <div className="form-group form-check-inline">
            {boxes.map((x, i) => {
              return (
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={i + 1 < count}
                  key={x}
                  onChange={handleOnChange}
                />
              );
            })}
            <label>
              Score: {score}
            </label>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
};

const TeamScoreboard = (props) => {
  const {
    name,
    score,
    setScore,
  } = props;

  return (
    <div className="col-6">
      <TeamName name={name} />
      <ScorableInput
        score={score}
        updateScore={setScore}
      />
    </div>
  );
};

const Team1Scoreboard = teamContainer(1)(TeamScoreboard)
const Team2Scoreboard = teamContainer(2)(TeamScoreboard)

const App = (props) => {
  return (
    <Provider store={store}>
      <div className="container">
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1">40K Score Tracker</span>
        </nav>
        <p>
          To get started, enter some team names!
        </p>
        <div className="row">
          <Team1Scoreboard name="Team Skull" />
          <Team2Scoreboard name="Team Rocket" />
        </div>
      </div>
    </Provider>
  );
};

export default App;
