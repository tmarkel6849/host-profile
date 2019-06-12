# Project Name

> Project description
System design for optimizing server response for requests per second while retrieving data from a heavily seeded database.

## Related Projects

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions
* Development
1. run 'npm install' for dependencies
2. Create an .env file that will contain your postgres login credentials, and the the server port you want to use
- See below:
```
PORT=<Port number here>
PSQL_USER=''
PSQL_HOST=''
PSQL_PASSWORD=''
```
3. In the package.json, add your username to the 'psql-setup' script
- See below:
```
"psql-setup": "psql -d postgres -U <SUPER USER HERE> -f ./SDCpostgreSQL/schema.sql"
```
4. run script 'psql-setup' to setup the database
5. Navigate to the /SDCpostgreSQL/seeds folder
  - In each of the seeds uncomment the function invocation at the end of the file, and run the file with node.  After running the script make sure to comment out the function invokation to ensure extra seeding won't take place.
6. run script 'react-dev' to startup webpack
7. run script 'start-sdc' to startup the server

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 10.15.3
- etc

## Development

- run script: psql-setup
- run script: react-dev
- run script: start-sdc

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```