var express = require('express');
var app = express();

app.use('/', require('./routes'));

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port ' + (process.env.PORT || 3000));
});
