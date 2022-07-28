#!/bin/sh
>&2 echo "Starting server..."
yarn typeorm:migration:run
echo $MODE
yarn start:$MODE