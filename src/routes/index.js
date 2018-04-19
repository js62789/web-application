export default function(router) {
  router.get('*', function renderPage(req, res, next) {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${req.config.get('title')}</title>
        </head>
        <body>
          <div id="app"></div>
          <script src="/vendor.bundle.js"></script>
          <script src="/client.bundle.js"></script>
        </body>
      </html>
  `);
  });
}
