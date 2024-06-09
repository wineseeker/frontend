#!/bin/bash

# 사용할 프로세스 이름
PROCESS_NAME="wine-seeker-frontend"

# 프로세스가 실행 중인지 확인
if pm2 list | grep -q "$PROCESS_NAME"; then
    # 프로세스가 실행 중일 경우
    echo "$PROCESS_NAME is running. Restarting..."
    NODE_ENV=production pm2 restart "$PROCESS_NAME" --update-env
else
    # 프로세스가 실행 중이지 않을 경우
    echo "$PROCESS_NAME is not running. Starting..."
    NODE_ENV=production pm2 start "pnpm run start" --name "$PROCESS_NAME"
fi