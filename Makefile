#!make
include .env

.PHONY: database

database:
	docker compose exec mongo mongorestore --drop -d openfoodfacts -c products /openfoodfacts/dump/off/products.bson \
	--username ${MONGO_ROOT_USERNAME} \
	--password ${MONGO_ROOT_PASSWORD} \
	--authenticationDatabase admin
