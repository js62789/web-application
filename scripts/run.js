let WebApplication;

if (process.env.NODE_ENV === 'production') {
  WebApplication = require('../build').WebApplication;
} else {
  WebApplication = require('../src').WebApplication;
}

const app = new WebApplication();

app.start().then(() => {
  console.log(`Listening on port ${app.config.get('port')}`);
});
