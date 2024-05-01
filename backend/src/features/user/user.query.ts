export const USER_QUERY = {
    SELECT_USER_BY_PHONE: "SELECT * FROM users WHERE phone=?",
    CREATE_USER: "INSERT INTO users (name, lastname, phone) VALUES (?, ?, ?)",
    SELECT_USERS: "SELECT id, name, lastname, phone FROM users"
}