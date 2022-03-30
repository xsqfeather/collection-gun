export function sort(list: any, value: any) {
  let length = list.getLength();
  if (length === 0) {
    list.setIndexData(length + 1, value);
  }
  let comparedIndex = Math.ceil(length / 2);
  const dataToCompare = list.getIndexData(comparedIndex);
  if (value > dataToCompare) {
    sort(list.subList(comparedIndex, length), value);
  } else {
    list.setIndexData(comparedIndex, value);
  }
}

export function testSort(list: number[], value: number) {
  let length = list.length;
  if (length === 1) {
    console.log(list[0]);
    console.log('需要替换');

    return;
  }
  if (length === 0) {
    console.log('不用替换');
    list[length] = value;
    return;
  }

  let comparedIndex = Math.floor(length / 2);

  const dataToCompare = list[comparedIndex];
  console.log({ comparedIndex, list, length, dataToCompare });
  if (value > dataToCompare) {
  } else {
  }
}
