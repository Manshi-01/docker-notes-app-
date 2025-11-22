#!/usr/bin/env bash
# Simple integration test for CRUD operations. Requires app running on localhost:5000
set -euo pipefail
BASE=http://localhost:5000


# create
CREATE=$(curl -s -X POST $BASE/notes -H 'Content-Type: application/json' -d '{"title":"test","body":"hello"}')
ID=$(echo $CREATE | jq -r '.id')
if [ -z "$ID" ] || [ "$ID" == "null" ]; then echo "create failed"; exit 1; fi


# read
curl -s $BASE/notes/$ID | jq .


# update
curl -s -X PUT $BASE/notes/$ID -H 'Content-Type: application/json' -d '{"title":"updated"}' | jq .


# delete
curl -s -X DELETE $BASE/notes/$ID -I


echo "CRUD test passed"