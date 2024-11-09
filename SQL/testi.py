import sqlite3

conn = sqlite3.connect('users.db')  
cursor = conn.cursor()

cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()
print(tables)  # Tämä tulostaa tietokannan taulut
def add_user(username):
    cursor.execute('INSERT INTO users (username) VALUES (?)', (username,))
    conn.commit()


def add_message(user_id, content):
    cursor.execute('INSERT INTO messages (user_id, content) VALUES (?, ?)', (user_id, content))
    conn.commit()


def get_messages():
    cursor.execute('SELECT m.content, u.username, m.timestamp FROM messages m JOIN users u ON m.user_id = u.id')
    return cursor.fetchall()

add_user('Alice')
add_user('Bob')

add_message(1, 'Hei Bob!')
add_message(2, 'Hei Alice, mitä kuuluu?')

messages = get_messages()
for message in messages:
    print(f'{message[2]} - {message[1]}: {message[0]}')

conn.close()