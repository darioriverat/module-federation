#!/bin/bash

npm install

# Check if FEDERATED_MODE is set to 'production'
if [ "$FEDERATED_MODE" = "production" ]; then
    echo "Starting in production mode..."
    npm run prod
else
    echo "Starting in development mode..."
    npm run dev
fi