export default class LocalStorage {
  static set(key, info) {
    localStorage.setItem(key, JSON.stringify(info));
  }

  static get(key) {
    return JSON.parse(localStorage.getItem(key));
  }
}
