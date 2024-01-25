import { login } from './login.js';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

global.localStorage = localStorageMock;

describe('login function', () => {
  let mockSave;

  beforeEach(() => {
    global.fetch = jest.fn();
    mockSave = jest.spyOn(localStorage, 'setItem');
  });

  jest.mock('../constants.js', () => ({
    apiPath: 'http://mock-api-path',
  }));

  jest.mock('../headers.js', () => ({
    headers: () => ({ 'Content-Type': 'application/json' }),
  }));

  jest.mock('../../storage/index.js', () => ({
    save: mockSave,
  }));

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('saves the profile and token on successful login', async () => {
    const mockResponse = {
      ok: true,
      json: () =>
        Promise.resolve({
          accessToken: 'mockToken',
          userProfile: 'mockProfile',
        }),
    };

    global.fetch.mockResolvedValue(mockResponse);

    const profile = await login('valid@example.com', 'password');

    expect(profile.userProfile).toEqual('mockProfile');
    expect(mockSave).toHaveBeenCalledTimes(2);
    expect(mockSave).toHaveBeenCalledWith('token', JSON.stringify('mockToken'));
    expect(mockSave).toHaveBeenCalledWith(
      'profile',
      JSON.stringify({
        userProfile: 'mockProfile',
      }),
    );
  });

  it('throws an error on failed login', async () => {
    global.fetch.mockResolvedValue({ ok: false, statusText: 'Unauthorized' });

    await expect(login('invalid@example.com', 'wrongpassword')).rejects.toThrow(
      'Unauthorized',
    );
  });
});
