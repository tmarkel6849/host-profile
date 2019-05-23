import React from 'react';
import { shallow } from 'enzyme';
import Host from './Host.jsx';

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

describe('HostComponent', () => {
  it('populates state with GET response', done => {
    const mockSuccessResponse = mockResponse;
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    const wrapper = shallow(<Host id='54' name='Trevino' />);

    process.nextTick(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3004/host/id/54', {'method': 'GET'});
      expect(wrapper.state('name')).toBe('Trevino');
      expect(wrapper.state('description')).toBeString();
      expect(wrapper.state('dateJoined')).toBe('June 2014');
      expect(wrapper.state('languages')).toContainValue('English');
    });
    
    process.nextTick(() => {
      global.fetch.mockClear();
      done();
    });
  });

});