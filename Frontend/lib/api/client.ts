import axios, { AxiosInstance, AxiosError } from 'axios';
import { getAuth } from 'firebase/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 180000, // 3 minutes (180 seconds) - OCR processing can take 2+ minutes
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor: Add Firebase auth token
    this.client.interceptors.request.use(
      async (config) => {
        try {
          const auth = getAuth();
          if (auth.currentUser) {
            const token = await auth.currentUser.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.error('Failed to get auth token:', error);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor: Handle errors
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const data: any = error.response?.data;
        console.error('API Error:', {
          status: error.response?.status,
          message: data?.detail || error.message,
          timestamp: new Date().toISOString(),
        });
        return Promise.reject(error);
      }
    );
  }

  async health() {
    return this.client.get('/health');
  }

  async evaluate(formData: FormData) {
    return this.client.post('/api/evaluate/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 300000, // 5 minutes for evaluation (OCR processing can take time)
    });
  }

  async getScore(userId: string) {
    return this.client.get(`/api/evaluate/score/${userId}`);
  }

  async uploadFile(file: File, fileType: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('file_type', fileType);

    return this.client.post('/api/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async verifyToken(token: string) {
    return this.client.get('/api/auth/verify-token', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async deleteUserData(userId: string) {
    return this.client.delete(`/api/auth/user/${userId}`);
  }

  async createUser(userData: { firebase_uid: string; email: string; full_name?: string }) {
    return this.client.post('/api/auth/sign-up', {
      email: userData.email,
      password: '', // Not needed - user already created in Firebase
      full_name: userData.full_name,
    });
  }
}

export const apiClient = new APIClient();
