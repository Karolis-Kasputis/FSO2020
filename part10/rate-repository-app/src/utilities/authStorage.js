import { AsyncStorage } from 'react-native';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }
  async getAccessToken() {
    return await AsyncStorage.getItem(`${this.namespace}:storage`);
  }
  async setAccessToken(token) {
    await AsyncStorage.setItem(`${this.namespace}:storage`, `Bearer ${token}`);
  }
  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:storage`);
  }
}

export default AuthStorage;
