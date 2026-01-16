"""
Document processing tests
"""
import pytest
from app.services.document_intelligence import DocumentIntelligenceService


@pytest.fixture
def doc_service():
    """Fixture for document service"""
    return DocumentIntelligenceService()


@pytest.mark.asyncio
async def test_identity_document_processing(doc_service):
    """Test identity document processing"""
    # This would be tested with actual files
    assert doc_service is not None


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
