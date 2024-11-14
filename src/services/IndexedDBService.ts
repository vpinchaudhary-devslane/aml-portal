import { IDBPDatabase, openDB } from 'idb';
import { IDBDataStatus } from '../types/enum';

const DB_NAME = 'aml_portal';
const STORE_NAME = 'learner_data';
const DB_VERSION = 1;

class IndexedDbService {
  private dbPromise: Promise<IDBPDatabase<unknown> | null> | null;

  constructor() {
    this.dbPromise = null;
  }

  initializeDB = async () => {
    if (!this.dbPromise) {
      this.dbPromise = openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, {
              keyPath: 'id',
              autoIncrement: true,
            });
          }
        },
      }).catch((error) => {
        console.error('Error opening IndexedDB:', error);
        return null;
      });
    }
    return this.dbPromise;
  };

  // Method to get DB instance, also an arrow function to preserve 'this'
  getDB = async () => {
    if (!this.dbPromise) {
      await this.initializeDB();
    }
    return this.dbPromise;
  };

  addObject = async (object: any) => {
    const db = await this.getDB();
    await db?.add(STORE_NAME, object);
  };

  getObjectById = async (id: IDBKeyRange | IDBValidKey) => {
    const db = await this.getDB();
    return db?.get(STORE_NAME, id);
  };

  deleteObjectById = async (id: IDBValidKey | IDBKeyRange) => {
    const db = await this.getDB();
    await db?.delete(STORE_NAME, id);
  };

  deleteObjectsByIds = async (ids: number[]) => {
    const db = await this.getDB();
    if (!db) {
      console.error('IndexedDB is not initialized');
      return;
    }

    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    try {
      // eslint-disable-next-line no-restricted-syntax
      for (const id of ids) {
        // eslint-disable-next-line no-await-in-loop
        await store.delete(id); // Delete the object with the given ID
      }
      await transaction.done; // Ensure the transaction completes
    } catch (error) {
      console.error('Error deleting objects:', error);
    }
  };

  getAllObjects = async () => {
    const db = await this.getDB();
    return db?.getAll(STORE_NAME);
  };

  queryObjectsByKey = async (key: string | number, value: any) => {
    const db = await this.getDB();
    const tx = db?.transaction(STORE_NAME, 'readonly');
    const store = tx?.objectStore(STORE_NAME);
    const allObjects = await store?.getAll();

    return allObjects?.filter((object) => object[key] === value);
  };

  queryObjectsByKeys = async (criteria: any) => {
    const db = await this.getDB();
    const tx = db?.transaction(STORE_NAME, 'readonly');
    const store = tx?.objectStore(STORE_NAME);
    const allObjects = await store?.getAll();

    // Filter objects based on all key-value pairs in the criteria
    return allObjects?.filter((object) =>
      Object.entries(criteria).every(([key, value]) => object[key] === value)
    );
  };

  updateObjectById = async (id: number, updates: any) => {
    const db = await this.getDB();
    const tx = db?.transaction(STORE_NAME, 'readwrite');
    const store = tx?.objectStore(STORE_NAME);

    // Retrieve the existing object by id
    const object = await store?.get(id);

    if (object) {
      // Update the object with the new values
      Object.assign(object, updates);
      // Save the updated object back to the store
      await store?.put(object);
    }

    await tx?.done;
  };

  updateStatusByIds = async (ids: number[], newStatus: IDBDataStatus) => {
    const db = await this.getDB();
    if (!db) {
      console.error('IndexedDB is not initialized');
      return;
    }

    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    try {
      // eslint-disable-next-line no-restricted-syntax
      for (const id of ids) {
        // eslint-disable-next-line no-await-in-loop
        const object = await store.get(id);
        if (object) {
          object.status = newStatus; // Update the status key
          // eslint-disable-next-line no-await-in-loop
          await store.put(object); // Save the updated object back to the store
        } else {
          console.warn(`Object with ID ${id} not found`);
        }
      }
      await transaction.done;
      console.log('Status updated successfully for specified IDs');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  clearStore = async () => {
    const db = await this.getDB();
    await db?.clear(STORE_NAME);
  };
}

export const indexedDBService = new IndexedDbService();
