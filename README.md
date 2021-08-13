# service-common

## About

This repository is for sharing code between PINS projects.

It was originally set up to provide shared functionality between appeal-planning-service, back-office, and any subsequent services.

Each service is an NPM package.

## Installation

From root run: 
<pre><code>npm i</code></pre>
From each service root run: 
<pre><code>npm i</code></pre>

TODO - Write makefile to install all services

## Use

### Committing

The packages for committing (Commitizen and Husky) are part of the service-common package.json. Therefore, run commits from root. Use:
<pre><code>npm run commit</code></pre>

### Linting, testing, logging, and prettifying

...are all part of each individual service package.json

### Creating a new service

1. Create a new directory in the services folder
2. Copy the contents of ~/default-common-files/ to the new directory
3. Change the name of default-package.json to package.json
4. In the new package.json, populate fields: name, description, repository: url, author
5. Add keywords as necessary
6. Make sure you use index.js as your entrypoint
7. Add service src code
8. TODO - Add instructions for adding package to npm
