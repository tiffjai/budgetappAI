interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  plaidAccessToken?: string;
  plaidItemId?: string;
}

class Store {
  private users: Map<string, User>;
  private usersByEmail: Map<string, User>;

  constructor() {
    this.users = new Map();
    this.usersByEmail = new Map();
  }

  createUser(email: string, password: string, name: string): User {
    if (this.usersByEmail.has(email)) {
      throw new Error('Email already registered');
    }

    const id = Math.random().toString(36).substr(2, 9);
    const user: User = { id, email, password, name };
    
    this.users.set(id, user);
    this.usersByEmail.set(email, user);
    
    return user;
  }

  getUserById(id: string): User | undefined {
    return this.users.get(id);
  }

  getUserByEmail(email: string): User | undefined {
    return this.usersByEmail.get(email);
  }

  updateUser(id: string, updates: Partial<User>): User {
    const user = this.users.get(id);
    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    this.usersByEmail.set(updatedUser.email, updatedUser);

    return updatedUser;
  }
}

export const store = new Store();
