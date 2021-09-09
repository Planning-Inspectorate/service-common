# pins-views

A collection of useful views and templates for creating web frontends for the Planning Inspectorate

## Installation

    npm i pins-views

In app.js or wherever configuring Nunjucks, add this line of code to viewPaths:

    path.join(__dirname, '..', 'node_modules', 'pins-views/views/')

### Example Output:

    const viewPaths = [
        path.join(__dirname, '..', 'node_modules', 'pins-views/views/'),
        path.join(__dirname, '..', 'node_modules', 'govuk-frontend'),
        path.join(__dirname, '..', 'node_modules', '@ministryofjustice', 'frontend'),
        path.join(__dirname, '..', 'node_modules', '@pins', 'common', 'src', 'frontend'),
    ];

    const env = nunjucks.configure(viewPaths, nunjucksConfig);
