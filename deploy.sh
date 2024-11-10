#!/bin/bash

# Deploy backend service
curl --request POST \
    --url "https://api.render.com/v1/services/$BACKEND_SERVICE_ID/deploys" \
    --header 'accept: application/json' \
    --header "authorization: Bearer $RENDER_API_KEY" \
    --header 'content-type: application/json' \
    --data '{"clearCache": "clear"}'

echo "Backend service deployment triggered"

# Deploy frontend service
curl --request POST \
    --url "https://api.render.com/v1/services/$FRONTEND_SERVICE_ID/deploys" \
    --header 'accept: application/json' \
    --header "authorization: Bearer $RENDER_API_KEY" \
    --header 'content-type: application/json' \
    --data '{"clearCache": "clear"}'

echo "Frontend service deployment triggered"
