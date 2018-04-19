import styles from './styles/main.css';

export default async function renderClient() {
  const response = await fetch('/health');
  const { healthy: isHealthy } = await response.json();

  const html = `
    <center class="${styles.healthStatus}">
      <h1>React Application</h1>
      <h2>Your application is ${isHealthy ? '' : 'not'} healthy</h2>
    </center>
  `;

  document.getElementById('app').innerHTML = html;
}
