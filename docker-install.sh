#!/bin/bash

# Check if Docker is installed
if ! [ -x "$(command -v docker)" ]; then
  echo "Docker is not installed. Installing Docker..."
  
  # Install Docker (you can choose a specific version or omit -y for interactive installation)
  sudo apt-get update
  sudo apt-get install -y docker.io
  
  # Add the current user to the docker group to run Docker without sudo
  sudo usermod -aG docker $USER

  # Start the Docker service
  sudo systemctl start docker
  sudo systemctl enable docker

  echo "Docker installation complete."
fi

exit 0
