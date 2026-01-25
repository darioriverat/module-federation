# Module Federation Production Setup

This setup allows you to run your module federation apps in both development and production modes.

## Development Mode (Default)

```bash
# Start all apps in development mode
make run
# or
docker compose up -d --build
```

**Development URLs:**
- Host App: http://localhost:5180
- App One: http://localhost:5181  
- App Two: http://localhost:5182

## Production Mode

```bash
# Start all apps in production mode
make run-prod
# or
FEDERATED_MODE=production docker compose up -d --build
```

**Production URLs:**
- Host App: http://localhost:5280
- App One: http://localhost:5281
- App Two: http://localhost:5282

## How it Works

### Development Mode
- Uses Vite dev server with hot module replacement
- Serves source files directly
- Module federation loads modules from dev server

### Production Mode
1. Runs `npm run build` to compile assets
2. Uses `serve` package to serve built assets from `dist/` folder
3. Module federation loads compiled federated modules
4. Optimized and minified assets

## Architecture

```
Development:
Host (5180) -> App One (5181/src/main.js)
Host (5180) -> App Two (5182/src/main.js)

Production:
Host (5280) -> App One (5281/assets/one.js)
Host (5280) -> App Two (5282/assets/two.js)
```

## Commands

```bash
# Development mode
make run

# Production mode  
make run-prod

# Stop all containers
make stop

# View logs
make logs

# Manual container commands
docker compose up -d --build                    # Dev mode
FEDERATED_MODE=production docker compose up -d  # Prod mode
```

## Notes

- Development mode is the default behavior
- Production builds are created fresh each time containers start
- Both modes can run simultaneously on different ports
- The `serve` package is used as a lightweight static file server for production assets
