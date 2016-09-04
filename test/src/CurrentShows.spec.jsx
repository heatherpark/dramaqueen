import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';
import {expect} from 'chai';

import CurrentShows from '../../src/components/CurrentShows';
import CurrentShow from '../../src/components/CurrentShow';
import currentShows from './mockData/currentShows';

describe('CurrentShows', () => {

  it('renders list of current shows', () => {
    const component = renderIntoDocument(
      <CurrentShows currentShows={currentShows} />
    );
    const showNames = scryRenderedDOMComponentsWithTag(component, 'h1');

    expect(showNames.length).to.equal(2);
    expect(showNames[0].textContent).to.equal('Pretty Little Liars');
    expect(showNames[1].textContent).to.equal('Friends');
  });

});