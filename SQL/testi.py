import sqlite3

conn = sqlite3.connect('users.db')  
cursor = conn.cursor()

def add_user(username):
    cursor.execute('SELECT id FROM users WHERE username = ?', (username,))
    user = cursor.fetchone()
    if user:
        print(f"User '{username}' already exists.")
    else:
        cursor.execute('INSERT INTO users (username) VALUES (?)', (username,))
        conn.commit()
        print(f"User '{username}' added.")


def add_message(sender_id, content):
    cursor.execute('INSERT INTO messages (sender_id, content) VALUES (?, ?)', (sender_id, content))
    conn.commit()


def get_messages():
    cursor.execute('SELECT m.content, u.username, m.timestamp FROM messages m JOIN users u ON m.sender_id = u.id')
    return cursor.fetchall()

add_user('Alice')
add_user('Bob')

add_message(1, 'Hei Bob!')
add_message(2, 'Hei Alice, mitä kuuluu?')

messages = get_messages()
for message in messages:
    print(f'{message[2]} - {message[1]}: {message[0]}')

conn.close()