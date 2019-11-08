#Parse the version of a version string
#Example of a string 1.2.32
def parse_version(versionString):
    #default versions to zero
    majorVersion = 0
    minorVersion = 0
    patch = 0

    #Seperate each version
    versionGroups = versionString.split(".")

    if len(versionGroups) > 3:
        raise ToManyVersionGroupsError("The given version: " + versionString +
         " has more than three versions groups.")

    if versionGroups[0]:
        majorVersion = _convert_group_string_to_version_number(versionGroups, 0)
    if len(versionGroups) > 1:
        minorVersion = _convert_group_string_to_version_number(versionGroups, 1)
    if len(versionGroups) > 2:
        patch = _convert_group_string_to_version_number(versionGroups, 2)

    return (majorVersion, minorVersion, patch)


#Helper method for extracting versions from strings
def _convert_group_string_to_version_number(versionGroups, groupNumber):
    try:
        version = int(versionGroups[groupNumber])
    except ValueError:
        raise FailureParsingVersionGroup("Failure parsing version group: " +
         str(groupNumber) + " value was: " + versionGroups[groupNumber])
    if version < 0:
        raise VersionsMustBePositiveError("The version: " + str(version) +
         " in group number " + str(groupNumber) + " is negitive.")

    return version


class ToManyVersionGroupsError(Exception):
    pass

class VersionsMustBePositiveError(Exception):
    pass

class FailureParsingVersionGroup(Exception):
    pass
