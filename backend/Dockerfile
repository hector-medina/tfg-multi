
# Use an official Python runtime as the base image
FROM python:3.13.0a1-bullseye

# Set the working directory in the container
WORKDIR /srv

# Copy the application code into the container
COPY . .

# Install the Python dependencies
RUN pip install --no-cache-dir -r /srv/app/requirements.txt

# Set the command to run the application
CMD [ "python", "/srv/app/manage.py", "runserver", "0.0.0.0:8080" ]

EXPOSE 8080