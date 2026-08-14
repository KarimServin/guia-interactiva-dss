module.exports = {
  apps: [
    {
      name: 'dss-guia',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3005', // Runs on port 3005 to avoid conflicts
      instances: 'max',      // Utilizes all CPU cores for cluster mode high performance
      exec_mode: 'cluster',  // Runs in cluster mode for zero-downtime reloads
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      }
    }
  ]
};
