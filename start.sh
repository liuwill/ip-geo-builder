#!/bin/bash
env_str=""
env_line=""

for line in $(cat .env)
do
  if [ -z "$env_str" ];then
    env_str="export $line "
  else
    env_str="$env_str && export $line "
  fi
  env_line="$env_line$line "

  if [ -n "$line" ];then
    export "$line"
  fi
done

# source .env

if [ ! -n "$env_str" ]; then
  echo "环境变量加载失败"
  exit 1
fi

if [ ! -n "$BASE_RESOURCE_PATH" ]; then
  echo "环境变量加载失败"
  exit 1
fi

if [ ! -f "server.js" ]; then
  echo "服务器代码不存在"
  exit 1
fi

command="node server.js"
echo "$command"
$command
