import json
from VersionLookupApi.app.service.version_parser import parse_version
from VersionLookupApi.app.model.software import Software
#Loads a json file that represents a list of software and turns it into a list
#of software
def load_software_from_file(fileName):
    with open(fileName) as file:
        data = json.load(file)

        softwareList = []
        for softwareJsonLine in data:
            software = Software(softwareJsonLine['name'],
                parse_version(softwareJsonLine['version']))

            softwareList.append(software)

        return softwareList
