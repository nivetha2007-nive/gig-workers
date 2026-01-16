"""
Adaptive weight scoring model
"""
import pickle
import logging
from typing import List, Dict
from sklearn.ensemble import RandomForestRegressor
import numpy as np

logger = logging.getLogger(__name__)

MODEL_PATH = "app/models/trained/adaptive_weights.pkl"


class AdaptiveWeightModel:
    """Random Forest based adaptive weight model"""
    
    def __init__(self):
        """Initialize model"""
        self.model = None
        self.feature_names = [
            'upi_score', 'bills_score', 'employment_score',
            'finance_score', 'social_score', 'identity_score'
        ]
        self.load_model()
    
    def load_model(self):
        """Load pre-trained model"""
        try:
            with open(MODEL_PATH, 'rb') as f:
                self.model = pickle.load(f)
            logger.info("Model loaded successfully")
        except FileNotFoundError:
            logger.warning(f"Model file not found at {MODEL_PATH}")
            self.train_dummy_model()
    
    def train_dummy_model(self):
        """Train dummy model for testing"""
        X = np.random.rand(100, 6)
        y = np.random.rand(100)
        self.model = RandomForestRegressor(n_estimators=10, random_state=42)
        self.model.fit(X, y)
        logger.info("Dummy model trained")
    
    def predict(self, features: List[float]) -> float:
        """
        Predict score from features
        
        Args:
            features: List of pillar scores
            
        Returns:
            Predicted credit score (0-100)
        """
        if not self.model:
            return sum(features) / len(features)
        
        features_array = np.array(features).reshape(1, -1)
        prediction = self.model.predict(features_array)
        
        # Return scalar value
        return float(max(0, min(100, prediction[0])))
    
    def get_feature_importance(self) -> Dict[str, float]:
        """Get feature importance from model"""
        if not self.model:
            return {name: 1/6 for name in self.feature_names}
        
        importances = self.model.feature_importances_
        return dict(zip(self.feature_names, importances))


# Global model instance
_model_instance = None


def get_model() -> AdaptiveWeightModel:
    """Get or create model instance"""
    global _model_instance
    if _model_instance is None:
        _model_instance = AdaptiveWeightModel()
    return _model_instance
