import sparkMD5 from 'spark-md5';

/**
 * 根据文件内容获取hash，同一个文件不管重命名还是改文件名后缀，hash都一样
 * @param file
 * @returns
 */
export const getHash = (file: File) => {
  return new Promise<{
    hash: string;
    ext: string;
    buffer: ArrayBuffer;
  }>((resolve) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      const spark = new sparkMD5.ArrayBuffer();
      const buffer = e.target!.result as ArrayBuffer;
      spark.append(buffer);
      const hash = spark.end();
      const arr = file.name.split('.');
      const ext = arr[arr.length - 1];
      resolve({ hash, ext, buffer });
    };
  });
};

// 文件切片
export const splitFile = (file: File) => {
  const chunkList: { chunk: Blob; chunkName: string }[] = [];
  // 先以固定的切片大小1024*100
  let max = 50 * 100;
  let count = Math.ceil(file.size / max);
  let index = 0;
  // 限定最多100个切片
  if (count > 100) {
    max = Math.ceil(file.size / 100);
    count = 100;
  }
  /**
   * 0：0,max
   * 1：max,2max
   * 2：2max,3max
   */
  while (index < count) {
    chunkList.push({
      chunkName: `${index}`,
      chunk: new File([file.slice(index * max, (index + 1) * max)], file.name),
    });
    index += 1;
  }
  return chunkList;
};

/** 使用json进行深克隆 */
export const deepCloneByJson = (T) => JSON.parse(JSON.stringify(T));

/** 深拷贝，解决循环引用 */
export const deepClone = (obj) => {
  // eslint-disable-next-line
  function clone(obj, hash) {
    const newobj = Array.isArray(obj) ? [] : {};
    // eslint-disable-next-line
    hash = hash || new WeakMap();
    if (hash.has(obj)) {
      return hash.get(obj);
    }
    hash.set(obj, newobj);

    Object.keys(obj).forEach((i) => {
      if (obj[i] instanceof Object) {
        newobj[i] = clone(obj[i], hash);
      } else {
        newobj[i] = obj[i];
      }
    });
    return newobj;
  }
  return clone(obj, undefined);
};

/** 深拷贝，解决循环引用。但不克隆key字段。 */
export const deepCloneExclude = (obj, key) => {
  // eslint-disable-next-line
  function clone(obj, hash) {
    const newobj = Array.isArray(obj) ? [] : {};
    // eslint-disable-next-line
    hash = hash || new WeakMap();
    if (hash.has(obj)) {
      return hash.get(obj);
    }
    hash.set(obj, newobj);

    Object.keys(obj).forEach((i) => {
      if (i !== key) {
        if (obj[i] instanceof Object) {
          newobj[i] = clone(obj[i], hash);
        } else {
          newobj[i] = obj[i];
        }
      }
    });
    return newobj;
  }
  return clone(obj, undefined);
};

/**
 * @description 格式化内存大小（要求传入的数字以byte为单位）
 * @param {number} val
 * @param {*} num 显示几位小数，默认2
 * @return {*}
 */
export const formatMemorySize = (val: number, num = 2) => {
  const oneByte = 1;
  const oneKb = oneByte * 1024;
  const oneMb = oneKb * 1024;
  const oneGb = oneMb * 1024;
  const oneTb = oneGb * 1024;
  const format = (v: number) => v.toFixed(num);
  if (val < oneKb) {
    return `${format(val / oneByte)}byte`;
  }
  if (val < oneMb) {
    return `${format(val / oneKb)}kb`;
  }
  if (val < oneGb) {
    return `${format(val / oneMb)}mb`;
  }
  if (val < oneTb) {
    return `${format(val / oneGb)}gb`;
  }
  return `${format(val / oneTb)}tb`;
};
