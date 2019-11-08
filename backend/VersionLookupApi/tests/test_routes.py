import os
import tempfile
import pytest
from VersionLookupApi.app.routes import app

@pytest.fixture
def client():

    with app.test_client() as client:
        yield client

def test_empty_db(client):
    rv = client.get('/')
    assert b'Hello, World!' in rv.data
