from flask import Flask, render_template, send_from_directory
import mimetypes

# Application factory 
def create_app():
    
    # Init app
    app = Flask(__name__, instance_relative_config=False)

    with app.app_context():

        # Serve frontend - does not handle angular routing well 
        @app.route('/<path:path>', methods=['GET'])
        def static_proxy(path):
            return send_from_directory('./static/', path)

        @app.route("/", methods=['GET'])
        def root():
            return send_from_directory('./static/', 'index.html')

        mimetypes.add_type('application/javascript', '.js')
        mimetypes.add_type('text/css', '.css')

        return app
