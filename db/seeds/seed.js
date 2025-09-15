import db from "#db/client";
import { faker } from "@faker-js/faker";

async function seed() {
    for (let i = 0; i < 3; i++) {
        const first_name = faker.person.firstName();
        const last_name = faker.person.lastName();
        const username = faker.internet.username({ firstName: first_name, lastName: last_name });
        const email = faker.internet.email({ firstName: first_name, lastName: last_name });
        const password = faker.internet.password({ length: 10 });
        const userSQL = `
            INSERT INTO user (first_name, last_name, username, email, password)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *     
        `;
        const {rows} = await db.query(userSQL, [first_name, last_name, username, email, password]);
        const user = rows[0];
        const numLogs = Math.floor(Math.random() * 4); 
        for (let j = 0; j < numLogs; j++) {
            await createSleepLog(userId, )
        }
    }
}

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");