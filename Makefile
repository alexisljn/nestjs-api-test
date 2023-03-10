#!make
include api/.env

.PHONY: app-logs database down up

app-logs:
	docker compose --env-file api/.env logs -f nest

database:
	docker compose --env-file api/.env exec mongo mongorestore --drop -d ${MONGO_APP_DATABASE} -c products /openfoodfacts/dump/off/products.bson \
	--username ${MONGO_ROOT_USERNAME} \
	--password ${MONGO_ROOT_PASSWORD} \
	--authenticationDatabase admin

down:
	docker compose --env-file api/.env down

up:
	docker compose --env-file api/.env up