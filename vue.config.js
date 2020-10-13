module.exports = {
    devServer: {
      port: 8080, // 端口号，如果端口号被占用，会自动加1
      host: "localhost", //主机名， 127.0.0.1，  真机 0.0.0.0
      https: false, //协议
      open: true, //启动服务时自动打开浏览器访问
      proxy: {
        "/Api": {
          // 测试环境
          target: "http://localhost:3000",
          changeOrigin: true,
          pathRewrite: {
            "^/Api": ""
          }
        }
      }
    }
  };