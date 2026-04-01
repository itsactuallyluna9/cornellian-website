# Deployment Guide (DigitalOcean & Docker)

## Prerequisites
- A DigitalOcean Droplet (Ubuntu or Debian recommended)
- `ssh` access to your droplet
- `docker` installed on the droplet

## 1. Local Build & Push (Option A: Using Docker Hub / Registry)
If you have a container registry (like Docker Hub or GitHub Container Registry), build and push the image from your machine:

```bash
# Login to your registry (example for Docker Hub)
docker login

# Build the image (replace 'yourusername/cornellian-website' with your actual tag)
docker build -t yourusername/cornellian-website:latest .

# Push the image
docker push yourusername/cornellian-website:latest
```

Then, on your DigitalOcean Droplet:

```bash
# Pull and run
docker pull yourusername/cornellian-website:latest
docker run -d -p 80:80 --name cornellian-website yourusername/cornellian-website:latest
```

## 2. Direct Transfer & Build (Option B: No Registry)
If you don't want to use a registry, you can transfer the files to the server and build there.

**On your local machine:**
```bash
# Copy files to the server (exclude node_modules/dist via rsync)
rsync -av --exclude 'node_modules' --exclude 'dist' --exclude '.git' . root@<DROPLET_IP>:/opt/cornellian-website
```

**On the DigitalOcean Droplet:**
```bash
cd /opt/cornellian-website

# Build the image
docker build -t cornellian-website .

# Run the container
# This maps port 80 on the host to port 80 in the container
docker run -d --restart always -p 80:80 --name cornellian-website cornellian-website
```

## 3. Verify Deployment
Visit `http://<DROPLET_IP>` in your browser. You should see the site live.

## 4. Updates
To update the site:
1. `git pull` changes (or re-run `rsync`).
2. Re-run the `docker build ...` command.
3. Stop and remove the old container: `docker rm -f cornellian-website`.
4. Run the new container: `docker run ...`.
