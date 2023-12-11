# Setting Up Project
Begin by installing Python 3.12, pip and node.js onto your computer

Once you have your Python development environment ready, clone this repository.

Then open 2 terminals and navigate to website and frontend folders

On the frontend terminal run npm install

On website terminal run:
pip install pipenv
pipenv shell
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

then on frontend terminal run npm start
