const path = require("path"); // 파일 경로 알려주는 함수(패키지)
// import path from "path"
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");// CSS 가지고 뭘 어떻게 할지 알려줄 수 있음.

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ["@babel/polyfill",ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [
      {
          test:/\.(js)$/,
          use:[
            {
              loader:"babel-loader"
            }
          ]
      },
      {
        test: /\.(scss)$/, // 이 plugin 사용하라고 알려줌. regular expression 방식 파일형식
        use:[
          // 파일을 어떻게 css로 바꿀지 설정
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            // css 이해시키는 부분 적고, (ex)Sass)파일 다루는 부분 적어야함 그 다음 추출.
            loader: "css-loader", //CSS를 이해할 수 있도록 가르침 3
          },
          {
            loader: "postcss-loader", // 얘한테 주는 plugin을 가지고 CSS로 변환, 특정 plugin 들을 css에 대해 실행시킴 2
            options: {
              postcssOptions: {
                plugins: [        
                  [
                    "autoprefixer",
                    {
                     // browsers: "cover 99.5%", // 웹과 99.5퍼 호환 시켜주는 옵션
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: "sass-loader", // Sass or SCSS 받아서 css로 바꿔줄 수 있음 1
          },
        ],
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "styles.css"
    }),
  ]
};

module.exports = config;
