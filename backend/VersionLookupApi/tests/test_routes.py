import os
import tempfile
import pytest
from VersionLookupApi.app.routes import create_app
import json
app = create_app()

@pytest.fixture
def client():

    with app.test_client() as client:
        yield client

def test_post_happy_path(client):
    res = client.post('/software-gerater-than', data=json.dumps({"version":"2.2.3"}),content_type='application/json')
    assert res.status_code == 200

    softwareList = res.json['softwares']
    assert len(softwareList) == 7
    assert softwareList[2]["name"] == "Angular"
    assert softwareList[2]["version"] == "8.1.13"


def test_post_bad_version(client):
    res = client.post('/software-gerater-than', data=json.dumps({"version":"2.blah.3"}),content_type='application/json')
    assert res.status_code == 400

    assert res.json['error-message'] == 'Failure parsing version group: 1 value was: blah'

def test_post_with_no_request_gives_400(client):
    res = client.post('/software-gerater-than')
    assert res.status_code == 400
    assert res.json['error-message'] == 'request body missing fields'
