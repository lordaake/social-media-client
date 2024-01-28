# CSS Frameworks CA - Noroff School of Technology and Digital Media

Welcome to the CSS Frameworks CA project, part of Noroff School of Technology and Digital Media's curriculum. This project focuses on Front-End Development and aims to enhance an existing application's quality through improved development workflows and testing strategies.

## Table of Contents

- [Configuration](#configuration)
  - [Prettier](#prettier)
  - [ESlint](#eslint)
  - [Husky](#husky)
  - [Jest](#jest)
  - [Cypress](#cypress)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running Tests](#running-tests)

## Configuration

### Prettier

Prettier is our code formatting tool, ensuring consistent code style automatically. It saves time on manual formatting and enhances code readability.

### ESlint

ESlint enforces coding standards, detects errors early, and maintains high code quality, promoting consistency and collaboration in JavaScript development.

### Husky

Husky automates pre-commit hooks, ensuring code quality checks before each commit, and maintaining code integrity.

### Jest

Jest is our unit testing framework, used for testing individual code units, including critical functions like login and logout. It helps detect bugs early and ensures code reliability.

### Cypress

Cypress is used for end-to-end (E2E) testing, validating the entire application workflow, including login and logout processes, to ensure a seamless user experience.

## Getting Started

### Installation

To begin, follow these steps:

1. Clone the repository:
   gh repo clone "https://github.com/lordaake/social-media-client"

2. Initialize Git:
   git init

3. Install project dependencies:
   npm run prepare

### Running Tests

We provide options for running tests:

- To run Jest unit tests:
  npm run test

- To open the Cypress testing interface:
  npm run cypress:open

- To run Cypress tests headlessly:
  npm run cypress:run

Feel free to explore, contribute, and improve our project's development workflows and testing strategies. Happy coding!

