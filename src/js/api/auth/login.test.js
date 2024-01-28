import { login } from './login.js';

// Mock localStorage functions
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
    // Mock the fetch function
    global.fetch = jest.fn();
    mockSave = jest.spyOn(localStorage, 'setItem');
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
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

  it('saves the profile and token on successful login', async () => {
    expect.hasAssertions();
    // Mock a successful API response
    const mockResponse = {
      ok: true,
      json: () =>
        Promise.resolve({
          accessToken: 'mockToken',
          userProfile: 'mockProfile',
        }),
    };

    global.fetch.mockResolvedValue(mockResponse);

    // Call the login function
    const profile = await login('valid@example.com', 'password');

    // Assertions
    expect(profile.userProfile).toEqual('mockProfile');
    expect(mockSave).toHaveBeenCalledTimes(2); // Ensure setItem was called twice
    expect(mockSave).toHaveBeenCalledWith('token', JSON.stringify('mockToken'));
    expect(mockSave).toHaveBeenCalledWith(
      'profile',
      JSON.stringify({
        userProfile: 'mockProfile',
      }),
    );
  });

  it('throws an error on failed login', async () => {
    expect.hasAssertions();
    // Mock a failed API response
    global.fetch.mockResolvedValue({ ok: false, statusText: 'Unauthorized' });

    // Use `await expect().rejects.toThrow()` for async functions
    await expect(login('invalid@example.com', 'wrongpassword')).rejects.toThrow(
      'Unauthorized',
    );
  });
});
