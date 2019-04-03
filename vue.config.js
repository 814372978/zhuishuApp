// let api='https://novel.juhe.im/categories'
module.exports = {
    configureWebpack: {
        devServer: {
            proxy: {

                "/api": {
                    target: "https://novel.juhe.im",
                    pathRewrite: {"^/api": ""},
                    changeOrigin: true
                }


            }
        }
    }
}
