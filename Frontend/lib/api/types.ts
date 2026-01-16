import {
  EvaluationRequest,
  EvaluationResponse,
  HealthResponse,
  ApiError,
  PillarScore,
  LoanRecommendation,
} from '@/types/api';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// Export additional types for compatibility
export type { EvaluationResponse as ScoreResponse };
export type { EvaluationRequest };
export type { PillarScore as Pillars };
export type { LoanRecommendation };

export interface RequestConfig {
  method: HttpMethod;
  url: string;
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
  retry?: number;
}

export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  data?: T;
  error?: ApiError;
  timestamp: string;
}

export interface EvaluationPayload extends EvaluationRequest {
  timestamp: string;
  version: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface ApiRequestError extends Error {
  code: string;
  status?: number;
  response?: any;
}
