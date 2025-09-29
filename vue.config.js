const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  publicPath: process.env.VUE_APP_BASE_URL || '/',
  lintOnSave: false,
  transpileDependencies: true,
  
  devServer: {
    port: 3003
  }
});