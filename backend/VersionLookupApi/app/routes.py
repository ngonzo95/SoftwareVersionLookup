from flask import Flask, jsonify, request
from VersionLookupApi.app.service.file_loader import load_software_from_file
from VersionLookupApi.app.service.version_parser import parse_version
from VersionLookupApi.app.model.software import Software


def create_app():
    app = Flask(__name__)

    _softwareList = None
    try:
        _softwareList = load_software_from_file("./data/SoftwareList.json")
    except Exception as e:
        print("Failed to load the software from the file. Exception: "
              + str(e))

    @app.after_request
    def allow_cross_domain(response):
        """Hook to set up response headers."""
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Headers'] = 'content-type'
        return response

    @app.route('/software-gerater-than', methods=['POST'])
    def getSoftwareGreaterThan():

        # Ensure that the server has loaded the file correctly
        if(_softwareList == None):
            return jsonify({'error-message': 'Failed to load softwares from file'}), 500

        # Ensure that the request has given us the version
        req = request.json
        if not req or not 'version' in req:
            return jsonify({'error-message': 'request body missing fields'}), 400

        # Try to parse the version
        try:
            softwareVersion = Software("", parse_version(req['version']))
        except Exception as e:
            return jsonify({'error-message': str(e)}), 400

        # Create the happy path response.
        jsonList = []
        for software in _softwareList:
            if software > softwareVersion:
                jsonList.append(software.toJson())

        return jsonify({'softwares': jsonList}), 200

    return app
