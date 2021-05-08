/* eslint-disable max-len */
import * as functions from "firebase-functions";

// const db = admin.firestore();

const CONFIG = functions.config();
const APP_DOMAIN = CONFIG.app.domain;
const OGP_IMG_WIDTH = 1200;
const OGP_IMG_HEIGHT = 630;

export const share = async (request: functions.https.Request, response: functions.Response) => {
  const [, , uid] = request.path.split("/");

  try {
    // キャッシュを有効にする
    // これを入れないとFunctionsはデフォルトではキャッシュされないので、毎回Functionが呼ばれて死にます。
    // キャッシュの有効期間はよしなに決めてください。長めでいいと思います。
    response.set("Cache-Control", "public, max-age=600, s-maxage=600");
    const html = createHtml(uid);
    response.status(200).send(html);
  } catch (error) {
    response.status(404).send("404 Not Found");
    // 略 : エラー時はデフォルトのhtml（固定のOGP）を返す
  }
};

const createHtml = (uid: string) => {
  const SITEURL = `https://${APP_DOMAIN}`;
  const PAGEURL = `${SITEURL}/stock/${uid}`;
  const TITLE = "タイトルタイトルタイトルタイトルタイトルタイトル";
  const DESCRIPTION = "ディスクリプションディスクリプションディスクリプションディスクリプションディスクリプション";
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>colorinco</title>
    <meta property="og:title" content="${TITLE}">
    <meta property="og:image" content="${SITEURL}/ogp/${uid}">
    <meta property="og:image:width" content="${OGP_IMG_WIDTH}">
    <meta property="og:image:height" content="${OGP_IMG_HEIGHT}">
    <meta property="og:description" content="${DESCRIPTION}">
    <meta property="og:url" content="${PAGEURL}">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="colorinco*カラーインコ">
    <meta name="twitter:site" content="${SITEURL}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${TITLE}">
    <meta name="twitter:image" content="${SITEURL}/ogp/${uid}">
    <meta name="twitter:description" content="${DESCRIPTION}">
  </head>
  <body>
    <script type="text/javascript">window.location="/";</script>
  </body>
</html>
`;

// <body>内でアプリに飛ばします。
// ユーザー(ブラウザ)がこのURLにアクセスしてきた場合は、
// <script type="text/javascript">window.location="/";</script>
// が実行されてルートURLにアクセスしSPAを表示します。
};

export default share;
