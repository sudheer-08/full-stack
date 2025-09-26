
// playingCardsAPI.js
const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(express.json());

// In-memory card collection
let cards = [];
let nextId = 1; // auto-increment ID for cards

// --- Routes ---

// GET /cards - List all cards
app.get("/cards", (req, res) => {
  res.json(cards);
});

// GET /cards/:id - Retrieve a specific card by ID
app.get("/cards/:id", (req, res) => {
  const card = cards.find((c) => c.id === parseInt(req.params.id));
  if (!card) {
    return res.status(404).json({ error: "Card not found" });
  }
  res.json(card);
});

// POST /cards - Add a new card
app.post("/cards", (req, res) => {
  const { suit, value } = req.body;
  if (!suit || !value) {
    return res
      .status(400)
      .json({ error: "Both 'suit' and 'value' are required" });
  }

  const newCard = {
    id: nextId++,
    suit,
    value,
  };
  cards.push(newCard);
  res.status(201).json(newCard);
});

// DELETE /cards/:id - Delete a card by ID
app.delete("/cards/:id", (req, res) => {
  const cardIndex = cards.findIndex((c) => c.id === parseInt(req.params.id));
  if (cardIndex === -1) {
    return res.status(404).json({ error: "Card not found" });
  }
  const removedCard = cards.splice(cardIndex, 1);
  res.json({ message: "Card deleted", card: removedCard[0] });
});

// Start server
app.listen(PORT, () => {
  console.log(🎴 Playing Card API running at http://localhost:${PORT});
});
