import React from 'react';
import { shallow } from 'enzyme';
import { obalWithFetchMock } from 'jest-fetch-mock';

import Host from './Host.jsx';

describe('HostComponent', () => {
  it('fetches data from server when server returns a successful response', done => { // 1
    const mockSuccessResponse = {
      "name": "Trevino",
      "description": "Tashia and I are both former educators that work hard to play hard. We are easy-going, outdoor-loving people and love learning other peoples' stories. We get out of town most weekends and can often be found with a great cup of coffee or a cold IPA in our hands. We are passionate about sharing our love of the outdoors with others as much as possible, but when we are home, we need a comfortable place to lay our heads.",
      "interaction": "Your host will be on the property and available for anything you need during your stay.",
      "dateJoined": "June 2014",
      "languages": ["English"],
      "responseRate": "93%",
      "responseTime": "within a day",
      "hostUrl": "https://s3-us-west-1.amazonaws.com/fake-profile-pictures/males3.jpg"
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    const mockFetchPromise = Promise.resolve({ // 3
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); // 4

    const wrapper = shallow(<Host />); // 5

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3004/host/id/29', {"method": "GET"});

    process.nextTick(() => { // 6

      global.fetch.mockClear(); // 7
      done(); // 8
    });
  });
});