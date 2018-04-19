import renderClient from './renderClient';

renderClient();

if (module.hot) {
  module.hot.accept('./renderClient', function() {
    const renderClient = require('./renderClient').default;
    renderClient();
  });
}
