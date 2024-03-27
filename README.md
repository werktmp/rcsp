# Rabobank Customer Statement Processor
The Rabobank Customer Statement Processor is a software designed to identify unsuccessful transaction entries. It supports two file formats for detecting failed records: CSV and XML. Upon processing, it generates an HTML report containing the identified failed records.

## How to setup for development
- Install nodejs version *v20.12.0 (LTS)*. Nodejs can be downloaded [here](https://nodejs.org/en/download).
- Install npm packages: ``npm run install``

## How to run the application
- To start the development server run this command: ``npm run dev``
- For run test run this command: ``npm run test``
- For running code check run this command: ``npm run lint``
- For building and testing an build crun this command: ``npm run build && npm run preview``

## Project structure
This project is initialized with vite. This is a build and develop tool for more information see: [vite](https://vitejs.dev/guide/)