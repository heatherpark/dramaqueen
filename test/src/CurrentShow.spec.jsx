import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';
import {expect} from 'chai';

// import CurrentShows from '../../src/components/CurrentShows';
import CurrentShow from '../../src/components/CurrentShow';
import currentShows from './mockData/currentShows';

describe('CurrentShow', () => {

  it('renders one of the current shows', () => {
    const show = currentShows[0];
    const component = renderIntoDocument(
      <CurrentShow show={show} />
    );
    const showNames = scryRenderedDOMComponentsWithTag(component, 'h1');

    expect(showNames[0].textContent).to.equal('Pretty Little Liars');
  });
  // TODO: update
  it('invokes callback when "remove show" is clicked', () => {
    const show = currentShows[0];
    const component = renderIntoDocument(
      <CurrentShow show={show} />
    );
    const removeShow = scryRenderedDOMComponentsWithClass(component, 'remove-option');
    Simulate.click(removeShow[0]);

    expect(currentShows.length).to.equal(2);
  });

});