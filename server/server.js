const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

/* =========================
   TEST ROUTE
========================= */
app.get("/", (req, res) => {
  res.send("MediaSaver Backend running on port 5000");
}); 

/* =========================
   INFO ROUTE
========================= */
app.get("/api/info", async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: "URL required hai" });
    }

    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ error: "Invalid YouTube URL" });
    }

    const info = await ytdl.getInfo(url);

    const title = info.videoDetails.title;
    const thumbnail = info.videoDetails.thumbnails.pop().url;

    const formats = ytdl.filterFormats(info.formats, "videoandaudio");

    res.json({
      platform: "YouTube",
      title,
      thumbnail,
      formats: formats.map(f => ({
        itag: f.itag,
        quality: f.qualityLabel,
        container: f.container
      }))
    });

  } catch (err) {
    console.error("INFO ERROR:", err.message);
    res.status(500).json({ error: "Video info fetch nahi ho saka" });
  }
});

/* =========================
   DOWNLOAD ROUTE
========================= */
app.get("/api/download", async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).send("URL required hai");
    }

    if (!ytdl.validateURL(url)) {
      return res.status(400).send("Invalid YouTube URL");
    }

    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title.replace(/[^\w\s]/gi, "");

    res.header(
      "Content-Disposition",
      `attachment; filename="${title}.mp4"`
    );

    ytdl(url, {
      quality: "highest",
      filter: "audioandvideo"
    }).pipe(res);

  } catch (err) {
    console.error("DOWNLOAD ERROR:", err.message);
    res.status(500).send("Download failed");
  }
});

/* =========================
   START SERVER
========================= */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
