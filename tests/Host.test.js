import React from 'react';
import { shallow, mount } from 'enzyme';
import Host from '../client/components/Host.jsx';

const mockResponse = {
  'id': 54,
  'name': 'Trevino',
  'description': 'Tashia and I are both former educators that work hard to play hard. We are easy-going, outdoor-loving people and love learning other peoples\' stories. We get out of town most weekends and can often be found with a great cup of coffee or a cold IPA in our hands. We are passionate about sharing our love of the outdoors with others as much as possible, but when we are home, we need a comfortable place to lay our heads.',
  'interaction': 'Your host will be on the property and available for anything you need during your stay.',
  'dateJoined': 'June 2014',
  'languages': ['English'],
  'responseRate': '93%',
  'responseTime': 'within a day',
  'hostUrl': 'https://s3-us-west-1.amazonaws.com/fake-profile-pictures/males3.jpg'
};

beforeAll(() => {
  const mockJsonPromise = Promise.resolve(mockResponse);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
  });
  return jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
});

afterAll(() => {
  global.fetch.mockClear();
});

describe('HostComponent', () => {
  describe('API functionality', () => {
    it('calls the fetch upon didMount given an id', done => {
      expect(global.fetch).not.toHaveBeenCalled();
      const wrapper = shallow(<Host id={54} />);
      process.nextTick(() => {
        expect(global.fetch).toHaveBeenCalledTimes(1);
        done();
      });
    });
    it('calls the fetch with correct path for given id', done => {
      const wrapper = shallow(<Host id={54} />);
      process.nextTick(() => {
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:3004/host/id/54', {'method': 'GET'});
        done();
      });
    });
    it('doesn\'t call fetch if id has default -1', done => {
      const wrapper = shallow(<Host />);
      process.nextTick(() => {
        expect(global.fetch).not.toHaveBeenCalled();
        done();
      });
    });
  });
  describe('Setting state from fetched data', () => {
    it('sets all Host state values from fetch response', done => {
      const wrapper = shallow(<Host id={54} />);
      process.nextTick(() => {
        expect(wrapper.state('name')).toBe('Trevino');
        expect(wrapper.state('description')).not.toBeEmpty();
        expect(wrapper.state('interaction')).toBeString();
        expect(wrapper.state('dateJoined')).toBe('June 2014');
        expect(wrapper.state('languages')).toContainValue('English');
        expect(wrapper.state('responseRate')).toBe('93%');
        expect(wrapper.state('responseTime')).toBe('within a day');
        expect(wrapper.state('hostUrl')).not.toBeEmpty();
        done();
      });
    });
  });
  describe('Rendering the component', () => {
    it('renders with state-fed values', done => {
      const wrapper = mount(<Host id={54} />);
      process.nextTick(() => {
        expect(wrapper.find('div#hi-im').text()).toEqual('Hi, I\'m Trevino');
        expect(wrapper.find('div#description').text()).toEqual(mockResponse.description);
        expect(wrapper.find('div#joined-in').text()).toEqual(`Joined in ${mockResponse.dateJoined}`);
        done();
      });
    });
    it('renders the correct clickable elements', done => {
      const wrapper = mount(<Host id={54} />);
      process.nextTick(() => {
        expect(wrapper.containsMatchingElement( <button>CONTACT</button> )).toBeTruthy();
        expect(wrapper.find('button')).toHaveLength(2);
        done();
      });
    });
  });
});