import { Injectable } from '@angular/core';
/**
  * Right now, this is a re-write of what I put in the Todo Timers.
  * Hopefully it's at least a little bit cleaner.
  * I pulled out the promises, which means it won't actually function right now.
  * Next step(s):
  *  - Add Observables
  */
const DB_VER = 1;

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {

  constructor() { }

  ngOnInit() {
    if(!('indexedDB' in window)){
      window.alert("This browser doesn't support IndexedDB. Data saving will not work.");
    } else {
      // open each DB and read the data(?)
    }
  }

  /**
   * 
   * @param dbName name of the database in IndexedDB
   * @param storeName name of the store in IndexedDB
   */
  getData(dbName, storeName) {
    // create or open IndexedDB
    let request = window.indexedDB.open(dbName,DB_VER);

    request.onerror = (event:any) => {
      // reject
      this.handleError(request.error);
    };

    // handle any DB upgrades
    request.onupgradeneeded = (event:any) => {
      let db = event.target.result;
      let store = db.createObjectStore(storeName, {keyPath: 'id', autoIncrement: true});

      // check for errors when upgrading the store
      store.onerror = () => {
        // reject
        this.handleError(store.error);
      };
    };

    // lastly, the success situation; retrieve the data
    request.onsuccess = (event:any) => {
      let db = request.result;
      let transaction = db.transaction(storeName, 'readonly');
      let store = transaction.objectStore(storeName);
      let objStoreReq = store.getAll();

      // data retrieval successful:
      objStoreReq.onsuccess = (event:any) => {
        // promise resolve went here
      };
      
      // data retrieval error:
      objStoreReq.onerror = (event:any) => {
        // reject
        this.handleError(objStoreReq.error);
      };
    };
  }

  addOrUpdateOne(dbName, storeName, item) {
    let request = window.indexedDB.open(dbName, DB_VER);

    request.onsuccess = (event:any) => {
      let db = request.result;
      let transaction = db.transaction(storeName, 'readwrite');
      let store = transaction.objectStore(storeName);
      store.put(item);

      transaction.oncomplete = (event:any) => {
        // promise resolve here
      };

      transaction.onerror = (event:any) => {
        // reject
        this.handleError(transaction.error);
      };
    };

    request.onerror = (event:any) => {
      // reject
      this.handleError(request.error);
    };
  }

  deleteOne(dbName, storeName, id) {
    let request = window.indexedDB.open(dbName, DB_VER);

    request.onsuccess = (event:any) => {
      let db = request.result;
      let transaction = db.transaction(storeName, 'readwrite');
      let store = transaction.objectStore(storeName);

      let objStoreReq = store.delete(id);

      objStoreReq.onsuccess = (event:any) => {
        // resolve
      };

      objStoreReq.onerror = (event:any) => {
        this.handleError(objStoreReq.error);
      };
      transaction.onerror = (event:any) => {
        this.handleError(transaction.error);
      };
    };

    request.onerror = (event:any) => {
      this.handleError(request.error);
    }
  }

  deleteAll(dbName, storeName) {
    let request = window.indexedDB.open(dbName, DB_VER);

    request.onsuccess = (event:any) => {
      let db = request.result;
      let transaction = db.transaction(storeName, 'readwrite');
      let store = transaction.objectStore(storeName);

      let objStoreReq = store.clear();

      objStoreReq.onsuccess = (event:any) => {
        // resolve
      };

      objStoreReq.onerror = (event:any) => {
        this.handleError(objStoreReq.error);
      };
      transaction.onerror = (event:any) => {
        this.handleError(transaction.error);
      };
    };

    request.onerror = (event:any) => {
      this.handleError(request.error);
    }
  }

  handleError(error:any) {
    window.alert("ERROR: check logs for details.");
    console.error("IndexedDB Error:",error)
  }
}
