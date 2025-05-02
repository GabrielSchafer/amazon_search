import express from "express";
import { scan } from "./scanPage";
import cors from "cors";

const app = express();

app.use(cors());

app.use(
	cors({
		origin: "http://localhost:3000",
	}),
);

app.get("/api/:valor", async (req, res) => {
	try {
		const value = req.params.valor;
		const resultado = await scan(value);
		res.status(200).json(resultado);
	} catch (error) {
		console.error("Error:", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.listen(3030, () => {
	console.log("Server rodando em: http://localhost:3030");
});
