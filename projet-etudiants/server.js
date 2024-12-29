const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Config PostgreSQL
const pool = new Pool({
  user: 'postgres', 
  host: 'localhost',
  database: 'etudiant_db',
  password: 'Arthur26',
  port: 5432,
});

// Endpoint pour récupérer les étudiants
app.get('/api/etudiants', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM etudiants');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ajouter un étudiant
app.post('/api/etudiants', async (req, res) => {
  const { nom, prenom, age, classe } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO etudiants (nom, prenom, age, classe) VALUES ($1, $2, $3, $4) RETURNING *',
      [nom, prenom, age, classe]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Modifier un étudiant
app.put('/api/etudiants/:id', async (req, res) => {
  const { id } = req.params;
  const { nom, prenom, age, classe } = req.body;
  try {
    const result = await pool.query(
      'UPDATE etudiants SET nom = $1, prenom = $2, age = $3, classe = $4 WHERE id = $5 RETURNING *',
      [nom, prenom, age, classe, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Supprimer un étudiant
app.delete('/api/etudiants/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM etudiants WHERE id = $1', [id]);
    res.json({ message: `Étudiant avec l'ID ${id} supprimé` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur backend en cours d'exécution sur http://localhost:${port}`);
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
