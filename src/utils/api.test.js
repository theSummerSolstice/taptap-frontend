import api from './api';

const FAKE_PATH = '/fake';
const FAKE_TOKEN = 'fakeToken';
const FAKE_DATA = 'fakeData';
const FAKE_JSON = { data: FAKE_DATA };
const FAKE_BODY = { body: FAKE_DATA };

beforeEach(() => {
  global.fetch = jest.fn(() => (
    Promise.resolve({
      json: () => Promise.resolve(FAKE_JSON),
    })
  ));

  localStorage.setItem('token', FAKE_TOKEN);
});

afterEach(() => {
  fetch.mockClear();
  localStorage.removeItem('token');
});


describe('api call test', () => {
  it('api get method should call fetch with path', async () => {
    const response = await api.get(FAKE_PATH);

    expect(response).toEqual(FAKE_DATA);
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:4000/fake');
    expect(fetch.mock.calls[0][1].headers.authorization).toEqual(FAKE_TOKEN);
  });

  it('api post method should call fetch with path and data', async () => {
    const response = await api.post(FAKE_PATH, FAKE_BODY);

    expect(response).toEqual(FAKE_DATA);
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:4000/fake');
    expect(fetch.mock.calls[0][1].headers.authorization).toEqual(FAKE_TOKEN);
    expect(fetch.mock.calls[0][1].body).toEqual(JSON.stringify(FAKE_BODY));
  });

  it('api put method should call fetch with path and data', async () => {
    const response = await api.put(FAKE_PATH, FAKE_BODY);

    expect(response).toEqual(FAKE_DATA);
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:4000/fake');
    expect(fetch.mock.calls[0][1].headers.authorization).toEqual(FAKE_TOKEN);
    expect(fetch.mock.calls[0][1].body).toEqual(JSON.stringify(FAKE_BODY));
  });

  it('api delete method should call fetch with path and data', async () => {
    const response = await api.delete(FAKE_PATH, FAKE_BODY);

    expect(response).toBeUndefined();
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:4000/fake');
    expect(fetch.mock.calls[0][1].headers.authorization).toEqual(FAKE_TOKEN);
    expect(fetch.mock.calls[0][1].body).toEqual(JSON.stringify(FAKE_BODY));
  });
});



