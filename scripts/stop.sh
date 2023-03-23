#!/usr/bin/env bash

PROJECT_ROOT="/home/ubuntu/app"
JAR_FILE="$PROJECT_ROOT/spring-webapp.jar"

DEPLOY_LOG="$PROJECT_ROOT/deploy.log"

TIME_NOW=$(date +%c)

# 파일 이름이 같은 현재 구동 중인 애플리케이션 pid 확인
CURRENT_PID=$(pgrep -f $JAR_FILE)

# 포트번호가 같은 현재 구동 중인 애플리케이션 pid 확인
CURRENT_PID_BY_PORT=$(lsof -t -i:8080)

# NginX 종료 
systemctl stop nginx

# 파일 명 기준 프로세스가 켜져 있으면 종료
if [ -z $CURRENT_PID ]; then
  echo "$TIME_NOW > 파일명 기준 현재 실행중인 애플리케이션이 없습니다" >> $DEPLOY_LOG
else
  echo "$TIME_NOW > =====실행중인 $CURRENT_PID 애플리케이션 종료===== " >> $DEPLOY_LOG
  kill -15 $CURRENT_PID
fi

# 포트번호 기준 프로세스가 켜져 있으면 종료
if [ -z $CURRENT_PID_BY_PORT ]; then
  echo "$TIME_NOW > 포트번호 기준 현재 사용중인 포트가 없습니다" >> $DEPLOY_LOG
else
  echo "$TIME_NOW > =====실행중인 $CURRENT_PID_BY_PORT 포트 종료===== " >> $DEPLOY_LOG
  kill -15 $CURRENT_PID_BY_PORT
fi
