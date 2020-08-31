#!/bin/sh

# $1 DB_AUDIT_SCHEMA
# $2 DB_HOST
# $3 DB_MAIN_SCHEMA
# $4 DB_NAME
# $5 DB_PASSWORD
# $6 DB_PORT
# $7 DB_USERNAME
# $8 SERVER_PORT

ecs_task_definition_base_file="ecs-task-definition-base.json"
ecs_task_definition_file="ecs-task-definition.json"

cp $ecs_task_definition_base_file $ecs_task_definition_file

sed -i '' "s/<DB_AUDIT_SCHEMA>/$1/g" $ecs_task_definition_file
sed -i '' "s/<DB_HOST>/$2/g" $ecs_task_definition_file
sed -i '' "s/<DB_MAIN_SCHEMA>/$3/g" $ecs_task_definition_file
sed -i '' "s/<DB_NAME>/$4/g" $ecs_task_definition_file
sed -i '' "s/<DB_PASSWORD>/$5/g" $ecs_task_definition_file
sed -i '' "s/<DB_PORT>/$6/g" $ecs_task_definition_file
sed -i '' "s/<DB_USERNAME>/$7/g" $ecs_task_definition_file
sed -i '' "s/<SERVER_PORT>/$8/g" $ecs_task_definition_file
