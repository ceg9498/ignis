import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

/**
  * Right now, this is a re-write of what I put in the Todo Timers.
  * Hopefully it's at least a little bit cleaner.
  * I pulled out the promises, which means it won't actually function right now.
  * Next step(s):
  *  - Add Observables
  * return new Observable((observer) => {...});
  * observer.next(1);
  * observer.next(2);
  * observer.next(3);
  * observer.complete();
  * observer.error();
  * 
  * const {next, error} = observer;
  * 
  * myObservable.subscribe(cb)
  * locations.subscribe({
      (position) { console.log('Current Position: ', position); },
      error(msg) { console.log('Error Getting Location: ', msg); }
    });
    
    const subscription = fromEvent(nameInput, 'keydown')
      .subscribe((e: KeyboardEvent) => {
        if (e.keyCode === ESC_KEY) {
          nameInput.value = '';
        }
      });
  */
const DB_VER = 4;

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {

  constructor() { }

  initDB(dbName:string, storeNames:string[]){// prepare the observable
    return new Observable((observer)=> {
      // extract next and error

      if(!('indexedDB' in window)){
        observer.error("This browser doesn't support IndexedDB. Data saving will not work.");
      } else {
        // create or open IndexedDB
        let request = window.indexedDB.open(dbName,DB_VER);

        // handle errors opening DB
        request.onerror = (event:any) => {
          observer.error(request.error);
        };

        // handle any DB upgrades
        request.onupgradeneeded = (event:any) => {
          let db = event.target.result;
          storeNames.forEach((store)=>{
            let upgrade = db.createObjectStore(store, {keyPath: 'id', autoIncrement: true});

            // check for errors when upgrading the store
            upgrade.onerror = () => {
              observer.error(upgrade.error);
            };

            upgrade.onsuccess = () => {
              observer.next("DB upgrade was successful!");
            }
          });
          observer.complete();
        };
      }
    });
  }

  upgradeDB(db:any, storeName:string, error:Function){
    let upgrade = db.createObjectStore('groceries', {keyPath: 'id', autoIncrement: true});
    upgrade = db.createObjectStore('schedule', {keyPath: 'id', autoIncrement: true});

    // check for errors when upgrading the store
    upgrade.onerror = () => {
      error(upgrade.error);
    };

    upgrade.onsuccess = () => {
      console.log("DB upgrade was successful!");
    }
  }

  /**
   * 
   * @param dbName name of the database in IndexedDB
   * @param storeName name of the store in IndexedDB
   */
  getData(dbName:string, storeName:string):Observable<any> {
    // prepare the observable
    return new Observable((observer)=> {
      // extract next and error

      if(!('indexedDB' in window)){
        observer.error("This browser doesn't support IndexedDB. Data saving will not work.");
      } else {
        // create or open IndexedDB
        let request = window.indexedDB.open(dbName,DB_VER);

        // handle errors opening DB
        request.onerror = (event:any) => {
          observer.error(request.error);
        };

        // handle any DB upgrades
        request.onupgradeneeded = (event:any) => {
          this.upgradeDB(event.target.result, storeName, observer.error);
        };

        // lastly, the success situation; retrieve the data
        request.onsuccess = (event:any) => {
          let db = request.result;
          let transaction = db.transaction(storeName, 'readonly');
          let store = transaction.objectStore(storeName);
          let objStoreReq = store.getAll();

          // data retrieval successful:
          objStoreReq.onsuccess = (event:any) => {
            // resolve
            event.target.result.forEach((result)=> {
              observer.next(result);
            });
            observer.complete();
          };
          
          // data retrieval error:
          objStoreReq.onerror = (event:any) => {
            observer.error(objStoreReq.error);
          };
        };
      }
    });
  }

  getById(dbName:string, storeName:string, id:any):Observable<any> {
    // prepare the observable
    return new Observable((observer)=> {
      // extract next and error

      if(!('indexedDB' in window)){
        observer.error("This browser doesn't support IndexedDB. Data saving will not work.");
      } else {
        // create or open IndexedDB
        let request = window.indexedDB.open(dbName,DB_VER);

        // handle errors opening DB
        request.onerror = (event:any) => {
          observer.error(request.error);
        };

        // handle any DB upgrades
        request.onupgradeneeded = (event:any) => {
          this.upgradeDB(event.target.result, storeName, observer.error);
        };

        // lastly, the success situation; retrieve the data
        request.onsuccess = (event:any) => {
          let db = request.result;
          let transaction = db.transaction(storeName, 'readonly');
          let store = transaction.objectStore(storeName);
          let objStoreReq = store.get(id);

          // data retrieval successful:
          objStoreReq.onsuccess = (event:any) => {
            // resolve
            observer.next(event.target.result);
            observer.complete();
          };
          
          // data retrieval error:
          objStoreReq.onerror = (event:any) => {
            observer.error(objStoreReq.error);
          };
        };
      }
    });
  }

  // this seems to work; add has been checked a little
  addOrUpdateOne(dbName:string, storeName:string, item:any):Observable<any> {
    return new Observable((observer)=>{

      if(!('indexedDB' in window)){
        observer.error("This browser doesn't support IndexedDB. Data saving will not work.");
      } else {
        let request = window.indexedDB.open(dbName, DB_VER);
        
        // handle errors opening DB
        request.onerror = (event:any) => {
          observer.error(request.error);
        };

        // handle any DB upgrades
        request.onupgradeneeded = (event:any) => {
          this.upgradeDB(event.target.result, storeName, observer.error);
        };

        request.onsuccess = (event:any) => {
          let db = request.result;
          let transaction = db.transaction(storeName, 'readwrite');
          let store = transaction.objectStore(storeName);
          store.put(item);
    
          transaction.oncomplete = (event:any) => {
            // promise resolve here
            observer.next(event.target.result);
          };
    
          transaction.onerror = (event:any) => {
            observer.error(transaction.error);
          };
        };
      }
    });
  }

  // not checked at all!
  deleteOne(dbName:string, storeName:string, id:string):Observable<any> {
    return new Observable((observer)=>{

      let request = window.indexedDB.open(dbName, DB_VER);
      
      // handle errors opening DB
      request.onerror = (event:any) => {
        observer.error(request.error);
      };

      // handle any DB upgrades
      request.onupgradeneeded = (event:any) => {
        this.upgradeDB(event.target.result, storeName, observer.error);
      };

      request.onsuccess = (event:any) => {
        let db = request.result;
        let transaction = db.transaction(storeName, 'readwrite');
        let store = transaction.objectStore(storeName);
  
        let objStoreReq = store.delete(id);
  
        objStoreReq.onsuccess = (event:any) => {
          // resolve
          () => observer.next(event.target.result);
        };
  
        objStoreReq.onerror = (event:any) => {
          observer.error(objStoreReq.error);
        };
        transaction.onerror = (event:any) => {
          observer.error(transaction.error);
        };
      };
    });
  }

  // not checked at all!
  deleteAll(dbName:string, storeName:string):Observable<any> {
    return new Observable((observer)=>{

      let request = window.indexedDB.open(dbName, DB_VER);
      
      // handle errors opening DB
      request.onerror = (event:any) => {
        observer.error(request.error);
      };

      // handle any DB upgrades
      request.onupgradeneeded = (event:any) => {
        this.upgradeDB(event.target.result, storeName, observer.error);
      };

      request.onsuccess = (event:any) => {
        let db = request.result;
        let transaction = db.transaction(storeName, 'readwrite');
        let store = transaction.objectStore(storeName);
  
        let objStoreReq = store.clear();
  
        objStoreReq.onsuccess = (event:any) => {
          // resolve
          observer.next(event.target.result);
        };
  
        objStoreReq.onerror = (event:any) => {
          observer.error(objStoreReq.error);
        };
        transaction.onerror = (event:any) => {
          observer.error(transaction.error);
        };
      };
    });
  }
}
