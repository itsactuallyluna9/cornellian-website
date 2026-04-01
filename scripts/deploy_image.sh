#!/bin/bash
set -e

# Configuration
IMAGE_NAME="cornellian-website"
TAG="latest"
EXPORT_FILE="cornellian-website.tar"

# Check arguments
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <user@host>"
    echo "Example: $0 root@192.168.1.10"
    exit 1
fi

REMOTE=$1

echo "Build step 1: Building Docker image locally..."
# Use linux/amd64 platform if deploying to a standard Linux server from a Mac (Apple Silicon)
# Remove '--platform linux/amd64' if both machines have the same architecture
docker build --platform linux/amd64 -t $IMAGE_NAME:$TAG .

echo "Build step 2: Saving image to file (this may take a moment)..."
docker save $IMAGE_NAME:$TAG -o $EXPORT_FILE
echo "Image saved to $EXPORT_FILE"

echo "Deploy step 1: Transferring image to server..."
scp $EXPORT_FILE $REMOTE:/tmp/$EXPORT_FILE

echo "Deploy step 2: Transferring configuration files..."
scp docker-compose.yml Caddyfile $REMOTE:~/

echo "Deploy step 3: Loading image on server..."
ssh $REMOTE "docker load -i /tmp/$EXPORT_FILE && rm /tmp/$EXPORT_FILE"

echo "Deploy step 4: Stopping old containers..."
ssh $REMOTE "cd ~/ && (docker compose down 2>/dev/null || docker-compose down || true)"

echo "Deploy step 5: Starting new containers..."
ssh $REMOTE "cd ~/ && (docker compose up -d 2>/dev/null || docker-compose up -d)"

echo "Cleanup: Removing local artifact..."
rm $EXPORT_FILE

echo "Deployment complete!"
