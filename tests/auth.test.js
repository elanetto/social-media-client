import { login, logout } from '../src/js/api/auth';
import * as storage from '../src/js/storage/index.js'; // Import storage to mock it

// Mock the storage functions
jest.mock('../src/js/storage/index.js', () => ({
  save: jest.fn(),
  remove: jest.fn(),
  load: jest.fn(), 
}));

// Mock the global fetch function
global.fetch = jest.fn();

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key] ? JSON.parse(store[key]) : null;
    },
    setItem(key, value) {
      store[key] = value;
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

// Replace the global localStorage with the mock
global.localStorage = localStorageMock;

describe('Authentication Functions', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    localStorageMock.clear(); // Clear the localStorage mock
  });

  test('login function stores a token and profile when provided with valid credentials', async () => {
    // Mock the fetch response to simulate a successful login
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        accessToken: 'mockToken',
        name: 'John Doe',
        email: 'john.doe@example.com',
      }),
    });

    const email = 'john.doe@example.com';
    const password = 'password123';

    // Mock the load function to return null (simulate no token initially)
    storage.load.mockReturnValueOnce(null);

    // Call the login function
    const profile = await login(email, password);

    // Assertions
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/social/auth/login'),
      expect.objectContaining({
        method: 'post',
        body: JSON.stringify({ email, password }),
      })
    );
    expect(storage.save).toHaveBeenCalledWith('token', 'mockToken');
    expect(storage.save).toHaveBeenCalledWith('profile', expect.objectContaining({ name: 'John Doe', email: 'john.doe@example.com' }));
    expect(profile).toEqual(expect.objectContaining({ name: 'John Doe', email: 'john.doe@example.com' }));
  });

  test('logout function clears the token and profile from storage', () => {
    // Call the logout function
    logout();

    // Assertions
    expect(storage.remove).toHaveBeenCalledWith('token');
    expect(storage.remove).toHaveBeenCalledWith('profile');
  });

  test('login function throws an error when login fails', async () => {
    // Mock the fetch response to simulate a failed login
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Bad Request',
    });

    const email = 'invalid@example.com';
    const password = 'wrongpassword';

    // Mock the load function to return null (simulate no token initially)
    storage.load.mockReturnValueOnce(null);

    // Expect the login function to throw an error
    await expect(login(email, password)).rejects.toThrow('Bad Request');
  });
});