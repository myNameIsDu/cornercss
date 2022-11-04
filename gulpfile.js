const fs = require("fs");
const { series, src, dest } = require("gulp");
const replace = require("gulp-replace");
const del = require("del");
const rev = require("gulp-rev");
const oss = require("gulp-aliyun-oss");
const postcss = require("gulp-postcss");
const postcssPresetEnv = require("postcss-preset-env");
const terser = require("gulp-terser");
const cssnano = require("cssnano");
const babel = require("gulp-babel");

async function clean() {
  await del("assets/**");
}

function copySvf() {
  return src("./src/*.svg").pipe(dest("./assets"));
}
function uploadOss() {
  var options = {
    accessKeyId: process.env.ACCESSKEYID,
    accessKeySecret: process.env.ACCESSKEYSECRET,
    bucket: "duimags",
    prefix: "cornerCss/",
    ossOpt: {
      headers: {
        "Cache-Control": "no-cache",
      },
    },
  };

  return src("./assets/*").pipe(oss(options));
}

function buildJs() {
  return src("./src/index.js")
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(terser())
    .pipe(rev())
    .pipe(dest("./assets"));
}
function buildCss() {
  const plugins = [postcssPresetEnv(), cssnano()];

  return src("./src/index.css")
    .pipe(
      replace(
        /\.\/([a-z]*\.svg)/g,
        "https://resource.sunbohao.com/cornerCss/$1"
      )
    )
    .pipe(postcss(plugins))
    .pipe(rev())
    .pipe(dest("./assets"));
}

function changeReadmeCDNHash(cb) {
  const jsHash = fs
    .readdirSync("./assets")
    .find((item) => item.includes(".js"));
  const cssHash = fs
    .readdirSync("./assets")
    .find((item) => item.includes(".css"));
  return src("./README.md")
    .pipe(
      replace(
        /https:\/\/resource\.sunbohao\.com\/cornerCss\/index-[a-z0-9]*.js/g,
        `https://resource.sunbohao.com/cornerCss/${jsHash}`
      )
    )
    .pipe(
      replace(
        /https:\/\/resource\.sunbohao\.com\/cornerCss\/index-[a-z0-9]*\.css/g,
        `https://resource.sunbohao.com/cornerCss/${cssHash}`
      )
    )
    .pipe(dest("./"));
}

exports.cdn = series(
  clean,
  buildCss,
  buildJs,
  copySvf,
  uploadOss,
  changeReadmeCDNHash
);
