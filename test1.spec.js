const client = require ('./db');
describe ('Database', () => {
    beforeAll (async () => { // connect to database
        await client.connect ();
    })
});
    // Define SQL queries for users table;
    let users_table = `
        CREATE TABLE users (
            user_id INT PRIMARY KEY,
            username VARCHAR (500),
            password VARCHAR (500),
            first_name VARCHAR(500),
            last_name VARCHAR(500),
            email VARCHAR(500),
            phone VARCHAR(50),
            address VARCHAR (500)
);
    `;
    // Call database DBMS to create users table;
    await client.query (users_table);

    test('Test SQL INSERT', async () => {
        await client.query ("INSERT INTO users VALUES (501335, 'Stanzey10', 'stan2332', 'Stanley', 'Clark', 'sclark10@gmail.com', '9055553333','24 lesley dr, Toronto Ontario, l7e 2v2 Canada');");
        console.log ('user inserted successfully');
    });

    test('Test SQL update - Change phone number for user 501335', async () => {
        // Update phone number for user 501335;
        await client.query (`
            UPDATE users
            SET phone = '9055554444'
            WHERE user_id = 501335;
        `);
        console.log ('user phone number updated successfully');
    });

    // Retrieve the updated phone number for user 501335;
    let phoneResult = await client.query (`
        SELECT phone
        FROM users
        WHERE user_id = 501335;
    `);
    console.log (phoneResult.rows[0].phone);

    test('Test SQL DELETE - Delete user 501335', async () => {
        // Delete user 501335;
        await client.query (`
            DELETE FROM users
            WHERE user_id = 501335;
        `);
        console.log ('user deleted successfully');
    });

    // Check if user 501335 has been deleted;
    let deleteCheckResult = await client.query (`
        SELECT *
        FROM users
        WHERE user_id = 501335;
    `);
    console.log (deleteCheckResult.rows);