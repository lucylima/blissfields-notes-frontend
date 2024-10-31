import Dexie from "dexie";

export const db = new Dexie('BlissfieldsDatabase');

db.version(1).stores({
  user: `
    ++id, userID
  `
});