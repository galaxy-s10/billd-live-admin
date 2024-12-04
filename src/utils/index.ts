import sparkMD5 from 'spark-md5';
import UAParser from 'ua-parser-js';

/**
 * 获取日期当天的开始时间到结束时间
 */
export function dateStartAndEnd(date: Date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const startTime = `${y}/${m}/${d} 00:00:00`;
  const endTime = `${y}/${m}/${d} 23:59:59`;
  return {
    startTime,
    endTime,
  };
}

/**
 * 给一个秒数，返回x时x分x秒
 * @param num
 */
export function convertToTime(num: number) {
  // 计算天数、小时、分钟和秒数
  const days = Math.floor(num / (24 * 3600));
  const hours = Math.floor((num % (24 * 3600)) / 3600);
  const minutes = Math.floor((num % 3600) / 60);
  const seconds = Math.floor(num % 60);

  if (days) {
    return `${days}天${hours}时${minutes}分${seconds}秒`;
  } else if (hours) {
    return `${hours}时${minutes}分${seconds}秒`;
  } else if (minutes) {
    return `${minutes}分${seconds}秒`;
  } else {
    return `${seconds}秒`;
  }
}

export function formatMoney(money?: number) {
  if (!money) {
    return '0.00';
  }
  return (money / 100).toFixed(2);
}

// 解析user-agent
export function parseUa(v) {
  try {
    const parser = new UAParser();
    const uaParser = parser.setUA(v);
    const uaResult = uaParser.getResult();
    const osName = uaResult.os.name;
    const res = String(osName).toLocaleLowerCase();
    let res1 = res;
    if ('android' === res) {
      res1 = 'android';
    } else if ('ios' === res) {
      res1 = 'iphone';
    }
    return res1;
  } catch (error) {
    console.log(error);
    return '';
  }
}

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
