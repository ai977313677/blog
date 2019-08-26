在TypeScript中，直接使用getElementById('xxx').value获取输入框中的值会提示错误，但是程序依旧可以运行，且期望的结果是正确的。原因在于TypeScript会做类型检查，并且TypeScript中getElementById等返回的是一个HTMLElement对象，这个对象中不包含value属性，所以编译检查的时候会报错，我们需要对获取到的dom结点做一次类型转换或断言，如：
Let dom = <HTMLInputElement>document.getElementById('xxx');
或 let dom = document.getElementById('xxx') as HTMLInputElement;
这样操作之后，使用value属性就不再提示错误信息了。

另注：
HTMLElement是dom结点共有的属性，TypeScript库中抽取该属性作为一个公共接口，类似于其他面向对象语言如Java和c++中所说的基类。这样做可以保证在操作dom结点的时候不会出现访问不存在属性的问题。
HTMLInputElement是HTMLElement的一个子接口（或说子类，但TypeScript是支持class的，所以说接口更好一些），其内部封装了如input，textarea这类dom结点的属性。
