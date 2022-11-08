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
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const merge = require("merge2");

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

function buildCdnJs() {
  const tsResult = src("./src/index.ts").pipe(tsProject());
  return merge([
    tsResult.dts.pipe(dest("./assets")),
    tsResult.js.pipe(terser()).pipe(rev()).pipe(dest("./assets")),
  ]);
}
function buildReleaseJs() {
  const tsResult = src("./src/index.ts").pipe(tsProject());
  return merge([
    tsResult.dts.pipe(dest("./assets")),
    tsResult.js.pipe(terser()).pipe(dest("./assets")),
  ]);
}

function buildCdnCss() {
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

function buildReleaseCss() {
  const plugins = [postcssPresetEnv(), cssnano()];

  return src("./src/index.css").pipe(postcss(plugins)).pipe(dest("./assets"));
}

function changeReadmeCDNHash() {
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
  buildCdnCss,
  buildCdnJs,
  copySvf,
  uploadOss,
  changeReadmeCDNHash
);
exports.release = series(clean, buildReleaseCss, buildReleaseJs, copySvf);
