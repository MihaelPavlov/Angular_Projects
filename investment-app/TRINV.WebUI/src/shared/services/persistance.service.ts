import {Injectable} from "@angular/core";

@Injectable({
  providedIn:"root"
})
export  class  PersistenceService{
  setLocalStorageItem(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage');
    }
  }

  getLocalStorageItem(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key) || '{}');
    } catch (e) {
      console.log('Error getting data from localStorage');
      return null;
    }
  }

  removeLocalStorageItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing from localStorage');
    }
  }
}
