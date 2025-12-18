const express = require("express");
const app = express();

const APP_SCHEME ="pixelxracer://iap?";
const PLAY_STORE ="https://play.google.com/store/apps/details?id=com.pixel.pixelxracer.pixelracer&hl=en_IN";
const APP_STORE ="https://apps.apple.com/us/app/pixel-x-racer/id6468572363";

app.get("/iap", (req, res) => {
  res.set("Content-Type", "text/html");

  res.send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Redirecting…</title>
</head>
<body>
<script>
(function () {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  let opened = false;

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) opened = true;
  });

  window.location.replace("${APP_SCHEME}");

  setTimeout(() => {
    if (!opened) {
      window.location.replace(isIOS ? "${APP_STORE}" : "${PLAY_STORE}");
    }
  }, 1500);
})();
</script>
</body>
</html>
  `);
});

app.listen(3000, () => {
  console.log("Deep link redirect running on port 3000");
});
