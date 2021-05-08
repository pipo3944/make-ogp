import functions = require("firebase-functions");
import admin = require("firebase-admin");

const storage = admin.storage();

// OGP関連の定数
const OGP_IMG_WIDTH = 1200;
const OGP_IMG_HEIGHT = 630;
const OGP_IMG_ARTWORK_WIDTH = OGP_IMG_WIDTH * 0.5;

// "/ogp/stockimg/:sid" の処理本体（最後にexportしています）
export const getOgpImage = async (
    request: functions.https.Request,
    response: functions.Response
) => {
  const ogpImage = storage.bucket().file("ogp-images/default.jpg");

  if (!await ogpImage.exists()) {
    response.status(404).end("404 Not Found.");
    return;
  }

  response.set("Cache-Control", "public, max-age=600, s-maxage=600");
  response.writeHead(200, {"Content-Type": "image/jpeg"});

  ogpImage.createReadStream().pipe(response);
};
