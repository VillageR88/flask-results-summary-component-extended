# Flask Python Template

This is a template for a Flask Python application.

## Description

A basic template for starting a Flask Python project. This template includes the necessary setup for a Flask application and uses `python-dotenv` for environment variable management.

## Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/yourusername/flask-python-template.git
   cd flask-python-template
   ```

   **Note:** If you already have a previous version of the repository cloned, make sure to delete the old folder before cloning the new one.

   Alternatively, you can clone the repository without the `.git` folder by using the following command:

   ```sh
   git clone --depth=1 https://github.com/yourusername/flask-python-template.git
   ```

2. **Create a virtual environment**:

   - On macOS/Linux:

     ```sh
     python3 -m venv venv
     source venv/bin/activate
     ```

   - On Windows:

     ```sh
     python -m venv venv
     .\venv\Scripts\activate
     ```

3. **Install the dependencies**:

   ```sh
    pip install -r requirements.txt
    ```

4. **Run the application**:

   ```sh
    flask run
    ```
