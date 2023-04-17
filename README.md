# Caspar Health

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.1.

## Development server

Run `yarn start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g c component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `yarn test` to execute the unit tests via [Karma](https://karma-runner.github.io).

It has 99.41% Statements and 97.5% Branch Code Covered in terms of Unit tests.

image.png

## Application Flow

Users will land on to Patiets List Page where they will see a table with the list of Patients and filters by Age, Gender, and Aplhabetical Sorting.

Users will be able to Search the list with the applied filters.

Users can click on the patient to see the details and land on to Patient Detail Page.

Patient Detail Page will have a card of Patient showing all the details and they will be abel to see a de;ete and a back button as well.

Back button will take you to Home page (Patients List Page).

Delete Button will open a Modal asking for confirmation with two options cancel and delete. If Cancel button is clicked noting will happen and if Delete button is clicked User will delete that Patient from the List and will be automatically naviagated to Home Page.

User will Be also able to see the detials of Patient is they directly land on to Patient Detail age or they do a Hard Reload on the detail page.

## CodeBase Structure

This Project has Patient-Details and Patients-List Component and has a shared folder for all the components and can be used across the application which can handle any data accordingly.

It has Utils Folder as well which has a helper logic specific to an operation and a globals file to maintain all the constants and enums.

It has a pipe folder as well which has pipe used for sorting on the list.

## Further Work

This project is made with a focus on how easy it is to extend functionalities within the codebase as there are some places where I had to go back to brute force method to make it happen. Suggestions are always welcome.

Can Implement Route Guard accordingly to ensure if Routing should take place or not with proper checks.
