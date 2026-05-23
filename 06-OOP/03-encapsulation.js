// ============================================================
// 📘 03 - Encapsulation
// ============================================================
// Data এবং Methods একসাথে bundle করা, এবং
// internal details hide করা — শুধু necessary টুকু expose করা

class UserAccount {
  // Private fields:
  #password;
  #loginAttempts = 0;
  #isLocked = false;
  #maxAttempts = 3;

  // Public fields:
  username;
  email;
  createdAt;

  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.#password = this.#hashPassword(password);
    this.createdAt = new Date();
  }

  // Private method (# দিয়ে):
  #hashPassword(pwd) {
    // Real app এ bcrypt use করো, এটা শুধু demo
    return btoa(pwd + "salt_key_123");
  }

  #checkLock() {
    if (this.#isLocked) {
      throw new Error("Account locked! Contact support.");
    }
  }

  // Public methods (interface):
  login(password) {
    this.#checkLock();

    const hashedInput = this.#hashPassword(password);
    if (hashedInput === this.#password) {
      this.#loginAttempts = 0;
      return { success: true, message: "Login successful!" };
    }

    this.#loginAttempts++;
    if (this.#loginAttempts >= this.#maxAttempts) {
      this.#isLocked = true;
      return { success: false, message: "Account locked after 3 failed attempts!" };
    }

    const remaining = this.#maxAttempts - this.#loginAttempts;
    return { success: false, message: `Wrong password. ${remaining} attempts left.` };
  }

  changePassword(oldPassword, newPassword) {
    this.#checkLock();
    const hashedOld = this.#hashPassword(oldPassword);
    if (hashedOld !== this.#password) {
      throw new Error("Current password is incorrect!");
    }
    if (newPassword.length < 6) {
      throw new Error("Password must be at least 6 characters!");
    }
    this.#password = this.#hashPassword(newPassword);
    return "Password changed successfully!";
  }

  get isLocked() {
    return this.#isLocked;
  }

  get loginAttempts() {
    return this.#loginAttempts;
  }

  // Public representation (password exclude):
  toJSON() {
    return {
      username: this.username,
      email: this.email,
      createdAt: this.createdAt,
      isLocked: this.#isLocked
    };
  }
}

const account = new UserAccount("karim123", "karim@email.com", "mypassword");

console.log(account.login("wrongpass"));  // Wrong password. 2 attempts left.
console.log(account.login("wrongpass2")); // Wrong password. 1 attempt left.
console.log(account.login("mypassword")); // Login successful!

// account.#password   // ❌ SyntaxError — private!
// account.#hashPassword // ❌ SyntaxError — private!

console.log(JSON.stringify(account.toJSON(), null, 2));

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. CreditCard class: private cardNumber (শুধু last 4 digits দেখা যাবে)
//    charge(), getBalance(), getCardInfo()
// 2. Hospital patient record: private medical history, public appointments
