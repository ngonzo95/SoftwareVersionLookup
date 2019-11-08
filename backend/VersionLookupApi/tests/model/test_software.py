from VersionLookupApi.app.model.software import Software
from random import randint
def test_construtor_accepts_a_name_and_version_tuple():
    software = Software("name", (1,2,4))
    assert software.name == "name"
    assert software.majorVersion == 1
    assert software.minorVersion == 2
    assert software.patch == 4

def test_gt_compares_by_fist_looking_at_Major_then_Minor_then_Patch():
    assert Software("a", (1,randint(0,100),randint(0,100))) > Software("b", (0,randint(0,100),randint(0,100)))
    assert Software("a", (1,12,randint(0,100))) > Software("b", (1,11,randint(0,100)))
    assert Software("a", (5,7,12)) > Software("b", (5,7,2))

    #Just to make sure it is not always returning true
    assert not Software("a", (5,7,4)) > Software("b", (5,7,18))

def test_gt_when_equal_returns_false():
    assert not Software("a", (5,7,1)) > Software("b", (5,7,1))

def test_eq():
    assert Software("a", (5,7,1)) == Software("a", (5,7,1))
    assert not Software("a", (6,7,1)) == Software("a", (5,7,1))
    assert not Software("a", (5,7,1)) == Software("b", (5,7,1))
    assert not Software("a", (5,7,1)) == Software("a", (5,3,1))
    assert not Software("a", (5,7,1)) == Software("a", (5,7,6))
