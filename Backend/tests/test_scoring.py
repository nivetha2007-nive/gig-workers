"""
Scoring and model tests
"""
import pytest
from app.models.adaptive_weight_model import AdaptiveWeightModel


@pytest.fixture
def model():
    """Fixture for ML model"""
    return AdaptiveWeightModel()


def test_model_prediction(model):
    """Test model prediction"""
    features = [80, 70, 75, 85, 90, 80]
    score = model.predict(features)
    
    assert 0 <= score <= 100
    assert score > 0


def test_feature_importance(model):
    """Test feature importance"""
    importance = model.get_feature_importance()
    assert len(importance) == 6
    assert all(0 <= v <= 1 for v in importance.values())


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
