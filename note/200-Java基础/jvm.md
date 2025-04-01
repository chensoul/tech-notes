## JVM 基本常识

Java虚拟机：

![jvm](assets/jvm.png)

JVM 架构图

![jvm-arch](assets/jvm-arch.png)

Java和JVM的关系：

![java-jvm](assets/java-jvm.png)

## 运行时区域

按照线程使用情况和职责分成两大类：

- 线程独享 （程序执行区域）
  - 不需要垃圾回收
  - 虚拟机栈、本地方法栈、程序计数器
- 线程共享 （数据存储区域）
  - 垃圾回收
  - 存储类的静态数据和对象数据
  - 堆和方法区



### 内存溢出

内存溢出和内存泄漏的区别？

- 内存溢出，俗称 OOM，是指当程序请求分配内存时，由于没有⾜够的内存空间，从⽽抛出 OutOfMemoryError。

- 内存泄漏通常是因为⻓期存活的对象持有短期存活对象的引⽤，⼜没有及时释放，从⽽导致短期存活对象⽆法被回收⽽导致的。

堆内存溢出

```java
/**
* VM Args：-Xms20m -Xmx20m -XX:+HeapDumpOnOutOfMemoryError
* @author zzm
*/
public class HeapOOM {
  static class OOMObject {
  }
  public static void main(String[] args) {
    List<OOMObject> list = new ArrayList<OOMObject>();
    while (true) {
    	list.add(new OOMObject());
    }
  }
}
```

如果线程请求的栈深度大于虚拟机所允许的深度，将会抛出 StackOverflowError 异常（-Xss）；

```java
/**
* VM Args：-Xss128k   StackOverflowError
* @author zzm
*/
public class JavaVMStackSOF {
  private int stackLength = 1;
  public void stackLeak() {
    stackLength++;
    stackLeak();
  }
  public static void main(String[] args) throws Throwable {
    JavaVMStackSOF oom = new JavaVMStackSOF();
    try {
    	oom.stackLeak();
    } catch (Throwable e) {
    	System.out.println("stack length:" + oom.stackLength);
    	throw e;
    }
  }
}
```

思考题：如果创建海量线程线程的时候，同时每个线程疯狂递归，请问到底是先OOM还是StackOverflowError？

```java
public class TestThread {
    public static void main(String[] args) {
        for (int i = 0; i < 100000; i++) {
            new Thread("Thread-" + i) {
                @Override
                public void run() {
                    try {
                        String name = Thread.currentThread().getName();
                        System.out.println(name);
                        recurive(30000);
                        TimeUnit.SECONDS.sleep(1);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    System.out.println();
                }
            }.start();
        }
    }

    public static void recurive(double d) {
        if (d == 0) return;
        recurive(d - 1);
    }
}
```

根据《Java虚拟机规范》的规定，如果方法区无法满足新的内存分配需求时，将抛出OutOfMemoryError异常。

```java
/**
* JDK7
* VM Args：-XX:PermSize=10M -XX:MaxPermSize=10M
* @author zzm
*/
public class JavaMethodAreaOOM {
  public static void main(String[] args) {
    while (true) {
      Enhancer enhancer = new Enhancer();
      enhancer.setSuperclass(OOMObject.class);
      enhancer.setUseCache(false);
      enhancer.setCallback(new MethodInterceptor() {
        public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Thro
          return proxy.invokeSuper(obj, args);
        }
      });
      enhancer.create();
    }
    
    static class OOMObject {
    }
  }
}
```

运行时常量池内存溢出

```java
/**
*  VM Args：-XX:PermSize=6M -XX:MaxPermSize=6M
* @author zzm
*/
public class RuntimeConstantPoolOOM {
  public static void main(String[] args) {
    // 使用Set保持着常量池引用，避免Full GC回收常量池行为
    Set<String> set = new HashSet<String>();
    // 在short范围内足以让6MB的PermSize产生OOM了
    short i = 0;
    while (true) {
    	set.add(String.valueOf(i++).intern());
    }
  }
}
```

直接内存超过物理内存限制，从而导致动态扩展时出现OutOfMemoryError异常。

```java
/**
* VM Args：-Xmx20M -XX:MaxDirectMemorySize=10M
* @author zzm
*/
public class DirectMemoryOOM {
	private static final int _1MB = 1024 * 1024;

	public static void main(String[] args) throws Exception {
    Field unsafeField = Unsafe.class.getDeclaredFields()[0];
    unsafeField.setAccessible(true);
    Unsafe unsafe = (Unsafe) unsafeField.get(null);
    while (true) {
      unsafe.allocateMemory(_1MB);
    }
  }
}
```

直接内存（堆外内存）与堆内存比较

- 直接内存申请空间耗费更高的性能，当频繁申请到一定量时尤为明显
- 直接内存IO读写的性能要优于普通的堆内存，在多次读写操作的情况下差异明显

```java
package com.chensoul.bookstore.api;

import java.nio.ByteBuffer;

public class ByteBufferCompare {
    public static void main(String[] args) {
        //allocateCompare(); //分配比较
        operateCompare(); //读写比较
    }

    /**
     * 直接内存 和 堆内存的 分配空间比较
     * 结论： 在数据量提升时，直接内存相比非直接内的申请，有很严重的性能问题
     */
    public static void allocateCompare() {
        int time = 1000 * 10000; //操作次数,1千万
        long st = System.currentTimeMillis();
        for (int i = 0; i < time; i++) {
            //ByteBuffer.allocate(int capacity) 分配一个新的字节缓冲区。
            ByteBuffer buffer = ByteBuffer.allocate(2); //非直接内存分配申请
        }
        long et = System.currentTimeMillis();
        System.out.println("在进行" + time + "次分配操作时，堆内存 分配耗时:" +
                (et - st) + "ms");
        long st_heap = System.currentTimeMillis();
        for (int i = 0; i < time; i++) {
            //ByteBuffer.allocateDirect(int capacity) 分配新的直接字节缓冲区。
            ByteBuffer buffer = ByteBuffer.allocateDirect(2); //直接内存分配申请
        }
        long et_direct = System.currentTimeMillis();
        System.out.println("在进行" + time + "次分配操作时，直接内存 分配耗时:" +
                (et_direct - st_heap) + "ms");
    }

    /**
     * 直接内存 和 堆内存的 读写性能比较
     * 结论：直接内存在直接的IO 操作上，在频繁的读写时 会有显著的性能提升
     */
    public static void operateCompare() {
        int time = 10 * 10000 * 10000; //操作次数,10亿
        ByteBuffer buffer = ByteBuffer.allocate(2 * time);
        long st = System.currentTimeMillis();
        for (int i = 0; i < time; i++) {
            // putChar(char value) 用来写入 char 值的相对 put 方法
            buffer.putChar('a');
        }
        buffer.flip();
        for (int i = 0; i < time; i++) {
            buffer.getChar();
        }
        long et = System.currentTimeMillis();
        System.out.println("在进行" + time + "次读写操作时，非直接内存读写耗时：" +
                (et - st) + "ms");
        ByteBuffer buffer_d = ByteBuffer.allocateDirect(2 * time);
        long st_direct = System.currentTimeMillis();
        for (int i = 0; i < time; i++) {
            // putChar(char value) 用来写入 char 值的相对 put 方法
            buffer_d.putChar('a');
        }
        buffer_d.flip();
        for (int i = 0; i < time; i++) {
            buffer_d.getChar();
        }
        long et_direct = System.currentTimeMillis();
        System.out.println("在进行" + time + "次读写操作时，直接内存读写耗时:" +
                (et_direct - st_direct) + "ms");
    }
```

输出：

- 在进行10000000次分配操作时，堆内存 分配耗时:82ms
- 在进行10000000次分配操作时，直接内存 分配耗时:6817ms
- 在进行1000000000次读写操作时，堆内存 读写耗时：1137ms
- 在进行1000000000次读写操作时，直接内存 读写耗时:512ms

为什么会是这样？
从数据流的角度，来看

- 非直接内存作用链：本地IO –>直接内存–>非直接内存–>直接内存–>本地IO
- 直接内存作用链：本地IO–>直接内存–>本地IO

直接内存的使用场景：

- 有很大的数据需要存储，它的生命周期很长
- 适合频繁的IO操作，例如：网络并发场景

## 类加载子系统

### 类加载的过程

在 JVM 中，**类加载（Class Loading）** 是将类的二进制数据加载到内存并转换为可执行的运行时数据结构的过程，整个过程分为 **加载（Loading）**、**链接（Linking）** 和 **初始化（Initialization）** 三个阶段。以下是完整的类加载流程及其技术细节：

#### **1.加载阶段**

**核心任务**

将类的 `.class` 文件二进制数据加载到内存，并在堆中生成对应的 `Class` 对象。

**具体步骤**

1. **定位类文件**
   - 通过类的全限定名（如 `java.lang.String`）查找 `.class` 文件。
   - 支持多种来源：文件系统、JAR 包、网络、动态生成（如动态代理）等。
2. **读取字节流**
   - 通过类加载器（`ClassLoader`）读取二进制数据。
3. **生成 `Class` 对象**
   - 在堆中创建 `java.lang.Class` 对象，作为访问类元数据的入口。

**代码示例**

```java
// 自定义类加载器加载类的核心逻辑
public class MyClassLoader extends ClassLoader {
    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        byte[] bytes = loadClassData(name);  // 从自定义来源读取字节码
        return defineClass(name, bytes, 0, bytes.length);  // 生成Class对象
    }
}
```

------

#### **2.链接阶段**

链接阶段进一步分为 **验证（Verification）**、**准备（Preparation）**、**解析（Resolution）** 三步。

**1. 验证（Verification）**

确保 `.class` 文件符合 JVM 规范且不会危害虚拟机安全。

| **验证类型** | **验证内容**                                     |
| :----------- | :----------------------------------------------- |
| 文件格式验证 | 魔数（`0xCAFEBABE`）、版本号、常量池合法性       |
| 元数据验证   | 类继承关系、字段/方法访问权限、是否实现抽象方法  |
| 字节码验证   | 操作数栈类型匹配、跳转指令合法性、类型转换有效性 |
| 符号引用验证 | 验证引用的类、方法、字段是否存在且可访问         |

**2. 准备（Preparation）**

为 **类变量（静态变量）** 分配内存并设置默认初始值（零值）。

| **数据类型** | **默认值** |
| :----------- | :--------- |
| `int`        | 0          |
| `long`       | 0L         |
| `boolean`    | false      |
| 引用类型     | null       |

- **注意**：`static final` 常量在此阶段直接赋真实值（编译期优化）。

**3. 解析（Resolution）**

将常量池中的 **符号引用** 转换为 **直接引用**（内存地址偏移量）。

| **解析目标** | **示例符号引用**                   | **转换结果**                   |
| :----------- | :--------------------------------- | :----------------------------- |
| 类或接口解析 | `java/lang/Object`                 | 指向方法区中 `Object` 类元数据 |
| 字段解析     | `User.id:I`                        | 字段 `id` 的内存偏移地址       |
| 方法解析     | `User.getName()Ljava/lang/String;` | 方法入口地址                   |

------

#### **3.初始化阶段**

执行类的 `<clinit>()` 方法，完成类变量的显式赋值和静态代码块的初始化。

一旦触发初始化，JVM会执行以下操作：

1. **执行类构造器`<clinit>()`方法**：

   合并所有静态变量赋值操作和静态代码块（按代码顺序执行）。

   ```
   class MyClass {
       static { System.out.println("静态代码块"); }  // 在<clinit>()中执行
       static int a = initValue();                 // 静态变量赋值
   }
   ```

2. **确保父类先初始化**：

   如果父类未初始化，先递归执行父类的初始化流程。

3. **接口初始化的特殊性**：

   接口的初始化不要求父接口全部初始化，只有在真正使用父接口时（如引用父接口的常量）才会触发。

**关键规则**

1. **触发条件**（严格且仅有以下情况触发初始化）：

   - `new` 创建对象、访问非 `final` 静态变量、调用静态方法。
   - 反射调用（如 `Class.forName()`）。
   - 初始化子类时父类未初始化。
   - JVM 启动的主类（包含 `main()` 方法）。

2. 不会触发初始化的场景：

   - **通过子类引用父类的静态字段**

     ```
     class Parent { static int value = 1; }
     class Child extends Parent {}
     int x = Child.value;  // 仅初始化Parent，Child不初始化
     ```

   - **通过数组定义引用类**

     ```
     MyClass[] arr = new MyClass[10];  // 不会触发MyClass初始化
     ```

   - **访问类的`final`常量**

     ```
     class Constants { public static final int MAX = 100; }
     int x = Constants.MAX;  // 常量在编译期优化，不触发初始化
     ```

3. **执行顺序**：

   - 父类的 `<clinit>()` 先于子类执行。
   - 静态变量赋值和静态代码块按代码顺序执行。

总结：

| **场景**                 | **是否触发初始化** | **示例**                          |
| :----------------------- | :----------------- | :-------------------------------- |
| `new`创建对象            | ✅                  | `new MyClass()`                   |
| 反射调用类               | ✅                  | `Class.forName("MyClass")`        |
| 子类初始化触发父类初始化 | ✅                  | `new Child()`（父类未初始化时）   |
| 访问非`final`静态字段    | ✅                  | `MyClass.staticField`             |
| 访问`final`常量          | ❌                  | `Constants.MAX`                   |
| 数组定义引用类           | ❌                  | `MyClass[] arr = new MyClass[10]` |

**初始化阶段的线程安全性**

JVM会通过加锁（`Class对象锁`）确保`<clinit>()`方法在多线程环境下只执行一次。

示例：

```java
// 多线程同时触发类初始化时，只有一个线程执行<clinit>()
new Thread(() -> new MyClass()).start();
new Thread(() -> new MyClass()).start();
```

**实际应用案例**

1. **延迟初始化（Lazy Initialization）**：

   ```
   class Singleton {
       private static class Holder {
           static final Singleton INSTANCE = new Singleton();  // 使用时才初始化
       }
       public static Singleton getInstance() {
           return Holder.INSTANCE;  // 触发Holder类初始化
       }
   }
   ```

2. **避免类初始化副作用**：

   ```
   // 通过反射获取Class对象但不触发初始化
   Class<?> clazz = MyClass.class;  // 不会触发初始化
   ```

#### **4. 类加载器与双亲委派模型**

**1.类加载器层级**

| **类加载器**              | **加载范围**                     | **实现类**                         |
| :------------------------ | :------------------------------- | :--------------------------------- |
| 启动类加载器（Bootstrap） | JRE核心库（`jre/lib/rt.jar`）    | C++实现，JVM内部组件               |
| 扩展类加载器（Extension） | JRE扩展库（`jre/lib/ext/*.jar`） | `sun.misc.Launcher$ExtClassLoader` |
| 应用类加载器（App）       | 用户类路径（ClassPath）          | `sun.misc.Launcher$AppClassLoader` |
| 自定义类加载器            | 自定义来源（网络、加密文件等）   | `ClassLoader` 的子类               |

**2. 双亲委派模型**

- **工作流程**：
  子类加载器在加载类时，优先委派父类加载器处理，父类无法完成时才自行加载。

- **核心代码**（`ClassLoader.loadClass()`）：

  ```java
  protected Class<?> loadClass(String name, boolean resolve) {
      synchronized (getClassLoadingLock(name)) {
          // 1. 检查是否已加载
          Class<?> c = findLoadedClass(name);
          if (c == null) {
              // 2. 委派父加载器
              if (parent != null) {
                  c = parent.loadClass(name, false);
              } else {
                  c = findBootstrapClassOrNull(name);
              }
              // 3. 父类未找到时自行加载
              if (c == null) {
                  c = findClass(name);
              }
          }
          return c;
      }
  }
  ```

- **作用**：

  - 避免类的重复加载，保证类全局唯一性（相同类名不同加载器的类视为不同类）
  - 保证核⼼类库的安全性

**3. 打破双亲委派模型**

#### **5. 类加载的应用场景**

**1. 热部署**

通过自定义类加载器重新加载修改后的类：

```java
// 每次修改后创建新的类加载器
MyClassLoader loader = new MyClassLoader();
Class<?> clazz = loader.loadClass("MyClass");
Object instance = clazz.newInstance();
```

**2. 模块化隔离**

- **OSGi**：通过类加载器实现模块（Bundle）的独立加载和依赖管理。
- **Tomcat**：每个 Web 应用使用独立的 `WebappClassLoader`，避免类冲突。

#### 性能优化

关键指标

| **阶段** | **耗时占比** | **优化方向**               |
| :------- | :----------- | :------------------------- |
| 加载     | 10%-20%      | 缓存已加载类、减少IO操作   |
| 验证     | 30%-40%      | 禁用验证（仅开发环境可用） |
| 初始化   | 50%-60%      | 延迟初始化、减少静态代码块 |

理解类加载机制是诊断类冲突、内存泄漏（如类卸载失败）和优化启动性能的关键

### 对象的创建

#### **1. 类加载检查**

- **触发条件**：当 `new` 指令（或反射、反序列化等）首次遇到一个未被加载的类时。
- **核心流程**：
  - 检查当前类的常量池中是否有该类的符号引用。
  - 若类未加载，触发类加载流程（加载 -> 链接 -> 初始化）。
  - **验证类是否已初始化**：未初始化的类会触发 `<clinit>` 方法执行（静态变量赋值和静态代码块）。

#### **2. 内存分配**

内存分配是对象创建的核心步骤，具体策略取决于 JVM 内存布局和垃圾收集器类型：

**分配方式**

| **内存分配策略** | **适用场景**                           | **实现原理**                                     |
| :--------------- | :------------------------------------- | :----------------------------------------------- |
| **指针碰撞**     | 堆内存规整（如 Serial、ParNew 收集器） | 通过指针移动分配内存（需开启内存压缩整理）       |
| **空闲列表**     | 堆内存碎片化（如 CMS 收集器）          | 维护空闲内存块列表，遍历寻找足够大的空闲区域分配 |

**并发处理**

- **CAS + 失败重试**：通过 `Atomic::cmpxchg_ptr` 原子指令实现线程安全分配。
- **TLAB（Thread-Local Allocation Buffer）**：
  - 每个线程预先在 Eden 区分配一小块私有内存（默认占 Eden 1%）。
  - 通过 `-XX:+UseTLAB` 开启，避免多线程竞争。
  - 对象优先在 TLAB 分配，空间不足时再走全局分配流程。

#### **3. 内存空间初始化**

- JVM 将分配的内存空间初始化为零值（默认值）：
  - 基本类型：`int` → `0`，`boolean` → `false` 等。
  - 引用类型：初始化为 `null`。
- **目的**：保证对象的实例字段在不显式初始化时也能直接使用。

#### **4. 设置对象头**

在HotSpot虚拟机里，对象在堆内存中的存储布局可以划分为三个部分：对象头、实例数据和对齐填充

对象头是 JVM 管理对象的关键元数据，包含以下信息（以 64 位 JVM 为例）：

| **组成部分**         | **大小** | **内容**                                                     |
| :------------------- | :------- | :----------------------------------------------------------- |
| **Mark Word**        | 8 字节   | 哈希码、GC 分代年龄、锁状态（偏向锁/轻量级锁/重量级锁）、线程持有锁等。 |
| **Klass Pointer**    | 4 字节   | 指向方法区中类元数据的指针（开启压缩指针时为 4 字节，否则 8 字节）。 |
| **数组长度（可选）** | 4 字节   | 仅数组对象需要，记录数组长度。                               |

对象布局示例：

```java
// Java 对象示例
class User {
    private int id;       // 4 字节
    private String name;  // 引用（4 字节，压缩指针开启时）
    private boolean vip;  // 1 字节（实际占用 4 字节对齐）
}

// 内存布局（假设开启压缩指针）：
// Mark Word（8） + Klass Pointer（4） + id（4） + name（4） + vip（4） = 24 字节
```

#### **5. 执行 `<init>` 方法（对象初始化）**

- **`<init>` 方法**：由编译器将代码中的构造函数、实例变量初始化和实例代码块合并生成。
- **执行顺序**：
  1. 父类 `<init>` 方法（递归执行）。
  2. 实例变量显式初始化（如 `int a = 5;`）。
  3. 实例代码块（`{ ... }`）。
  4. 构造函数代码。

#### **技术细节与优化**

**内存分配的 GC 处理**

- 空间担保机制：

- **触发 GC 条件**：

  - 若 Eden 区空间不足，触发 Minor GC；若 Survivor 区或老年代不足，触发 Full GC。

- **逃逸分析与栈上分配**：

  - JVM 通过逃逸分析（`-XX:+DoEscapeAnalysis`）将未逃逸对象分配在**栈上分配、同步消除、标量替换**。

    当对象被⽅法外部的代码引⽤，⽣命周期超出了⽅法的范围，那么对象就必须分配在堆中，由垃圾收集器管理。

    ```java
    public Person createPerson() {
    	return new Person(); // 对象逃逸出⽅法
    }
    ```

    再⽐如说，对象被另外⼀个线程引⽤，⽣命周期超出了当前线程，那么对象就必须分配在堆中，并且线程之间需要同步。

     ```java
    public void threadEscapeExample() {
      Person p = new Person(); // 对象逃逸到另⼀个线程
      new Thread(() -> {
      		System.out.println(p);
       }).start();
    }
     ```

  - **标量替换**：将对象拆分为基本类型字段分配在栈上（需开启 `-XX:+EliminateAllocations`）。

    如果对象的字段在⽅法中独⽴使⽤，JVM 可以将对象分解为标量变量，避免对象分配。

    ```java
    public void scalarReplacementExample() {
    	Point p = new Point(1, 2);
      System.out.println(p.getX() + p.getY());
    }
    ```

    如果 Point 对象未逃逸，JVM 可以优化为：

    ```java
    int x = 1;
    int y = 2;
    System.out.println(x + y);
    ```

**性能优化建议**

1. **减少大对象直接进入老年代**：通过 `-XX:PretenureSizeThreshold` 控制大对象分配策略。
2. **合理配置 TLAB 大小**：通过 `-XX:TLABSize` 调整避免频繁全局分配。
3. **避免内存对齐浪费**：优化字段顺序（如将 `long`/`double` 字段前置，减少填充字节）。



### 对象的内存布局

在 JVM 中，对象的内存布局是高效管理内存和优化程序性能的关键设计。以下是对象内存结构的详细解析（以 HotSpot 虚拟机为例）：

**对象内存布局（64位系统，开启压缩指针）**

```
┌───────────────────────────┐
│      对象头 (Header)     │
│   Mark Word       (8字节)   │
│   Klass Pointer   (4字节)   │
│   [数组长度]      (可选4字节) │
├───────────────────────────┤
│       实例数据 (Instance Data) │
│   - 基本类型字段              │
│   - 引用类型字段              │
├───────────────────────────┤
│      对齐填充 (Padding)       │
└───────────────────────────┘
```

#### **1. 对象头（Object Header）**

对象头包含 JVM 管理对象所需的元数据，占 **12-16 字节**（开启压缩指针）。

**1.1 Mark Word（8字节）**

存储对象运行时数据，通过**复用机制**在不同状态下表示不同内容：

| **对象状态**        | **存储内容**                                                 |
| :------------------ | :----------------------------------------------------------- |
| 无锁状态            | 哈希码（31位）、分代年龄（4位）、偏向模式（1位）、锁标志位（2位） |
| 偏向锁              | 持有线程ID（54位）、时间戳（Epoch，2位）、分代年龄（4位）、锁标志（001） |
| 轻量级锁（自旋锁）  | 指向栈中锁记录的指针（62位）                                 |
| 重量级锁（Monitor） | 指向 Monitor 对象的指针（62位）                              |
| GC标记              | 空（用于标记对象是否被回收）                                 |

**1.2 Klass Pointer（类型指针，4字节）**

- 指向方法区中的类元数据（`Klass` 对象），用于确定对象类型。
- 开启压缩指针（`-XX:+UseCompressedOops`）时占 4 字节，否则占 8 字节。

**1.3 数组长度（可选，4字节）**

- **仅数组对象特有**，记录数组长度（最大支持 232−1232−1 个元素）。
- 若对象不是数组，则无此部分。



#### **2. 实例数据（Instance Data）**

存储对象的所有**字段值**（包括继承自父类的字段），遵循以下规则：

**2.1 字段排列规则**

1. **父类字段在前，子类字段在后**
2. **基本类型优先**：`long/double` → `int` → `short/char` → `byte/boolean` → 引用类型
3. **紧凑策略**：允许字段重排序以最小化内存占用（可通过 `-XX:FieldsAllocationStyle=0|1|2` 控制）

**2.2 字段内存占用**

| **数据类型**     | **占用空间**           |
| :--------------- | :--------------------- |
| `byte`/`boolean` | 1 字节                 |
| `short`/`char`   | 2 字节                 |
| `int`/`float`    | 4 字节                 |
| `long`/`double`  | 8 字节                 |
| 引用类型         | 4 字节（压缩指针开启） |

**2.3 示例**

```
class Parent {
    int a;      // 4字节
}

class Child extends Parent {
    long b;     // 8字节
    Object c;   // 4字节（压缩指针）
    byte d;     // 1字节（实际占用4字节对齐）
}

// 内存布局：
// Mark Word (8) + Klass (4) + a (4) + b (8) + c (4) + d (1) + 填充 (3) = 32字节
```

#### **3. 对齐填充（Padding）**

- **作用**：确保对象起始地址是 8 字节的整数倍（64位系统要求），提升内存访问效率。
- **触发条件**：对象总大小不是 8 的倍数时自动填充。
- **示例**：若对象总大小为 30 字节，填充 2 字节达到 32 字节。

#### **关键技术优化**

**1. 字段重排序（Field Reordering）**

HotSpot 默认启用字段重排序优化，典型策略：

```
原始声明顺序：      long a; int b; Object c; byte d;
优化后内存布局：   long a (8) → int b (4) → Object c (4) → byte d (1) + 填充 (3)
```

通过紧凑排列减少内存碎片，可节省 20%-30% 内存空间。

**2. 压缩指针（Compressed OOPs）**

- 启用参数：`-XX:+UseCompressedOops`

- 将 64 位指针压缩为 32 位，通过**地址偏移计算**访问对象：

  ```
  实际地址 = 压缩指针值 << 3 + 堆基地址
  ```

- **限制**：堆内存需小于 32GB（232×8=32GB232×8=32*GB*）。

**3. 伪共享（False Sharing）防护**

- 使用 `@sun.misc.Contended` 注解避免不同线程字段共享同一缓存行：

  ```
  @Contended
  class Counter {
      volatile long value1; // 单独占用一个缓存行（64字节）
      volatile long value2; // 另一个缓存行
  }
  ```

- 需开启 `-XX:-RestrictContended`。

#### **内存布局查看工具**

**1. JOL（Java Object Layout）**

```
// 添加 Maven 依赖
<dependency>
    <groupId>org.openjdk.jol</groupId>
    <artifactId>jol-core</artifactId>
    <version>0.16</version>
</dependency>

// 打印对象布局
System.out.println(ClassLayout.parseInstance(obj).toPrintable());
```

**2. HSDB（HotSpot Debugger）**

```
# 启动 HSDB
java -cp sa-jdi.jar sun.jvm.hotspot.HSDB
```

可查看堆中对象详细内存结构。

#### **生产环境建议**

1. **优先使用基本类型**：减少引用类型字段以降低内存占用。
2. **避免过深继承层级**：父类字段会累加到每个子类实例中。
3. **大对象分离存储**：将大数组等数据通过引用分离，减少主对象体积。
4. **监控对象大小**：定期使用 JOL 分析关键类内存布局。



**总结**

| **组成部分** | **内容**                 | **优化方向**                     |
| :----------- | :----------------------- | :------------------------------- |
| 对象头       | 锁状态、GC信息、类型指针 | 压缩指针、偏向锁延迟初始化       |
| 实例数据     | 字段值                   | 字段重排序、基本类型优先         |
| 对齐填充     | 内存对齐                 | 减少不必要的填充（字段顺序优化） |

理解对象内存布局是诊断内存泄漏、优化程序性能的关键基础。

> 面试题：为什么⾮要进⾏ 8 字节对⻬呢？
> 因为 CPU 进⾏内存访问时，⼀次寻址的指针⼤⼩是 8 字节，正好是 L1 缓存⾏的⼤⼩。如果不进⾏内存对⻬，则可能出现跨缓存⾏访问，导致额外的缓存⾏加载，CPU 的访问效率就会降低。

> 面试题？new Object() 对象的内存⼤⼩是多少？
>
> ⼀般来说，⽬前的操作系统都是 64 位的，并且 JDK 8 中的压缩指针是默认开启的，因此在 64 位的 JVM 上， new Object() 的⼤⼩是 16 字节（12 字节的对象头 + 4 字节的对⻬填充）。
>
> 实例数据的⼤⼩取决于对象的成员变量和它们的类型。对于 new Object() 来说，由于默认没有成员变量，因此我们可以认为此时的实例数据⼤⼩是 0。
>
> 假如 MyObject 对象有三个成员变量，分别是 int、long 和 byte 类型，那么它们占⽤的内存⼤⼩分别是 4 字节、8 字节和 1 字节。
>
> 考虑到对⻬填充，MyObject 对象的总⼤⼩为 12（对象头） + 4（a） + 8（b） + 1（c） + 7（填充） = 32 字节。

> 面试题：对象的引⽤⼤⼩了解吗？
>
> 在 64 位 JVM 上，未开启压缩指针时，对象引⽤占⽤ 8 字节；开启压缩指针时，对象引⽤会被压缩到 4 字节。

### 对象的访问定位

在 JVM 中，**对象的访问定位**指的是通过引用（Reference）找到堆内存中对象实例的方式，其核心设计直接影响内存访问效率和垃圾回收（GC）性能。以下是两种主流实现方案及其技术细节：

#### **1. 句柄访问**

**内存结构**

```
堆内存布局：
┌─────────┐       ┌───────────┐       ┌───────────┐
│ 引用变量 │ ---→  │  句柄池     │ ---→  │ 对象实例  │
│ (栈帧中) │       ├─────┬─────┤       ├───────────┤
└─────────┘       │实例指针│类元指针│    │ 实例数据   │
                  └─────┴─────┘       └───────────┘
```

**核心特点**

1. **两级寻址**：引用指向句柄池中的句柄，句柄包含两个指针：
   - **实例数据指针**：指向堆中的对象实例（存储字段值）
   - **类型数据指针**：指向方法区的类元数据（Klass 元信息）
2. **GC 友好性**：对象移动时（如复制算法、标记-整理），只需更新句柄中的指针，无需修改引用变量。
3. **内存开销**：每个对象需额外占用句柄池空间（通常增加 8-16 字节）。

**适用场景**

- 早期 JVM（如 Sun Classic VM）
- 需要频繁移动对象的 GC 算法（如复制式 GC）

------

#### **2. 直接指针访问**

**内存结构**

```
堆内存布局：
┌───────────┐       ┌───────────────┐
│ 引用变量  │ ---→  │  对象实例     │
│ (栈帧中)  │       ├───────────────┤
└───────────┘       │ 对象头        │
                    │ (Mark Word)   │
                    │ 类型指针      │
                    │ (Klass Pointer) │
                    │ 实例数据      │
                    └───────────────┘
```

**核心特点**

1. **单级寻址**：引用直接指向堆中的对象实例，对象头中存储类型指针（指向方法区的类元数据）。
2. **访问高效**：减少一次指针跳转，访问速度比句柄快约 20%-30%（实测值）。
3. **内存紧凑**：无句柄池开销，内存利用率更高。
4. **GC 挑战**：对象移动时需更新所有引用变量（通过**指针碰撞**或**转发指针**技术解决）。

**实际应用**

- **HotSpot 默认方案**：所有主流垃圾收集器（如 G1、ZGC）均采用直接指针。
- **优化技术**：
  - **压缩指针（Compressed OOPs）**：将 64 位指针压缩为 32 位（`-XX:+UseCompressedOops`）。
  - **对象对齐填充**：确保对象起始地址为 8 字节的整数倍，提升寻址效率。

**技术对比**

| **维度**       | **句柄访问**               | **直接指针访问**       |
| :------------- | :------------------------- | :--------------------- |
| **访问速度**   | 较慢（两次指针跳转）       | 快（一次指针跳转）     |
| **GC 开销**    | 低（对象移动无需更新引用） | 高（需更新所有引用）   |
| **内存占用**   | 高（句柄池额外空间）       | 低（无句柄池）         |
| **实现复杂度** | 简单（GC 友好）            | 复杂（需处理指针更新） |
| **典型应用**   | 早期 JVM、移动端优化       | HotSpot、Azul Zing     |

**HotSpot 选择直接指针的原因**

1. **性能优先**：减少指针跳转次数对高频访问（如虚方法调用、字段读取）至关重要。
2. **硬件优化**：现代 CPU 缓存机制（Cache Line）更擅长处理连续内存访问。
3. **GC 技术进步**：
   - **转发指针（Forwarding Pointer）**：在对象移动时，旧对象头中保留新地址指针。
   - **并发标记算法**：ZGC/Shenandoah 通过读屏障（Load Barrier）实现并发引用更新。

**对象访问定位的底层实现（HotSpot 为例）**

**对象头解析**

```
// 对象头结构（64位系统，开启压缩指针）
class oopDesc {
  volatile markOop  _mark;  // Mark Word（8字节）
  union _metadata {
    Klass*      _klass;     // 类型指针（压缩后4字节）
    narrowKlass _compressed_klass; 
  } _metadata;
};
```

**字段访问示例**

```
User user = new User();
user.id = 100;  // 通过对象地址 + 字段偏移量直接访问
```

对应的机器指令：

```
mov 0x10(%rax), %ebx  ; 访问对象实例地址rax偏移0x10处的字段
```

**性能优化建议**

1. **减少对象层级**：深层次嵌套对象会增加指针跳转次数。
2. **优化字段顺序**：将高频访问字段靠近对象起始地址（减少缓存行填充）。
3. **避免伪共享**：通过 `@Contended` 注解（`-XX:-RestrictContended`）对齐字段。



**总结**

- **句柄访问**：以空间换稳定性，适合对象频繁移动的场景。
- **直接指针**：以速度为核心，通过 GC 算法优化克服更新难题。
- **现代 JVM 趋势**：直接指针 + 低停顿 GC（如 ZGC）成为标配，平衡效率与可维护性。

## 垃圾回收





## 性能调优与问题排查

### 相关工具

- JDK工具包
  - jps：查看Java进程
  - jstat：查看Java程序运行时相关信息
  - jinfo：查看正在运行的Java程序的扩展参数，甚至支持修改运行过程中的部分参数
  - jmap：用来查看堆内存使用状况，一般结合jhat使用。
  - jhat：解析Java堆转储文件，并启动一个 web server。然后用浏览器来查看/浏览 dump 出来的 heap二进制文件
  - jstack：堆栈跟踪工具，用于生成java虚拟机当前时刻的线程快照。
  - VisualVM：一款免费的性能分析工具。它通过 jvmstat、JMX、SA（Serviceability Agent）以及 Attach API 等多种方式从程序运行时获得实时数据，从而进行动态的性能分析。同时，它能自动选择更快更轻量级的技术尽量减少性能分析对应用程序造成的影响，提高性能分析的精度。
- 第三方工具
  - GCEasy
  - MAT
  - GCViewer
  - Arthas

### 问题排查

**1、CPU 占⽤过⾼**

⾸先，使⽤ top 命令查看 CPU 占⽤情况，找到占⽤ CPU 较⾼的进程 ID。

接着，使⽤ jstack 命令查看对应进程的线程堆栈信息。

```bash
jstack -l <pid> > thread-dump.txt
```

上⾯ 这个命令会将所有线程的堆栈信息输出到 thread-dump.txt ⽂件中。然后再使⽤ top 命令查看进程中线程的占⽤情况，找到占⽤ CPU 较⾼的线程 ID。

```bash
top -H -p <pid>
```

注意，top 命令显示的线程 ID 是⼗进制的，⽽ jstack 输出的是⼗六进制的，所以需要将线程 ID 转换为⼗六进制。

```bash
printf "%x\n" PID
```

接着在 jstack 的输出中搜索这个⼗六进制的线程 ID，找到对应的堆栈信息。

最后，根据堆栈信息定位到具体的业务⽅法，查看是否有死循环、频繁的垃圾回收、资源竞争导致的上下⽂频繁切换等问题。

**2、内存飙⾼**

内存飚⾼⼀般是因为创建了⼤量的 Java 对象导致的，如果持续飙⾼则说明垃圾回收跟不上对象创建的速度，或者内存泄漏导致对象⽆法回收。

先观察垃圾回收的情况，可以通过 `jstat -gc PID 1000` 查看 GC 次数和时间。或者使⽤ `jmap -histo PID | head -20` 查看堆内存占⽤空间最⼤的前 20 个对象类型。

通过 jmap 命令 dump 出堆内存信息。

```bash
jmap -dump:format=b,file=heap.prof 10025
```

使⽤可视化⼯具分析 dump ⽂件，⽐如说 VisualVM，找到占⽤内存⾼的对象，再找到创建该对象的业务

**3、频繁 minor gc 怎么办**

频繁的 Minor GC 通常意味着新⽣代中的对象频繁地被垃圾回收，可能是因为新⽣代空间设置的过⼩，或者是因为程序中存在⼤量的短⽣命周期对象（如临时变量）。
可以使⽤ GC ⽇志进⾏分析，查看 GC 的频率和耗时，找到频繁 GC 的原因。

```bash
-XX:+PrintGCDetails -Xloggc:gc.log
```

或者使⽤监控⼯具查看堆内存的使⽤情况，特别是新⽣代（Eden 和 Survivor 区）的使⽤情况。如果是因为新⽣代空间不⾜，可以通过 -Xmn 增加新⽣代的⼤⼩，减缓新⽣代的填满速度。

```bash
java -Xmn256m your-app.jar
```

如果对象需要⻓期存活，但频繁从 Survivor 区晋升到⽼年代，可以通过 -XX:SurvivorRatio 参数调整 Eden 和Survivor 的⽐例。默认⽐例是 8:1，表示 8 个空间⽤于 Eden，1 个空间⽤于 Survivor 区。

```bash
-XX:SurvivorRatio=6
```

调整为 6 的话，会减少 Eden 区的⼤⼩，增加 Survivor 区的⼤⼩，以确保对象在 Survivor 区中存活的时间⾜够⻓，避免过早晋升到⽼年代。

**4、频繁 Full GC 怎么办？**

**a. 通过 GC 日志定位原因**

```
// 启用详细 GC 日志
-XX:+PrintGCDetails 
-XX:+PrintGCDateStamps 
-Xloggc:/path/to/gc.log

// 示例日志片段
[Full GC (Metadata GC Threshold) [PSYoungGen: 1024K->0K(2048K)] 
  [ParOldGen: 4096K->5120K(8192K)] 5120K->5120K(10240K), 
  [Metaspace: 65536K->65536K(131072K)], 0.123456 secs]
```

**b. 常见问题与解决方案**

| **触发条件**          | **优化策略**                                                 |
| :-------------------- | :----------------------------------------------------------- |
| 老年代空间不足        | 增大堆大小（`-Xmx`），优化对象生命周期，减少大对象分配       |
| 元空间 OOM            | 增大 `-XX:MaxMetaspaceSize`，排查类加载器泄漏（如重复加载的代理类） |
| CMS 并发模式失败      | 增大老年代空间，降低 `-XX:CMSInitiatingOccupancyFraction`（提前触发 CMS GC） |
| G1 混合 GC 效率低     | 调整 `-XX:InitiatingHeapOccupancyPercent`，增加并发标记线程数 |
| 频繁 System.gc() 调用 | 添加 `-XX:+DisableExplicitGC`，重构代码移除显式 GC 调用      |

**c. 关键监控指标**

- **堆内存使用率**：通过 `jstat -gcutil <pid>` 监控老年代（O）和元空间（M）占比。
- **GC 停顿时间**：使用 APM 工具（如 Prometheus + Grafana）跟踪 Full GC 频率和持续时间。
- **对象晋升速率**：分析 `jstat -gc <pid>` 中 `OU`（老年代使用量）的增长速度。

**d.生产环境最佳实践**

**合理设置堆和元空间大小**：

```
-Xmx4g -Xms4g  # 避免堆动态扩容
-XX:MaxMetaspaceSize=512m
```

**优化 GC 策略**：

- **CMS 收集器**：

  ```
  -XX:+UseConcMarkSweepGC 
  -XX:CMSInitiatingOccupancyFraction=70  # 老年代70%时触发CMS
  ```

- **G1 收集器**：

  ```
  -XX:+UseG1GC 
  -XX:MaxGCPauseMillis=200  # 目标停顿时间
  ```

**避免内存泄漏**：

- 使用 `jmap -histo:live <pid>` 分析大对象分布。
- 通过 `Eclipse MAT` 分析堆转储文件（`-XX:+HeapDumpOnOutOfMemoryError`）。

## Java 内存模型

Java内存模型（Java Memory Model, JMM）是Java并发编程的核心，它定义了多线程环境下共享变量的访问规则，确保线程间的可见性、有序性和原子性。以下是JMM的关键要点总结：

### **1. JMM的核心概念**

- **主内存（Main Memory）**：所有共享变量存储的区域，线程间的数据交互通过主内存完成。
- **工作内存（Working Memory）**：每个线程独有，保存了主内存中共享变量的副本。线程对变量的操作在工作内存中进行，之后同步到主内存。

### **2. 三大问题与JMM的解决**

| **问题**   | **描述**                                                     | **JMM解决方案**                                              |
| :--------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| **可见性** | 一个线程修改共享变量，其他线程无法立即看到修改。             | 通过`volatile`、`synchronized`、`final`等关键字强制同步到主内存。 |
| **原子性** | 多线程操作共享变量时，某些操作可能被中断导致结果不一致。     | 使用`synchronized`、`Lock`或原子类（如`AtomicInteger`）保证操作的原子性。 |
| **有序性** | 编译器和处理器可能对指令重排序，导致程序执行顺序与代码不一致。 | 通过`happens-before`规则和内存屏障禁止特定重排序。           |

### **3. Happens-Before规则**

JMM通过以下规则定义操作之间的顺序，确保可见性和有序性：

| **规则**             | **说明**                                                     |
| :------------------- | :----------------------------------------------------------- |
| **程序顺序规则**     | 单线程中操作按代码顺序执行。                                 |
| **监视器锁规则**     | 解锁操作先于后续的加锁操作。                                 |
| **volatile变量规则** | volatile写操作先于后续的读操作。                             |
| **线程启动规则**     | `Thread.start()`调用先于新线程中的任何操作。                 |
| **线程终止规则**     | 线程中的所有操作先于其他线程检测到该线程终止（如`Thread.join()`）。 |
| **中断规则**         | 线程的中断（`interrupt()`）先于被中断线程检测到中断事件。    |
| **传递性规则**       | 若A happens-before B，B happens-before C，则A happens-before C。 |

### **4. Volatile关键字**

- **可见性**：写入volatile变量立即刷新到主内存，读取时从主内存重新加载。
- **禁止重排序**：通过插入内存屏障（Memory Barrier）确保编译器和处理器不重排序volatile操作。
- **局限性**：不保证复合操作（如`i++`）的原子性。

```
// 示例：volatile保证可见性
public class VolatileExample {
    private volatile boolean flag = false;

    public void writer() {
        flag = true; // 写操作对其他线程立即可见
    }

    public void reader() {
        if (flag) { // 总能读取到最新值
            // do something
        }
    }
}
```

### **5. 锁与Synchronized**

- **内存语义**：
  - 获取锁时，清空工作内存，从主内存重新加载共享变量。
  - 释放锁时，将工作内存的修改刷新到主内存。
- **原子性**：锁保护的代码块在同一时间只能被一个线程执行。

```
public class SynchronizedExample {
    private int count = 0;

    public synchronized void increment() {
        count++; // 原子性操作
    }
}
```

### **6. Final字段**

- **初始化安全**：构造函数中对final字段的写入，对其他线程可见（无需同步）。
- **不可变性**：若final字段引用不可变对象，线程安全；若引用可变对象，仍需同步。

```
public class FinalExample {
    private final List<String> list = new ArrayList<>();

    public void add(String item) {
        list.add(item); // 需同步保证线程安全
    }
}
```

### **7. 内存屏障**

JMM通过插入内存屏障指令（LoadLoad、StoreStore、LoadStore、StoreLoad）限制重排序：

| **屏障类型**   | **作用**                                                     |
| :------------- | :----------------------------------------------------------- |
| **LoadLoad**   | 确保该屏障前的读操作先于之后的读操作。                       |
| **StoreStore** | 确保该屏障前的写操作先于之后的写操作。                       |
| **LoadStore**  | 确保该屏障前的读操作先于之后的写操作。                       |
| **StoreLoad**  | 确保该屏障前的写操作对所有处理器可见（全能屏障，开销最大）。 |

------

### **8. 双重检查锁定（DCL）与JMM**

- **问题**：非volatile的单例模式DCL可能因指令重排序返回未完全初始化的对象。
- **解决**：使用`volatile`禁止重排序。

```
public class Singleton {
    private static volatile Singleton instance;

    public static Singleton getInstance() {
        if (instance == null) {                    // 第一次检查
            synchronized (Singleton.class) {       // 加锁
                if (instance == null) {            // 第二次检查
                    instance = new Singleton();    // volatile禁止重排序
                }
            }
        }
        return instance;
    }
}
```

### **9. JMM与硬件内存模型**

- **抽象与实现**：JMM是Java层面的抽象模型，底层依赖处理器的内存模型（如x86-TSO、ARM-weak）。
- **内存屏障实现**：不同处理器对屏障的支持不同，JVM需适配生成对应指令（如x86的`mfence`）。

### **总结**

- **JMM核心**：通过定义线程与主内存/工作内存的交互规则，解决多线程下的可见性、有序性和原子性问题。
- **关键工具**：`volatile`、`synchronized`、`happens-before`规则和内存屏障。
- **应用场景**：编写线程安全的单例、计数器、缓存等组件时，需严格遵循JMM规范。

理解JMM是避免并发Bug（如竞态条件、死锁、内存可见性问题）的基础，也是优化多线程程序性能的关键。