const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // publicPath:'./',
  transpileDependencies: true,
  lintOnSave:false,//关闭语法检查
  // devServer:{
  //   proxy:'http://localhost:8088'
  // },
  chainWebpack: config => {
    config.externals({ './cptable': 'var cptable' })
    
  },
  configureWebpack: {
    resolve: { 
      fallback: { 
        fs: false
      },
    }
  }
  
})
