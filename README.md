# Nmap-Scanner

## Description

The app uses raw IP packets in novel ways to determine what hosts are available on the network, 
what services (application name and version) those hosts are offering, what operating systems 
(and OS versions) they are running, what type of packet filters/firewalls are in use,
and dozens of other characteristics.

## Installation

#### To run this app, Node.js v12 or higher must be installed on your system.

1. Download and Install [Node.js](https://nodejs.org/en)
2. Clone the project from GitHub
3. Install all packages and dependencies

```bash
# Install nmap
  sudo apt install nmap 
# Install libcap
  sudo apt-get install libcap2-bin
# Set Nmap capabilities
  sudo setcap cap_net_raw,cap_net_admin,cap_net_bind_service+eip $(which nmap)
  getcap $(which nmap)
# Install npm package
  npm install
```
4. Make a copy of the `env.sample` file in the root folder, remove `.sample` extension from the file: `.env.sample -> .env`
3. Set values for all environment variables in `.env` depending on your system and configurations.
## Running the app

#### To run the app run the commands mentioned below

```bash
# First run command
  nest start

# development
  npm run start

# watch mode
  npm run start:dev

# production mode
  npm run start:prod
```

## Testing the app

#### To test the app run the commands mentioned below

```bash
# unit tests
  npm run test

# e2e tests
  npm run test:e2e

# test coverage
  npm run test:cov
```
