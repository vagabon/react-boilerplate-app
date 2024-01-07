# @vagabond-ts/react-crud-mui

## Description

REACT CRUD MUI :

- v0.0.1

## Documentation

Npm : [@vagabond-ts/react-crud-mui](https://www.npmjs.com/package/@vagabond-ts/react-crud-mui)

Example : [LostArk Roster](https://lostark-roster.vagabond.synology.me/)

## libs

npm install @mui/material @emotion/react @emotion/styled
npm install @fontsource/roboto
npm install @mui/icons-material

npm install axios
npm install react-router-dom
npm install @reduxjs/toolkit react-redux
npm install react-i18next i18next i18next-browser-languagedetector
npm install formik yup
npm install sass

npm install --save-dev @testing-library/jest-dom @testing-library/react @testing-library/user-event
npm install --save-dev @jest/globals ts-jest
npm install redux-mock-store --save-dev

npm install -D jest-sonar-reporter sonarqube-scanner

npm install @react-oauth/google@latest
npm i --save @greatsumini/react-facebook-login

## MUI

https://mui.com/material-ui/getting-started/overview/

## Installation

TODO

```
npm install
```

# Storybook

TODO

```
npm run storybook
```

## Test

### TU

- testing-library : https://testing-library.com/docs/react-testing-library/intro/
- jest : https://jestjs.io/fr/

Exécution des tests unitaires :

```
npm run test
```

Exécution des tests unitaires avec la couverture :

```
npm run coverage
```

Exécution des tests unitaires avec la génération des fichiers pour Sonarqube :

```
npm run ci
```

- configuration de Sonarqube : /sonar-project.properties
- rapport : /coverage/test-report.xml

## Build

Génération du build :

```
npm run build:lib
```

- livrable : /dist

## Deploy

```
npm run publish
```
