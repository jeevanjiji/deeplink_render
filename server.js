const express = require("express");
const app = express();

const PLAY_STORE ="https://play.google.com/store/apps/details?id=com.pixel.pixelxracer.pixelracer&hl=en_IN";
const APP_STORE ="https://apps.apple.com/us/app/pixel-x-racer/id6468572363";

const createRedirectHandler = (appScheme) => (req, res) => {
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

  window.location.replace("${appScheme}");

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
};

app.get("/iap", createRedirectHandler("pixelxracer://iap"));
app.get("/dealership", createRedirectHandler("pixelxracer://dealership"));
app.get("/garage", createRedirectHandler("pixelxracer://garage"));
app.get("/gamemodes", createRedirectHandler("pixelxracer://gamemodes"));

app.listen(3000, () => {
  console.log("Deep link redirect running on port 3000");
});
