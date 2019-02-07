function isRequired() {
  throw new Error('parameter bodyContent is required :p');
}

// Render a template with a structure of basic HTML 5
function baseTemplate(bodyContent = isRequired()) {
  return `
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>▲Chat</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="serverless auth">
    </head>
    <body>
        ${bodyContent}
    </body>
</html>`;
}

module.exports = baseTemplate;
