// db/seed.js
import db from "./client.js";
import bcrypt from "bcryptjs";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // ----- USERS -----
  const users = [
    {
      first_name: "Alice",
      last_name: "Smith",
      username: "alice123",
      email: "alice@example.com",
      password: "password123",
    },
    {
      first_name: "Bob",
      last_name: "Johnson",
      username: "bob123",
      email: "bob@example.com",
      password: "password123",
    },
    {
      first_name: "Charlie",
      last_name: "Brown",
      username: "charlie123",
      email: "charlie@example.com",
      password: "password123",
    },
  ];

  for (const u of users) {
    const existing = await db.query("SELECT * FROM users WHERE email = $1", [
      u.email,
    ]);
    if (existing.rows.length === 0) {
      const hashedPassword = await bcrypt.hash(u.password, 10); // <--- Hash password here
      await db.query(
        `INSERT INTO users (first_name, last_name, username, email, password)
         VALUES ($1, $2, $3, $4, $5)`,
        [u.first_name, u.last_name, u.username, u.email, hashedPassword]
      );
    }
  }

  // ----- HEALTH INFO -----
  const healthInfos = [
    {
      user_email: "alice@example.com",
      height: 165,
      weight: 60,
      age: 28,
      biological_sex: "Female",
      gender: "Woman",
    },
    {
      user_email: "bob@example.com",
      height: 180,
      weight: 80,
      age: 32,
      biological_sex: "Male",
      gender: "Man",
    },
    {
      user_email: "charlie@example.com",
      height: 170,
      weight: 70,
      age: 25,
      biological_sex: "Male",
      gender: "Non-binary",
    },
  ];

  for (const h of healthInfos) {
    const { rows } = await db.query("SELECT id FROM users WHERE email = $1", [
      h.user_email,
    ]);
    if (rows.length > 0) {
      const userId = rows[0].id;
      const existing = await db.query(
        "SELECT * FROM health_info WHERE user_id = $1",
        [userId]
      );
      if (existing.rows.length === 0) {
        await db.query(
          `INSERT INTO health_info (user_id, height, weight, age, biological_sex, gender)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [userId, h.height, h.weight, h.age, h.biological_sex, h.gender]
        );
      }
    }
  }

  //--- sleep_logs-----
  const sleep_logs = [
    {
      user_email: "alice@example.com",
      date: "2025-09-15",
      sleep_type: "Sleep",
      start_time: "23:00:00",
      end_time: "07:00:00",
      duration: 8,
    },
    {
      user_email: "alice@example.com",
      date: "2025-09-14",
      sleep_type: "Nap",
      start_time: "14:00:00",
      end_time: "14:30:00",
      duration: 0.5,
    },
    {
      user_email: "bob@example.com",
      date: "2025-09-15",
      sleep_type: "Sleep",
      start_time: "22:30:00",
      end_time: "06:30:00",
      duration: 8,
    },
    {
      user_email: "charlie@example.com",
      date: "2025-09-13",
      sleep_type: "Sleep",
      start_time: "00:00:00",
      end_time: "08:00:00",
      duration: 8,
    },
  ];

  for (const sleep of sleep_logs) {
    try {
      const { rows } = await db.query("SELECT id FROM users WHERE email = $1", [
        sleep.user_email,
      ]);
      if (!rows.length) {
        console.warn("User not found for email:", sleep.user_email);
        continue;
      }
      const userId = rows[0].id;

      const exists = await db.query(
        "SELECT * FROM sleep_logs WHERE user_id = $1 AND date = $2 AND sleep_type = $3",
        [userId, sleep.date, sleep.sleep_type]
      );
      if (!exists.rows.length) {
        await db.query(
          `INSERT INTO sleep_logs (user_id, date, sleep_type, start_time, end_time, duration)
         VALUES ($1,$2,$3,$4,$5,$6)`,
          [
            userId,
            sleep.date,
            sleep.sleep_type,
            sleep.start_time,
            sleep.end_time,
            sleep.duration,
          ]
        );
        console.log("Inserted sleep log for:", sleep.user_email, sleep.date);
      }
    } catch (err) {
      console.error("Failed to insert sleep log:", err);
    }
  }
  // ----- WATER LOGS -----
  const water_logs = [
    { user_email: "alice@example.com", date: "2025-09-15", amount_oz: 16 },
    { user_email: "bob@example.com", date: "2025-09-15", amount_oz: 24 },
    { user_email: "charlie@example.com", date: "2025-09-13", amount_oz: 20 },
  ];

  for (const water of water_logs) {
    const { rows } = await db.query("SELECT id FROM users WHERE email = $1", [
      water.user_email,
    ]);
    if (rows.length > 0) {
      const userId = rows[0].id;
      const existing = await db.query(
        "SELECT * FROM water_logs WHERE user_id = $1 AND date = $2",
        [userId, water.date]
      );
      if (existing.rows.length === 0) {
        await db.query(
          `INSERT INTO water_logs (user_id, date, amount_oz)
         VALUES ($1, $2, $3)`,
          [userId, water.date, water.amount_oz]
        );
      }
    }
  }

  // ----- EXERCISE LOGS -----
  const logs = [
    {
      user_email: "alice@example.com",
      date: "2025-09-15",
      exercise_type: "Cardio",
      duration: 30,
    },
    {
      user_email: "alice@example.com",
      date: "2025-09-14",
      exercise_type: "Strength Training",
      duration: 45,
    },
    {
      user_email: "bob@example.com",
      date: "2025-09-15",
      exercise_type: "Flexibility Training",
      duration: 20,
    },
    {
      user_email: "charlie@example.com",
      date: "2025-09-13",
      exercise_type: "Balance Training",
      duration: 25,
    },
  ];

  for (const log of logs) {
    const { rows } = await db.query("SELECT id FROM users WHERE email = $1", [
      log.user_email,
    ]);
    if (rows.length > 0) {
      const userId = rows[0].id;
      const existing = await db.query(
        "SELECT * FROM exercise_logs WHERE user_id = $1 AND date = $2 AND exercise_type = $3",
        [userId, log.date, log.exercise_type]
      );
      if (existing.rows.length === 0) {
        await db.query(
          `INSERT INTO exercise_logs (user_id, date, exercise_type, duration)
           VALUES ($1, $2, $3, $4)`,
          [userId, log.date, log.exercise_type, log.duration]
        );
      }
    }
  }
  const healthTips = [
    {
      category: "Water",
      tip: "Keep a water bottle nearby throughout the day to remind yourself to sip.",
    },
    {
      category: "Water",
      tip: "Sip water regularly instead of waiting until you feel thirsty.",
    },
    {
      category: "Sleep",
      tip: "A consistent bedtime and wake-up time even on weekends can improve sleep quality.",
    },
    {
      category: "Exercise & Movement",
      tip: "Movement doesn’t have to mean the gym—walking, dancing, stretching all count.",
    },
    {
      category: "General Wellness",
      tip: "Mental health is just as important as physical health.",
    },
    // 👉 you can paste all the other tips here from your SQL file
  ];

  for (const tip of healthTips) {
    const existing = await db.query(
      "SELECT * FROM health_tips WHERE category = $1 AND tip = $2",
      [tip.category, tip.tip]
    );
    if (existing.rows.length === 0) {
      await db.query(
        `INSERT INTO health_tips (category, tip) VALUES ($1, $2)`,
        [tip.category, tip.tip]
      );
    }
  }
}
