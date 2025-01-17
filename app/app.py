from flask import Flask, render_template, send_from_directory

def create_app():
    app = Flask(__name__)

    @app.route('/')
    def index():
        context = {
            'siteTitle': "Results summary component extended",
            'audit': [{'val': 'PLT', 'src': 'static/images/timer_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'}, 
                      {'val': 'TTFB', 'src': 'static/images/line_start_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'}, 
                      {'val': 'DCL', 'src': 'static/images/code_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'}, 
                      {'val': 'FCP', 'src': 'static/images/palette_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'}]}
        return render_template('index.html', **context)

    @app.route('/robots.txt')
    def robots_txt():
        try:
            return send_from_directory(app.static_folder, 'robots.txt')
        except FileNotFoundError:
            logging.error("robots.txt not found")
            return "robots.txt not found", 404

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
    
    
