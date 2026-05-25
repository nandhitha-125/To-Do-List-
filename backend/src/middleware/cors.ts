import cors from "cors";

const corsOptions: cors.CorsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export default cors(corsOptions);
