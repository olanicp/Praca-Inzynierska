const express = require('express');
const sql = require('msnodesqlv8');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());

const connectionString = "server=DESKTOP-1FAD3I9\\SQLEXPRESS;Database=moodieDatabase;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
sql.open(connectionString, (err, conn) => {
    if (err) {
      console.error('Błąd połączenia z bazą danych:', err);
      return;
    }
});

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const query = `SELECT * FROM UserTable WHERE userEmail = '${email}'`;
        sql.query(connectionString, query, (err, result) => {
            if (err) {
                console.error('Błąd podczas sprawdzania istnienia użytkownika w bazie danych:', err);
                return res.status(500).send('Błąd podczas rejestracji użytkownika');
            }
            
            if (result && result.length > 0) {
                return res.status(400).send('Użytkownik o podanym loginie lub adresie email już istnieje');
            }
            const insertQuery = `INSERT INTO UserTable (userName, userEmail, userPassword) VALUES ('${name}', '${email}', '${password}')`;
            sql.query(connectionString, insertQuery, (insertErr, insertResult) => {
                console.log("here");
                if (insertErr) {
                    console.error('Błąd podczas zapisywania danych do bazy danych:', insertErr);
                    return res.status(500).send('Błąd podczas rejestracji użytkownika');
                }
            });
            res.sendStatus(200);
        });
    } catch (error) {
        return res.status(500).send('Błąd podczas rejestracji użytkownika');
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("here1");
    const userQuery = `SELECT * FROM UserTable WHERE userEmail='${email}'`;
    sql.query(connectionString, userQuery, async (err, result) => {
        if (err) {
            console.error('Błąd podczas sprawdzania istnienia użytkownika:', err);
            return res.status(500).send('Błąd podczas logowania');
        }
        console.log("here")
  
        if (!result || result.length === 0) {
            console.error('Błędny login lub hasło', insertErr);
            return res.status(400).send({ error: 'Nieprawidłowy login lub hasło' });
        }

        const user = result[0];
        if (user.userPassword !== password) {
            console.error('Błędny login lub hasło', insertErr);
            return res.status(400).send({ error: 'Nieprawidłowy login lub hasło' });
        }

        res.status(200).send({ message: 'Logowanie zakończone sukcesem' });
    });
    console.log("here")
})

// app.get('/api/data', (req, res) => {
//     const data = {
//         message: 'Hello from the API call'
//     };
//     res.json(data);
// })

app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
})