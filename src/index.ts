import Gun from 'gun/gun';
import { GunOptions } from 'gun';
import Collection from './Collection';
import { GLOBAL } from './constants';

export function setGunDB(options?: GunOptions | undefined) {
  if (options) {
    GLOBAL.gunDb = Gun(options);
  }
}

export function getGunDB() {
  if (!GLOBAL.gunDb) {
    throw new Error('You need use setGunDB first, before getCollection');
  }
  return GLOBAL.gunDb;
}

export const GunCollection = Collection;
