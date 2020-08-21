<div align="center">
   <img height="256" src="./static/images/slashmacro_logo.png" alt="slash macro orange logo" />
   <h1>slashmacro backend</h1>
</div>

## Getting Started

### Prerequisites

- nodejs
- docker

### Installation

1. clone the repository
2. install `node_modules`
3. copy `.env.dist` to `.env`
```bash
cp .env.dist .env
```
4. start the docker container
```bash
docker-compose up -d
```
5. start the local development server
```bash
yarn dev
```