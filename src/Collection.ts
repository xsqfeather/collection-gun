import { v4 as uuidv4 } from 'uuid';

import { GLOBAL } from './constants';

interface Where {
  [x: string]: null | string | number;
}

interface Pagination {
  skip: number;
  limit: number;
}

interface GetPagedParams {
  where?: Where;
  pagination?: Pagination;
  sort: -1 | 1;
}

export default class Collection {
  private collection: any;

  constructor(collectionName: string) {
    if (!GLOBAL.gunDb) {
      throw new Error('You need use setGunDB first, before getCollection');
    }
    const root = GLOBAL.gunDb.get('root');
    this.collection = root.get(collectionName);

    let biggestIndexNumber = 0;
    // let smallestIndexNumber = 0;

    const getIndexedData = (index: number, key: string) => {
      return new Promise(res => {
        root
          .get(`${collectionName}-${key}`)
          .get(`downIndex${index}`)
          .once((data: any) => {
            res(data);
          });
      });
    };
    const putIndexedData = (index: number, key: string, data: any) => {
      return new Promise(res => {
        root
          .get(`${collectionName}-${key}`)
          .get(`downIndex${index}`)
          .put(data, (ack: any) => {
            res(ack);
          });
      });
    };

    this.collection.map().on(async (data: any) => {
      for (const valueKey in data) {
        if (Object.prototype.hasOwnProperty.call(valueKey, valueKey)) {
          const value = data[valueKey];
          let dataToCompare: any = await getIndexedData(
            biggestIndexNumber,
            valueKey
          );
          if (!dataToCompare) {
            await putIndexedData(biggestIndexNumber, valueKey, data);
            dataToCompare = await getIndexedData(biggestIndexNumber, valueKey);
          }
          while (dataToCompare[valueKey] < value[valueKey]) {
            dataToCompare = await getIndexedData(biggestIndexNumber, valueKey);
            biggestIndexNumber++;
            await putIndexedData(biggestIndexNumber, valueKey, dataToCompare);
          }
          await putIndexedData(biggestIndexNumber, valueKey, data);
        }
      }
    });
  }

  getPaged(pagePrams: GetPagedParams) {
    if (pagePrams) {
    }
  }
  putItem(input: any) {
    return new Promise((res: any, rej: any) => {
      if (!input.id) {
        input.id = uuidv4();
      }
      this.collection.put(
        {
          [input.id]: {
            ...input,
          },
        },
        (ack: any) => {
          if (ack.ok) {
            this.collection.get(input.id).once((data: any) => {
              res(data);
            });
          } else {
            rej(ack.err);
          }
        }
      );
    });
  }
  getItem(id: string) {
    return new Promise((res: any, rej: any) => {
      this.collection.get(id).once((data: any) => {
        if (data) {
          res(data);
        } else {
          rej(data);
        }
      });
    });
  }
  nullItem() {}
}
