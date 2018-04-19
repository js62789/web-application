import renderClient from './client/render';

renderClient();

if (module.hot) {
  module.hot.accept('./client/render', function() {
    const renderClient = require('./client/render').default;
    renderClient();
  });
}
