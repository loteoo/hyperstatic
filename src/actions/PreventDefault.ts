import { State } from '../types';

const PreventDefault = (state: State, ev) => {
  ev.preventDefault();
  return state;
};

export default PreventDefault
