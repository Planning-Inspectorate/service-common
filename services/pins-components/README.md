# pins-components

A collection of useful components for creating web frontends for the Planning Inspectorate

## Installation

    npm i pins-components

In app.js or wherever configuring Nunjucks, add this line of code to viewPaths:

    path.join(__dirname, '..', 'node_modules', 'pins-components')

### Example Output:

    const viewPaths = [
        path.join(__dirname, '..', 'node_modules', 'govuk-frontend'),
        path.join(__dirname, '..', 'node_modules', '@ministryofjustice', 'frontend'),
        path.join(__dirname, 'views'),
        path.join(__dirname, '..', 'node_modules', 'pins-components'),
    ];

    const env = nunjucks.configure(viewPaths, nunjucksConfig);
