import express from "express";
import { Database } from "sqlite3";
import { bookRoutes } from "./routes/bookRoutes";
import { initializeDatabase } from "./database";
import swaggerUi from "swagger-ui-express";
import { specs } from "./swagger";

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Initialize database
const db = new Database("books.db");
initializeDatabase(db);

// Routes
app.use("/api/books", bookRoutes(db));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(
    `Swagger documentation available at http://localhost:${port}/api-docs`
  );
});
