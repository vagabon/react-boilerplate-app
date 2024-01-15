@vagabond-inc/react-boilerplate-app

## Documentation

React Boilerplate Material Design :

- A boilerplate based on React 18 with Material Design (@vagabond-inc/react-boilerplate-md / Mui) and Auth / Custom modules (Back Office on quarkus)
- [storyBook](https://vagabond.synology.me/react-boilerplate-app)
- Npm : [@vagabond-inc/react-boilerplate-app](https://www.npmjs.com/package/@vagabond-inc/react-boilerplate-app)
- Github : [https://github.com/vagabon/react-boilerplate-app](https://github.com/vagabon/react-boilerplate-app)
- Example : [Vagabond Blog & Tools](https://blog.vagabond.synology.me/)

## Technical stack

- Node >= 18.16.0, npm >= 9.5.1

- React :

  - react: ~18.2.0
  - react-dom: ~18.2.0

- @vagabond-inc/react-boilerplate-md: 0.0.24

- Redux :

  - react-redux: ~9.0.4
  - @reduxjs/toolkit: ~2.0.1

- Axios : ~1.6.2

- Form :

  - formik: ~2.4.5
  - yup: ~1.3.3

- Auth :

  - @react-oauth/google: ~0.12.1
  - @greatsumini/react-facebook-login: ~3.3.3

- Test :
  - @babel/preset-env: ~7.23.3
  - @babel/preset-react: ~7.23.3
  - @babel/preset-typescript: ~7.23.3
  - babel-jest: ~29.7.0
  - jest: ~29.7.0
  - jest-environment-jsdom: ~29.7.0

## Installation

```
npm install
```

# Storybook

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
npm run build
```

- livrable : /dist

## Deploy

```
npm run publish
```
