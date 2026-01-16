
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export interface EvaluationResponse {
    evaluation_id: string;
    credit_score: {
        total_score: number;
        grade: string;
        percentile: number;
    };
    risk_assessment: {
        combined_risk: string;
        risk_score: number;
        key_risks: string[];
        mitigation_suggestions: string[];
    };
    processing_time: number;
}

export interface VerificationResult {
    success: boolean;
    error?: string;
    data?: any;
    isMismatch?: boolean;
}

export const api = {
    /**
     * Verify a single file with the backend to check for mismatches (e.g., uploading utility bill as bank statement)
     */
    verifyFile: async (file: File, type: 'bank-statement' | 'utility-bill' | 'gig-screenshot'): Promise<VerificationResult> => {
        const formData = new FormData();
        // Backend expects specific field names based on the type
        // We use a dummy user_id for verification
        formData.append('user_id', 'verification_check');

        if (type === 'bank-statement') {
            formData.append('bank_statement', file);
        } else if (type === 'utility-bill') {
            // For utility bills, backend expects a list, so we append one
            formData.append('utility_bills', file);
            // We can optionally pass types, but for general verification we might skip or infer
        } else if (type === 'gig-screenshot') {
            formData.append('gig_screenshot', file);
        }

        try {
            // We use the evaluate endpoint. If it fails validation (e.g. mismatch), it returns 400 with details.
            // If it succeeds, it returns 200 with score data.
            const response = await axios.post(`${API_BASE_URL}/api/evaluate/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return { success: true, data: response.data };
        } catch (error: any) {
            if (error.response) {
                // Backend returned an error response
                const status = error.response.status;
                const data = error.response.data;
                const detail = data?.detail || 'Verification failed';

                // Detect mismatch based on error text or status
                const isMismatch =
                    detail.includes('wrong file type') ||
                    detail.includes('not look like a bank statement') ||
                    detail.includes('must be PDF or CSV') || // Format mismatch
                    detail.includes('upload a valid utility bill');

                return {
                    success: false,
                    error: detail,
                    isMismatch: isMismatch
                };
            }
            return { success: false, error: 'Network error or server unreachable' };
        }
    },

    /**
     * Submit all files for final credit evaluation
     */
    evaluateCredit: async (formData: FormData): Promise<EvaluationResponse> => {
        const response = await axios.post(`${API_BASE_URL}/api/evaluate/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    /**
     * Get latest score for a user
     */
    getScore: async (userId: string) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/evaluate/score/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching score:", error);
            return null;
        }
    }
};
