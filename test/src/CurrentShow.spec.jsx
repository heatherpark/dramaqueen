import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';
import {expect} from 'chai';

import { CurrentShows } from '../../src/components/CurrentShows';
import CurrentShow from '../../src/components/CurrentShow';
import currentShows from './mockData/currentShows';
import reducer from '../../src/reducer.js';

describe('CurrentShow', () => {

  it('renders one of the current shows', () => {
    const state = reducer(undefined, { type: 'SET_CURRENT_SHOWS', shows: currentShows });
    const component = renderIntoDocument(
      <CurrentShows currentShows={state.get('currentShows')} />
    );
    const showNames = scryRenderedDOMComponentsWithTag(component, 'h1');

    expect(showNames[0].textContent).to.equal('Pretty Little Liars');
  });

});