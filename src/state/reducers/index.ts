import { combineReducers } from 'redux';
import cellsReducers from './cellsReducer';
import bundleReducers from './bundleReducers';

const reducers = combineReducers({
  cells: cellsReducers,
  bundles: bundleReducers,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
