import AsyncStorage from "@react-native-async-storage/async-storage";

export interface User {
  id: string;
  username: string;
  email: string;
  password: string; // In production, this should be hashed
}

const USERS_KEY = "hacker_terminal_users";
const CURRENT_USER_KEY = "hacker_terminal_current_user";

/**
 * Get all registered users from AsyncStorage
 */
export async function getAllUsers(): Promise<User[]> {
  try {
    const data = await AsyncStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error getting users:", error);
    return [];
  }
}

/**
 * Register a new user
 */
export async function registerUser(
  username: string,
  email: string,
  password: string
): Promise<{ success: boolean; message: string; user?: User }> {
  try {
    // Validate inputs
    if (!username || !email || !password) {
      return { success: false, message: "All fields are required" };
    }

    if (username.length < 3) {
      return { success: false, message: "Username must be at least 3 characters" };
    }

    if (password.length < 6) {
      return { success: false, message: "Password must be at least 6 characters" };
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, message: "Invalid email format" };
    }

    const users = await getAllUsers();

    // Check if user already exists
    if (users.some((u) => u.username === username)) {
      return { success: false, message: "Username already exists" };
    }

    if (users.some((u) => u.email === email)) {
      return { success: false, message: "Email already registered" };
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      username,
      email,
      password,
    };

    users.push(newUser);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));

    return { success: true, message: "Account created successfully", user: newUser };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, message: "Error creating account" };
  }
}

/**
 * Login user
 */
export async function loginUser(
  username: string,
  password: string
): Promise<{ success: boolean; message: string; user?: User }> {
  try {
    if (!username || !password) {
      return { success: false, message: "Username and password required" };
    }

    const users = await getAllUsers();
    const user = users.find((u) => u.username === username && u.password === password);

    if (!user) {
      return { success: false, message: "Invalid username or password" };
    }

    // Save current user session
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

    return { success: true, message: "Login successful", user };
  } catch (error) {
    console.error("Error logging in:", error);
    return { success: false, message: "Error during login" };
  }
}

/**
 * Get current logged-in user
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const data = await AsyncStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

/**
 * Logout current user
 */
export async function logoutUser(): Promise<void> {
  try {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
  } catch (error) {
    console.error("Error logging out:", error);
  }
}

/**
 * Check if user is logged in
 */
export async function isUserLoggedIn(): Promise<boolean> {
  const user = await getCurrentUser();
  return user !== null;
}
