import { testSort } from '../src/core';
describe('blah', () => {
  it('works2', async () => {
    // setGunDB({
    //   peers: ['http://localhost:8080/gun'],
    // });
    // const postsCollection = new GunCollection('posts');
    // const rlt = await postsCollection.putItem({ title: 'title', body: 'body' });
    // console.log({ rlt });
    testSort([1, 2, 3, 8, 9, 10, 34], 35);
  });
});
