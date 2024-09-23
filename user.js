export class User {
    constructor(endpoint) {
      this.endpoint = endpoint;
    }
  
    // Fetch the data from the end-point
    async fetchUsers() {
      try {
        const response = await fetch(this.endpoint);
        const users = await response.json();
        return users;
      } catch (error) {
        console.error('Error fetching users:', error);
        return [];
      }
    }
  
    // Extract the TLD from a user's website
    getTLD(website) {
      const parts = website.split('.');
      return parts[parts.length - 1];
    }
  
    // Group users by TLD
    groupUsersByTLD(users) {
      const usersByTLD = {};
  
      users.forEach(user => {
        const tld = this.getTLD(user.website);
        if (!usersByTLD[tld]) {
          usersByTLD[tld] = [];
        }
        usersByTLD[tld].push(user);
      });
  
      return usersByTLD;
    }
      
      async fetchAndGroupUsers() {
        const users = await this.fetchUsers();
        const usersByTLD = this.groupUsersByTLD(users);
        return usersByTLD;
      }
      
}

