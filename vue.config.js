module.exports = {
  lintOnSave: false,
  configureWebpack: {
    devServer: {
      headers:          { 'Access-Control-Allow-Origin': '*' },
      https:            false,
      disableHostCheck: true
    }
  }  
}
