import { apiClient } from './client';
import type { ScoreResponse } from './types';
import type { EvaluationResponse } from '@/types/api';

// Use EvaluationResponse as EvaluateResponse
type EvaluateResponse = EvaluationResponse;

export async function submitEvaluation(formData: FormData): Promise<EvaluateResponse> {
  try {
    const response = await apiClient.evaluate(formData);
    return response.data;
  } catch (error) {
    console.error('Evaluation submission failed:', error);
    throw error;
  }
}

export async function getUserScore(userId: string): Promise<ScoreResponse> {
  try {
    const response = await apiClient.getScore(userId);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user score:', error);
    throw error;
  }
}

export async function uploadDocument(
  file: File,
  fileType:
    | 'bank_statement'
    | 'utility_bill'
    | 'gig_screenshot'
    | 'aadhaar'
    | 'pan'
): Promise<any> {
  try {
    const response = await apiClient.uploadFile(file, fileType);
    return response.data;
  } catch (error) {
    console.error('File upload failed:', error);
    throw error;
  }
}

export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await apiClient.health();
    return response.status === 200;
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
}

export async function deleteUserData(userId: string): Promise<void> {
  try {
    await apiClient.deleteUserData(userId);
  } catch (error) {
    console.error('Failed to delete user data:', error);
    throw error;
  }
}

