from VersionLookupApi.app.service.version_parser import (parse_version,
ToManyVersionGroupsError, VersionsMustBePositiveError, FailureParsingVersionGroup)
import pytest
def test_defaults_version_to_zero():
    (mj, mn, patch) = parse_version("")
    assert mj == 0
    assert mn == 0
    assert patch == 0

def test_parses_an_idealy_formatted_version_string():
    (mj, mn, patch) = parse_version("12.120.43")
    assert mj == 12
    assert mn == 120
    assert patch == 43

def test_parses_a_string_with_only_one_decimal():
    (mj, mn, patch) = parse_version("8.1")
    assert mj == 8
    assert mn == 1
    assert patch == 0

def test_parses_a_string_with_no_decimal():
    (mj, mn, patch) = parse_version("2")
    assert mj == 2
    assert mn == 0
    assert patch == 0

def test_parse_throw_exception_if_more_than_three_decimals_provided():
    with pytest.raises(ToManyVersionGroupsError, match=r".* 1.1.1.1 .*"):
        parse_version("1.1.1.1")

def test_throws_exception_if_it_gets_a_negitive_version():
    with pytest.raises(VersionsMustBePositiveError, match=r".*The version: -1 in group number 1 is negitive.*"):
        parse_version("1.-1.2")

def test_throws_exception_if_it_gets_a_negitive_version():
    with pytest.raises(FailureParsingVersionGroup, match=r"Failure parsing version group: 2 value was: blah"):
        parse_version("1.2.blah")
