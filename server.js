import express from "express";
import { execFile } from "child_process";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())

app.get("/", (req, res) => {
  res.send("marina's API !");
});

app.post("/marina", (req, res) => {
  const expression = req.body.prop;

  if (!expression) {
    return res.status(400).json({ error: "<prop> argument needed" });
  }

  execFile("./marina/marina", [expression], (error, stdout, stderr) => {
    if (error) {
      console.error("Erreur d'exécution:", error);
      return res.status(500).json({ error: "Erreur lors de l'exécution de marina" });
    }

    if (stderr) {
      console.warn("Stderr:", stderr);
    }

    return res.json({ result: stdout.trim() });
  });
});

app.listen(PORT, () => {
  console.log(`Server launched at http://localhost:${PORT}`);
});
