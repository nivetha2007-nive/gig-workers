import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { auth } from './config';

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}

/**
 * Register new user with email and password
 */
export const registerUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      user: userCredential.user,
    };
  } catch (error: any) {
    return {
      success: false,
      error: getAuthErrorMessage(error.code),
    };
  }
};

/**
 * Sign in user with email and password
 */
export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      user: userCredential.user,
    };
  } catch (error: any) {
    return {
      success: false,
      error: getAuthErrorMessage(error.code),
    };
  }
};

/**
 * Sign out user
 */
export const logoutUser = async (): Promise<AuthResponse> => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: 'Failed to sign out',
    };
  }
};

/**
 * Get current user
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};

/**
 * Get Firebase token for API calls
 */
export const getAuthToken = async (): Promise<string | null> => {
  try {
    return await auth.currentUser?.getIdToken() || null;
  } catch (error) {
    return null;
  }
};

/**
 * Convert Firebase error codes to user-friendly messages
 */
function getAuthErrorMessage(code: string): string {
  const errorMessages: { [key: string]: string } = {
    'auth/email-already-in-use': 'Email already registered. Please sign in instead.',
    'auth/invalid-email': 'Invalid email format.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/user-not-found': 'Email not found. Please sign up first.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/too-many-requests': 'Too many login attempts. Please try again later.',
    'auth/operation-not-allowed': 'Sign up is currently disabled.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
  };

  return errorMessages[code] || 'Authentication failed. Please try again.';
}
