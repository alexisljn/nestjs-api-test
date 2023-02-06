# nestjs-api-test

This project is a technical test where I had to use nestjs to build a light API 
to query a mongodb Open food facts dump.

## Instructions

#### Prerequisites

- Docker
- Make
- MongoDB dump
- Environment variables

#### Mongo DB Dump

- Download MongoDB dump of open food facts [here](https://static.openfoodfacts.org/data/openfoodfacts-mongodbdump.tar.gz)
- Unzip the `dump/` folder from the archive inside `openfoodfacts/` 
project's folder

#### Environment variables

- Copy `api/.env.default` into `api/.env`
- Fill properly values

### Start project

- `make up`
- `make database` *(When database container is up, the import will take several minutes)*

### Application logs

- `make app-logs`

### Shutdown

- `make down`

### API Documentation

The API documentation is available at http://localhost:3000/docs

##### Améliorations

La validation de la query string aurait surement pu passer par un pipe mais il 
m'aurait fallu un peu plus de temps pour investiguer en détail leur fonctionnement.

Les schemas sont aussi basiquement définis pour le bien de l'exercice mais
une déclaration plus précise rendrait la doc de l'API plus pertinente.

De manière générale le framework permet et promet un niveau de découplage et
de réusabilité très élevé, il faut donc le maitriser pour pouvoir en tirer tous
les bénéfices.