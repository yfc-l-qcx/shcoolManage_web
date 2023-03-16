'use strict'
const merge = require('webpack-merge')
//以上我们将 生产环境 和 开发环境 做了细微区分，但是，请注意，我们还是会遵循不重复写配置的原则，
// 保留一个 "common( 公共 )" 配置。为了将这些配置合并在一起，
// 我们将使用一个名为 webpack-merge 的工具。此工具会引用 “common” 配置，
// 因此我们不必再在环境特定env的配置中编写重复代码

const prodEnv = require('./prod.env') //生产环境

//开发环境
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://localhost:8080"'
})