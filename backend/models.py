import bcrypt

class Admin:
    def __init__(self, username, password):
        self.username = username
        self.password_hash = self._hash_password(password)

    def _hash_password(self, password):
        """Hashes the password using bcrypt."""
        salt = bcrypt.gensalt()
        return bcrypt.hashpw(password.encode('utf-8'), salt)

    def check_password(self, password):
        """Checks if the provided password matches the stored hash."""
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash)

    def to_document(self):
        """Converts the Admin object to a dictionary for MongoDB."""
        return {
            "username": self.username,
            "password": self.password_hash
        } 