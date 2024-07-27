from flask_frozen import Freezer
from app import create_app

app = create_app()
app.config['FREEZER_BASE_URL'] = '.'  # Set the base URL for the freezer

freezer = Freezer(app)

if __name__ == '__main__':
    freezer.freeze()