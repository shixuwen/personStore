# Typescript

## 基础类型

### 布尔值

```ts
let isDone: Boolean = false;
```

### 数字

* 支持二进制，八进制，十进制，十六进制

```ts
let num: Number = 10;
```

### 字符串

```ts
let str: String = 'string';
```

### 数组

* 一种方法时再数据类型后面街上[]

```ts
let list: Number[] = [1,2,3];
```

* 第二种方法是使用数组泛型

```ts
let list: Array<Number> = [1,2,3]; 
```

### 元组Tuple

* 可以定义一个包含指定类型的数组

```ts
let list: [String, Number];

list = ['hello', 10] // right
list = [10, 'hello'] // error
list[3] = 'world' // right,可以将字符串赋值给[string, number]
list[5].toString() // right, 元组内包含string
list[6] = true // error，元组内不包含boolean类型
```

### 枚举 enum




