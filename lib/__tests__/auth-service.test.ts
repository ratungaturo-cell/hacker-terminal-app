import { describe, it, expect, beforeEach, vi } from "vitest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getCurrentUser,
  logoutUser,
  isUserLoggedIn,
} from "../auth-service";

// Mock AsyncStorage
vi.mock("@react-native-async-storage/async-storage", () => ({
  default: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
}));

describe("Auth Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("registerUser", () => {
    it("should register a new user successfully", async () => {
      vi.mocked(AsyncStorage.getItem).mockResolvedValue(null);
      vi.mocked(AsyncStorage.setItem).mockResolvedValue(undefined);

      const result = await registerUser("testuser", "test@example.com", "password123");

      expect(result.success).toBe(true);
      expect(result.user?.username).toBe("testuser");
      expect(result.user?.email).toBe("test@example.com");
    });

    it("should reject registration with missing fields", async () => {
      const result = await registerUser("", "", "");
      expect(result.success).toBe(false);
      expect(result.message).toBe("All fields are required");
    });

    it("should reject registration with short username", async () => {
      const result = await registerUser("ab", "test@example.com", "password123");
      expect(result.success).toBe(false);
      expect(result.message).toBe("Username must be at least 3 characters");
    });

    it("should reject registration with short password", async () => {
      const result = await registerUser("testuser", "test@example.com", "pass");
      expect(result.success).toBe(false);
      expect(result.message).toBe("Password must be at least 6 characters");
    });

    it("should reject registration with invalid email", async () => {
      const result = await registerUser("testuser", "invalid-email", "password123");
      expect(result.success).toBe(false);
      expect(result.message).toBe("Invalid email format");
    });

    it("should reject registration if username already exists", async () => {
      const existingUser = {
        id: "1",
        username: "testuser",
        email: "existing@example.com",
        password: "password123",
      };

      vi.mocked(AsyncStorage.getItem).mockResolvedValue(JSON.stringify([existingUser]));

      const result = await registerUser("testuser", "new@example.com", "password123");
      expect(result.success).toBe(false);
      expect(result.message).toBe("Username already exists");
    });

    it("should reject registration if email already exists", async () => {
      const existingUser = {
        id: "1",
        username: "existinguser",
        email: "test@example.com",
        password: "password123",
      };

      vi.mocked(AsyncStorage.getItem).mockResolvedValue(JSON.stringify([existingUser]));

      const result = await registerUser("testuser", "test@example.com", "password123");
      expect(result.success).toBe(false);
      expect(result.message).toBe("Email already registered");
    });
  });

  describe("loginUser", () => {
    it("should login user successfully with correct credentials", async () => {
      const user = {
        id: "1",
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      };

      vi.mocked(AsyncStorage.getItem).mockResolvedValue(JSON.stringify([user]));
      vi.mocked(AsyncStorage.setItem).mockResolvedValue(undefined);

      const result = await loginUser("testuser", "password123");
      expect(result.success).toBe(true);
      expect(result.user?.username).toBe("testuser");
    });

    it("should reject login with missing credentials", async () => {
      const result = await loginUser("", "");
      expect(result.success).toBe(false);
      expect(result.message).toBe("Username and password required");
    });

    it("should reject login with wrong password", async () => {
      const user = {
        id: "1",
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      };

      vi.mocked(AsyncStorage.getItem).mockResolvedValue(JSON.stringify([user]));

      const result = await loginUser("testuser", "wrongpassword");
      expect(result.success).toBe(false);
      expect(result.message).toBe("Invalid username or password");
    });

    it("should reject login with non-existent user", async () => {
      vi.mocked(AsyncStorage.getItem).mockResolvedValue(JSON.stringify([]));

      const result = await loginUser("nonexistent", "password123");
      expect(result.success).toBe(false);
      expect(result.message).toBe("Invalid username or password");
    });
  });

  describe("logoutUser", () => {
    it("should logout user successfully", async () => {
      vi.mocked(AsyncStorage.removeItem).mockResolvedValue(undefined);

      await logoutUser();
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith("hacker_terminal_current_user");
    });
  });
});
