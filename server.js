require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const OpenAI = require("openai");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: ["https://localhost", "capacitor://localhost", "http://localhost"] }));
app.use(express.json({ limit: "30kb" }));
app.use("/api/", rateLimit({ windowMs: 60 * 1000, limit: 20, standardHeaders: true, legacyHeaders: false }));

app.get("/api/health", (_req, res) => res.json({ ok: true, app: "AYUDA CENS" }));

app.post("/api/chat", async (req, res) => {
  try {
    if (!process.env.OPENAI_API_KEY) return res.status(503).json({ error: "El servidor todavía no tiene configurada la clave de IA." });
    const messages = req.body.messages;
    if (!Array.isArray(messages) || messages.length === 0 || messages.length > 20) return res.status(400).json({ error: "Enviá una conversación válida." });
    const safeMessages = messages.map(m => {
      if (!m || !["user", "assistant"].includes(m.role) || typeof m.content !== "string") throw new Error("Mensaje inválido.");
      return { role: m.role, content: m.content.slice(0, 6000) };
    });
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: "Sos AYUDA CENS, un asistente educativo claro y paciente para estudiantes adultos de secundaria en Argentina. Respondé en español rioplatense sencillo. Explicá paso a paso, con ejemplos, sin hacer sentir mal al estudiante. En matemática y electricidad mostrá fórmulas y unidades. En programación entregá código correcto y explicá cómo probarlo. Ayudá a aprender, no inventes datos; señalá cuando algo deba verificarse con el docente o el material de clase." },
        ...safeMessages
      ],
      temperature: 0.4
    });
    res.json({ answer: completion.choices[0]?.message?.content || "No pude generar una respuesta. Probá nuevamente." });
  } catch (error) {
    console.error("Chat error:", error.message);
    res.status(500).json({ error: "No se pudo procesar la consulta. Revisá la conexión e intentá otra vez." });
  }
});

app.use(express.static(path.join(__dirname, "public")));
app.get("*", (_req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
app.listen(port, () => console.log(`AYUDA CENS escuchando en el puerto ${port}`));
