include .env

.PHONY: run-dev

run-dev:
	@echo "---- Running Database: Tauria develop ----"
	@docker-compose -f docker-compose.dev.yml down
	@docker-compose -f docker-compose.dev.yml up -d

.PHONY: run-test

run-test:
	@echo "---- Running Database: Tauria test ----"
	@docker-compose -f docker-compose.test.yml down
	@docker-compose -f docker-compose.test.yml up -d


.PHONY: stop-dev

stop-dev:
	@echo "---- Stoping Database: Tauria develop ----"
	@docker-compose -f docker-compose.dev.yml down

.PHONY: stop-test

stop-test:
	@echo "---- Stoping Database: Tauria develop ----"
	@docker-compose -f docker-compose.test.yml down