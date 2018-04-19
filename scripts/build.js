let WebApplication;

if (process.env.NODE_ENV === 'production') {
  WebApplication = require('../build').WebApplication;
} else {
  WebApplication = require('../src').WebApplication;
}

const app = new WebApplication();

app.compile().then(stats => {
  console.log('Compile complete');
});
