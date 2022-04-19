const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/axios-vue/' // Thay tên repository của các bạn vào đây nhé
    : '/'
})
