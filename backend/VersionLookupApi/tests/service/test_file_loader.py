from VersionLookupApi.app.service.file_loader import load_software_from_file
from VersionLookupApi.app.model.software import Software
from VersionLookupApi.app.service.version_parser import ToManyVersionGroupsError
import pytest
#Todo find a way to not use a file location based on where the py test is run
TEST_FILE_LOCATION = "./data/TestList.json"
TEST_BAD_FILE_LOCATION = "./data/TestBadList.json"


def test_load_creates_correct_list_of_software():
    #arrange
    softwareList = []
    softwareList.append(Software("MS Word", (13,2,1)))
    softwareList.append(Software("MS Excel", (13,4,2)))
    softwareList.append(Software("AngularJS", (1,7,1)))
    softwareList.append(Software("Angular", (8,1,13)))

    assert load_software_from_file(TEST_FILE_LOCATION) == softwareList

def test_load_with_random_filename_raises_error():
    with pytest.raises(FileNotFoundError):
        load_software_from_file("some_random_location")

def test_load_with_bad_data_rasies_correct_exception():
    with pytest.raises(ToManyVersionGroupsError):
        load_software_from_file(TEST_BAD_FILE_LOCATION)
