export default async function renderClient() {
  const response = await fetch('/health');
  const { healthy: isHealthy } = await response.json();

  const html = `
    <center>
      <h1>React Application</h1>
      <h2>Your application is ${isHealthy ? '' : 'not'} healthy</h2>
    </center>
  `;

  document.getElementById('app').innerHTML = html;
}
