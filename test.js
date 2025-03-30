const client = require ('./db');
const { User } = require ('./model');
describe ('Database', () => {
    beforeAll (async () => {
        await client.connect ();

        // DROP TABLES IF EXISTS;
        await client.query ('DROP TABLE IF EXISTS users;');
        // CREATE USERS TABLES;
        let user_table = `
            CREATE TABLE users (
                user_id INT PRIMARY KEY,
                username VARCHAR (500),
                password VARCHAR (500),
                last_name VARCHAR (500),
                email VARCHAR (500),
                phone VARCHAR (50),
                address VARCHAR (500)
            );
        `;
        await client.query (user_table);
        console.log('Data inserted successfully');
    })
});

test('Test ORM INSERT', async () => {
    let userData = {
        user_id: 501335,
        username: 'Stanzey10',
        password: 'stan2332',
        first_name: 'Stanley',
        last_name: 'Clark',
        email: 'sclark10@gmail.com',
        phone: '9055553333',
        address: '24 lesley dr, Toronto Ontario, l7e 2v2 Canada'
    };
        
});

const user = await User.create(userData);
console.log('User created:', user.toJSON());
