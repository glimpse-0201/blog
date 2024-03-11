# JS中的浅拷贝与深拷贝



### 浅拷贝

```javascript
let originalValue = 42;
let copiedValue = originalValue;

let originalArray = [1, 2, 3];
let copiedArray1 = originalArray.slice();
let copiedArray2 = [...originalArray];

let originalObject = { name: "John", age: 30 };
let copiedObject1 = Object.assign({}, originalObject);
let copiedObject2 = { ...originalObject };
```



### 深拷贝

```javascript
// json
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// 手写
function deepCopy(obj) {
  // 检查是否为基本数据类型，如果是，则直接返回
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  // 创建一个新的对象或数组来存储拷贝的值
  const copy = Array.isArray(obj) ? [] : {};

  // 递归拷贝每个属性
  for (let key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      copy[key] = deepCopy(obj[key]);
    }
  }

  return copy;
}

// 第三方
import { cloneDeep } from 'lodash';
```



### 现代浏览器原生深拷贝

```javascript
structuredClone
```



不支持拷贝的类型：

- funciton
- Dom
- 属性描述、setter、getter
- 原型链