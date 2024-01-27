import { logout } from './logout.js';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

global.localStorage = localStorageMock;

describe('logout function', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'mockToken');
  });

  it('clears the token from browser storage', () => {
    expect.hasAssertions();
    logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
  });
});
