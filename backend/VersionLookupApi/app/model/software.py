class Software:
        def __init__(self, name, versionTuple):
            self.name = name
            self.majorVersion = versionTuple[0]
            self.minorVersion = versionTuple[1]
            self.patch = versionTuple[2]

        def __gt__(self, other):
            if(self.majorVersion != other.majorVersion):
                return self.majorVersion > other.majorVersion

            if(self.minorVersion != other.minorVersion):
                return self.minorVersion > other.minorVersion

            return self.patch > other.patch

        def __eq__(self, other):
            return (self.name == other.name and
                   self.majorVersion == other.majorVersion and
                   self.minorVersion == other.minorVersion and
                   self.patch == other.patch)
