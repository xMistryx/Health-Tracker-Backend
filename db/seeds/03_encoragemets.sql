TRUNCATE health_tips
RESTART IDENTITY CASCADE;

INSERT INTO encouragements (category, milestone, message) VALUES
-- Water
('Water', 'FirstLog', 'Nice start! Every sip counts'),
('Water', '32oz', 'Good job staying hydrated! Your body thanks you'),
('Water', '68oz', 'You crushed your water goal today!'),
-- Exercise
('Exercise', 'Strength30', 'Way to build strength! Keep it up.'),
('Exercise', 'Cardio20', 'Your heart is smiling. Nice job moving!'),
('Exercise', 'Flexibility15', 'Great stretch! Your body will thank you tomorrow'),
('Exercise', 'Balance10', 'Steady as you go! Balance training is underrated'),
('Exercise', '5Logs', 'Consistency is key. Keep showing up!'),
('Exercise', '10Logs', 'Double digits! That’s commitment'),
('Exercise', '20Logs', '20 workouts logged, you’re doing awesome'),
-- Food
('Food', '3Meals', 'Balanced and fueled! You took great care of yourself today.'),
('Food', '5Logs', 'That’s a week of food awareness!'),
('Food', '10Logs', 'Nice! You’re really building healthy habits.'),
('Food', '20Logs', '20 logs—your future self is proud'),
-- Sleep
('Sleep', 'FirstLog', 'Sweet dreams tracked'),
('Sleep', 'FullNight', 'Perfect night’s rest'),
('Sleep', 'Nap', 'Great recharge'),
('Sleep', '5Logs', 'You’re noticing your patterns—awesome work'),
('Sleep', '10Logs', 'That’s real consistency! Your body loves it.'),
('Sleep', '20Logs', '20 nights tracked—you’re mastering your rest');
