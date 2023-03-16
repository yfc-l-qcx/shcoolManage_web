const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  // publicPath:'./',
  transpileDependencies: true,
  lintOnSave:false,//关闭语法检查
  devServer:{
    proxy:'http://localhost:8088'
  },
  chainWebpack: config => {
    config.externals({ './cptable': 'var cptable' })
    config.module
        .rule('ssvg')
        .exclude.add(path.resolve(__dirname, './src/icons'))

    config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(path.resolve(__dirname, './src/icons'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({symbolId: 'icon-[name'})
        .end()
        .use('svgo-loader')
        .loader('svgo-loader')
  },
  configureWebpack: {
    resolve: { 
      fallback: { 
        fs: false
      },
    }
  }
  
})
