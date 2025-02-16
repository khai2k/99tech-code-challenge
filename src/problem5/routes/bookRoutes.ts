import { Router } from "express";
import { Database } from "sqlite3";

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of the book
 *         author:
 *           type: string
 *           description: The author of the book
 *         year:
 *           type: integer
 *           description: The publication year
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */

export function bookRoutes(db: Database) {
  const router = Router();

  /**
   * @swagger
   * /api/books:
   *   post:
   *     summary: Create a new book
   *     tags: [Books]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - title
   *               - author
   *             properties:
   *               title:
   *                 type: string
   *               author:
   *                 type: string
   *               year:
   *                 type: integer
   *     responses:
   *       201:
   *         description: The book was successfully created
   *       400:
   *         description: Missing required fields
   *       500:
   *         description: Server error
   */
  router.post("/", (req, res) => {
    const { title, author, year } = req.body;

    if (!title || !author) {
      return res.status(400).json({ error: "Title and author are required" });
    }

    const query = "INSERT INTO books (title, author, year) VALUES (?, ?, ?)";
    db.run(query, [title, author, year], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID, title, author, year });
    });
  });

  /**
   * @swagger
   * /api/books:
   *   get:
   *     summary: Get all books
   *     tags: [Books]
   *     parameters:
   *       - in: query
   *         name: author
   *         schema:
   *           type: string
   *         description: Filter by author name
   *       - in: query
   *         name: year
   *         schema:
   *           type: integer
   *         description: Filter by publication year
   *     responses:
   *       200:
   *         description: List of books
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Book'
   */
  router.get("/", (req, res) => {
    const { author, year } = req.query;
    let query = "SELECT * FROM books";
    const params: any[] = [];

    if (author || year) {
      query += " WHERE";
      if (author) {
        query += " author = ?";
        params.push(author);
      }
      if (year) {
        if (author) query += " AND";
        query += " year = ?";
        params.push(year);
      }
    }

    db.all(query, params, (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    });
  });

  /**
   * @swagger
   * /api/books/{id}:
   *   get:
   *     summary: Get book by ID
   *     tags: [Books]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Book ID
   *     responses:
   *       200:
   *         description: Book details
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Book'
   *       404:
   *         description: Book not found
   */
  router.get("/:id", (req, res) => {
    const query = "SELECT * FROM books WHERE id = ?";
    db.get(query, [req.params.id], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ error: "Book not found" });
      }
      res.json(row);
    });
  });

  /**
   * @swagger
   * /api/books/{id}:
   *   put:
   *     summary: Update a book
   *     tags: [Books]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Book ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - title
   *               - author
   *             properties:
   *               title:
   *                 type: string
   *               author:
   *                 type: string
   *               year:
   *                 type: integer
   *     responses:
   *       200:
   *         description: Book updated successfully
   *       404:
   *         description: Book not found
   *       400:
   *         description: Missing required fields
   */
  router.put("/:id", (req, res) => {
    const { title, author, year } = req.body;

    if (!title || !author) {
      return res.status(400).json({ error: "Title and author are required" });
    }

    const query = `
      UPDATE books 
      SET title = ?, author = ?, year = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `;

    db.run(query, [title, author, year, req.params.id], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: "Book not found" });
      }
      res.json({ id: req.params.id, title, author, year });
    });
  });

  /**
   * @swagger
   * /api/books/{id}:
   *   delete:
   *     summary: Delete a book
   *     tags: [Books]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Book ID
   *     responses:
   *       200:
   *         description: Book deleted successfully
   *       404:
   *         description: Book not found
   */
  router.delete("/:id", (req, res) => {
    const query = "DELETE FROM books WHERE id = ?";
    db.run(query, [req.params.id], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: "Book not found" });
      }
      res.json({ message: "Book deleted successfully" });
    });
  });

  return router;
}
