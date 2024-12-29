const express = require('express');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const { user, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            console.error('Error registering user:', error.message);
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json({ message: 'User registered successfully', user });
    } catch (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const { user, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            console.error('Error logging in:', error.message);
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json({ message: 'User logged in successfully', user });
    } catch (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
})