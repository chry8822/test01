const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
// html-webpack-plugin 은 html을 읽어서 빌드할수 있게 해준다.
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin")

module.exports = {
    // entry는 웹팩이 빌드할 파일을 알려주는 역할
    entry: "./src/index.js",
    // 웹팩에서 빌드를 완료하면 output에 명시되어 있는 정보를 통해 빌드 파일을 생성
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname + "/build")
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '/build'),
          },
          compress: true,
          port: 9000,
      },
    mode: "development",
    // mode는 웹팩 빌드 옵션,
    // production 은 최적화 빌드 , development 는 빠를게 빌드, none 아무 기능 없이 웹팩 빌드
    module:{
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: "/node_modules",
                use: ['babel-loader'],
            },
            {
                test: /\.html$/,
                use: [
                    {
                      loader: "html-loader",
                      options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.css$/,
                // use의 loader 는 오른쪽에서 왼쪽으로 실행 된다 
                // css-loader로 파일을 읽고 Mini로 css 파일을 추출
                use:[ MiniCssExtractPlugin.loader,'css-loader']
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader,'css-loader','sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            // public/index.html 을 읽는다,
            template : "./public/index.html" ,
            // output 으로 출력할 이름은 index.html
            filename:"index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "style-test.css"
        }),
        new CleanWebpackPlugin()
    ]
}

