const { series, src, dest } = require("gulp");
const replace = require("gulp-replace");
const del = require("del");
const rev = require("gulp-rev");
var oss = require("gulp-aliyun-oss");

async function clean() {
  await del("assets/**");
}

function copySvf() {
  return src("./src/*.svg").pipe(dest("./assets"));
}
function uploadOss() {
  var options = {
    accessKeyId: "LTAI5tCwDdzwzLGCHBjf1esq",
    accessKeySecret: "DbOqzAzE8bD2V3pbHjrwFIpnT3oTRV",
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

function buildAssets() {
  return src("./src/index.css")
    .pipe(
      replace(
        /\.\/([a-z]*\.svg)/g,
        "https://resource.sunbohao.com/cornerCss/$1"
      )
    )
    .pipe(rev())
    .pipe(dest("./assets"));
}

exports.cdn = series(clean, buildAssets, copySvf, uploadOss);
