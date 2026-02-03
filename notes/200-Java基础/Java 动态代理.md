## 静态代理

### 实现原理

静态代理是在编译期就已经确定代理类和被代理类的关系，代理类需要手动编写。

### 实现方式

1. 定义接口
2. 创建被代理类实现接口
3. 创建代理类也实现相同接口
4. 代理类中持有被代理类的引用

```java
// 1. 定义接口
interface Subject {
    void request();
}

// 2. 被代理类
class RealSubject implements Subject {
    public void request() {
        System.out.println("RealSubject handling request");
    }
}

// 3. 代理类
class ProxySubject implements Subject {
    private RealSubject realSubject;
    
    public ProxySubject(RealSubject realSubject) {
        this.realSubject = realSubject;
    }
    
    public void request() {
        System.out.println("Proxy preprocessing");
        realSubject.request(); // 调用真实对象的方法
        System.out.println("Proxy postprocessing");
    }
}

// 使用
RealSubject real = new RealSubject();
Subject proxy = new ProxySubject(real);
proxy.request();
```

### 特点

- **优点**：
  - 简单直观，容易理解
  - 编译期就能确定代理关系，性能较好
- **缺点**：
  - 每个被代理类都需要一个代理类，代码冗余
  - 接口变化时，代理类和被代理类都需要修改
  - 灵活性差，无法在运行时动态改变代理逻辑

## 动态代理

### 实现原理

动态代理是在运行时动态生成代理类，不需要手动编写代理类代码。Java 主要通过 `java.lang.reflect.Proxy` 类和 `InvocationHandler` 接口实现。

### 实现方式

1. 定义接口
2. 创建被代理类实现接口
3. 实现 `InvocationHandler` 接口定义代理逻辑
4. 使用 `Proxy.newProxyInstance()` 动态创建代理对象

```java
// 1. 定义接口
interface Subject {
    void request();
}

// 2. 被代理类
class RealSubject implements Subject {
    public void request() {
        System.out.println("RealSubject handling request");
    }
}

// 3. 代理处理器
class DynamicProxyHandler implements InvocationHandler {
    private Object realSubject;
    
    public DynamicProxyHandler(Object realSubject) {
        this.realSubject = realSubject;
    }
    
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("DynamicProxy preprocessing");
        Object result = method.invoke(realSubject, args); // 反射调用真实对象方法
        System.out.println("DynamicProxy postprocessing");
        return result;
    }
}

// 使用
RealSubject real = new RealSubject();
Subject proxy = (Subject) Proxy.newProxyInstance(
    Subject.class.getClassLoader(),
    new Class[]{Subject.class},
    new DynamicProxyHandler(real)
);
proxy.request();
```

### 特点

- **优点**：
  - 一个代理类可以代理多个接口的多个类
  - 灵活性高，可以在运行时动态改变代理逻辑
  - 减少代码冗余，接口变化时只需修改被代理类
- **缺点**：
  - 使用反射机制，性能略低于静态代理
  - 只能代理接口，不能代理类（需要第三方库如CGLib才能代理类）
  - 生成的代理类比较"黑盒"，调试可能较困难

## 对比总结

| 特性         | 静态代理                       | 动态代理                         |
| :----------- | :----------------------------- | :------------------------------- |
| 实现时机     | 编译期                         | 运行期                           |
| 代理类生成   | 手动编写                       | JVM动态生成                      |
| 代码量       | 多（每个代理类都需要手动编写） | 少（通用代理处理器）             |
| 灵活性       | 低                             | 高                               |
| 性能         | 较高（直接调用）               | 略低（反射调用）                 |
| 适用场景     | 代理类较少、逻辑简单           | 代理类多、逻辑复杂或需要动态变化 |
| 代理对象类型 | 类和接口                       | 仅接口（除非使用CGLib等库）      |

动态代理广泛应用于框架中，如Spring AOP、RPC框架等，而静态代理则更适合简单、明确的代理需求。

## Spring AOP

Spring AOP (Aspect-Oriented Programming) 是基于动态代理实现的面向切面编程框架。下面我将从核心原理、实现机制和关键组件三个方面深入解析其实现方式。

### 1. 核心概念

AOP 术语

- Aspect（切面）：横切关注点的模块化

- Joinpoint（连接点）：程序执行过程中的某个点

- Pointcut（切点）：匹配连接点的表达式

- Advice（通知）：在切点执行的动作

- Target（目标对象）：被代理的对象

- Proxy（代理）：代理对象

- Weaving（织入）：将切面应用到目标对象的过程

通知类型

- @Before：前置通知

- @After：后置通知

- @AfterReturning：返回通知

- @AfterThrowing：异常通知

- @Around：环绕通知

### 2. 实现原理

#### 2.1 代理方式

Spring AOP 主要通过两种代理方式实现：

1. **JDK 动态代理**：基于接口的代理，要求目标类必须实现至少一个接口

```java
// 基于接口的代理
public class JdkDynamicProxy implements InvocationHandler {
    private final Object target;
    
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        // 前置通知
        beforeAdvice();
        
        // 调用目标方法
        Object result = method.invoke(target, args);
        
        // 后置通知
        afterAdvice();
        
        return result;
    }
}

```

2. **CGLIB 动态代理**：基于子类化的代理，通过生成目标类的子类来实现代理

```java
// 基于类的代理
public class CglibProxy implements MethodInterceptor {
    @Override
    public Object intercept(Object obj, Method method, Object[] args,
                          MethodProxy proxy) throws Throwable {
        // 前置通知
        beforeAdvice();
        
        // 调用目标方法
        Object result = proxy.invokeSuper(obj, args);
        
        // 后置通知
        afterAdvice();
        
        return result;
    }
}
```

#### 2.2 代理选择策略

Spring 根据目标对象类型自动选择代理方式：

- 如果目标对象实现了接口 → 默认使用 JDK 动态代理
- 如果目标对象没有实现接口 → 使用 CGLIB
- 可通过配置强制使用 CGLIB (`spring.aop.proxy-target-class=true`)

```java
public class DefaultAopProxyFactory implements AopProxyFactory {
    @Override
    public AopProxy createAopProxy(AdvisedSupport config) {
        if (config.isOptimize() || config.isProxyTargetClass() || 
            hasNoUserSuppliedProxyInterfaces(config)) {
            // 使用 CGLIB 代理
            return new CglibAopProxy(config);
        } else {
            // 使用 JDK 动态代理
            return new JdkDynamicAopProxy(config);
        }
    }
}
```

### 最佳实践

1. 代理选择

- 优先使用 JDK 动态代理

- 需要代理类时使用 CGLIB

2. 切点表达式

- 使用精确的切点表达式

- 避免过于宽泛的匹配

3. 性能优化

- 合理使用代理缓存

- 优化切点匹配逻辑

4. 异常处理

- 正确处理通知中的异常

- 保持异常栈信息