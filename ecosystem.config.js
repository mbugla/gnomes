module.exports = {
    apps : [{
      name: "gnomes app",
      script: "./src/app.js",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }]
  }