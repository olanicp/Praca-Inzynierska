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
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            console.error('Error registering user:', error.message);
            return res.status(400).json({ error: error.message });
        }

        if (data) {
            const { error: dataError } = await supabase
              .from('user_data')
              .insert([{ id: data.user.id, streak_count: 0 }]);
          
            if (dataError) {
              console.error('Error creating user data:', dataError);
            }
        }

        return res.status(200).json({ message: 'User registered successfully', data });
    } catch (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// app.post('/getStreak', async (req, res) => {
//     try{
//         const { data: user, error } = await supabase
//             .from('user_data')
//             .select('last_signed_at, streak_count')
//             .eq('id', userId)
//             .single();

//         if (error) {
//             console.error('Error fetching user data:', error);
//             return;
//         }
//     }catch(err){
//         console.error('Unexpected error:', err);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
    
// })

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            console.error('Error logging in:', error.message);
            return res.status(400).json({ error: error.message });
        }
        const userId = data.user.id;
        const { data: userData, error: userError } = await supabase
            .from('user_data')
            .select('streak_count, login_days')
            .eq('id', userId)
            .single();  

        if (userError) {
            console.error('Error fetching user data:', userError.message);
            return res.status(400).json({ error: 'Could not retrieve user data.' });
        }

        const now = new Date();
        const currentDayIndex = (now.getDay() + 6) % 7;
        const lastSignedAt = new Date(data.user.last_sign_in_at)
        let newStreakCount = userData.streak_count;
        let newLoginDays = [...(userData.login_days || [])];
        const timeDifference = now.getTime() - lastSignedAt.getTime();
        const hoursDifference = timeDifference / (1000 * 60 * 60);
        const createdAt = new Date(data.user.created_at);
        if(createdAt.getDay() === now.getDay()){ //TODO: change for the date (lastsignedAt) from database
            newStreakCount = 1;
            newLoginDays = [currentDayIndex];
            console.log(createdAt.getDay(), lastSignedAt.getDay(), "what1")
        }
        else if (hoursDifference > 24){
            newStreakCount = 1;
            newLoginDays = [currentDayIndex];
            console.log("what2")

        }
        else if (hoursDifference <= 24 && hoursDifference > 0){
            newStreakCount += 1;
            if (!newLoginDays.includes(currentDayIndex)){
                newLoginDays.push(currentDayIndex);
            }
            console.log("what3")
        }else{
            newStreakCount = 1;
            console.log("what4")
        }

        if(newLoginDays.length > 7){
            newLoginDays = [currentDayIndex];
        }

        const { error: updateError } = await supabase
            .from('user_data')
            .update({
                streak_count: newStreakCount,
                login_days: newLoginDays 
            })
            .eq('id', userId);

        if (updateError) {
            console.error('Error updating user streak:', updateError.message);
            return res.status(400).json({ error: 'Could not update user streak.' });
        }

        return res.status(200).json({ message: 'User logged in successfully', 
            user: {
                userID: userId,
                streak: newStreakCount,
                login_days: newLoginDays 
            } 
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
})