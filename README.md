# Valet.finance Website Docker Setup

## Quick Start

### Option 1: Using Docker Compose (Recommended)
```bash
# Build and run the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

### Option 2: Using Docker directly
```bash
# Build the image
docker build -t valet-website .

# Run the container
docker run -d -p 80:80 --name valet-website valet-website

# View logs
docker logs valet-website

# Stop and remove the container
docker stop valet-website
docker rm valet-website
```

## File Structure
Make sure your project has these files:
```
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── .dockerignore
├── index.html
├── styles.css
├── images/
│   ├── Valet_logo.svg
│   ├── index.jpg
│   ├── index1.jpg
│   └── ...
└── top_nav/
    ├── features/
    └── user_guide/
```

## Accessing the Website
- Local development: http://localhost
- Production: Configure your domain to point to the server

## Production Considerations

### SSL/HTTPS Setup
For production, you'll want to add SSL. You can:
1. Use a reverse proxy like Cloudflare
2. Add nginx-proxy with Let's Encrypt (uncomment lines in docker-compose.yml)
3. Use a load balancer with SSL termination

### Environment Variables
```bash
# Set custom port
docker run -d -p 8080:80 --name valet-website valet-website
```

### Health Checks
The docker-compose.yml includes a health check that ensures nginx is responding.

### Building for Different Architectures
```bash
# Build for ARM64 (Apple Silicon, ARM servers)
docker buildx build --platform linux/arm64 -t valet-website .

# Build for multiple architectures
docker buildx build --platform linux/amd64,linux/arm64 -t valet-website .
```

## Troubleshooting

### Check if container is running
```bash
docker ps
```

### View container logs
```bash
docker logs valet-website
```

### Access container shell
```bash
docker exec -it valet-website sh
```

### Check nginx configuration
```bash
docker exec valet-website nginx -t
```

## Customization

### Custom nginx.conf
The provided nginx.conf includes:
- Gzip compression
- Static asset caching
- Security headers
- Clean URL handling
- 404 error handling

### Performance Optimizations
- Gzip compression is enabled for text files
- Static assets are cached for 1 year
- Uses nginx:alpine for smaller image size

### Security Features
- X-Frame-Options header
- X-Content-Type-Options header
- X-XSS-Protection header