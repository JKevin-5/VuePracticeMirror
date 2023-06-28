---
title: Spring Aop理解与应用
description:
sidebar: auto
editLink: false
---

## Aop的含义
> 以下由gpt生成。

Spring AOP（Aspect-Oriented Programming，面向切面编程）是 Spring 框架中的一个重要特性，用于实现横切关注点的模块化和复用。

在传统的面向对象编程中，我们将功能模块划分为不同的类，每个类负责某个特定的功能。然而，有些功能在多个类中都会出现，例如日志记录、性能监控、事务管理等。这些功能与业务逻辑无关，但又必须在各个类中进行重复编写，导致代码冗余和维护困难。

Spring AOP 提供了一种解决方案，通过将这些横切关注点从业务逻辑中分离出来，以切面（Aspect）的形式进行统一管理。切面是一个模块化的单元，它封装了一系列与横切关注点相关的行为，例如前置通知、后置通知、异常通知、环绕通知等。通过将切面织入到目标对象中，可以在目标对象的方法执行前、执行后或发生异常时，自动执行切面中定义的行为，从而实现了横切关注点的复用和解耦。

Spring AOP 使用了动态代理的机制来实现切面的织入。它可以基于 JDK 动态代理或 CGLIB 动态代理来生成代理对象，将切面织入到目标对象中。对于基于接口的代理，使用 JDK 动态代理；对于没有实现接口的类，使用 CGLIB 动态代理。

总结来说，Spring AOP 是一种通过切面的方式来实现横切关注点的模块化和复用的技术，可以在不修改原有业务逻辑的情况下，增加额外的功能。

## Aop注解开发
> 以AccessLog为例，用于记录当前
1. 首先需要写一个主类
    ```java
    import java.lang.annotation.ElementType;
    import java.lang.annotation.Retention;
    import java.lang.annotation.RetentionPolicy;
    import java.lang.annotation.Target;

    @Target({ElementType.METHOD, ElementType.TYPE})
    @Retention(RetentionPolicy.RUNTIME)
    public @interface AccessLog {
    }
    ```
2. 写Aop注解的切入点逻辑
    ```java
    @Aspect
    @Component
    public class AccessLogAspect {
        
        /**
        * 切入点
        */
        @Pointcut("@annotation(com.xxx.common.aop.AccessLog)")
        public void accessLog() {}
        
        @Before("accessLog()")
        public void doBefore(JoinPoint joinPoint){
            
            // 通过Signature可以使用反射获取所有对象以及方法的信息
            Object target = joinPoint.getTarget();
            Signature signature = joinPoint.getSignature();
            
            // 获取当前请求url
            RequestAttributes attributes = RequestContextHolder.getRequestAttributes();
            ServletRequestAttributes servlet = (ServletRequestAttributes) attributes;
            HttpServletRequest request = servlet.getRequest();
            String requestUrl = request.getRequestURI();
            
            // 所有参数列表
            Object[] args = joinPoint.getArgs();
            
            LogUtil.debugLog.info("用户：{}, 类名：{}, 方法名：{}, 访问url：{}, 参数：{}","Kevin",target.getClass().getName(),signature.getName(),requestUrl,args);
            
        }
    }
    ```
3. 具体使用
    > 不论是在哪个层的代码方法上都可以使用该注解，这就是aop切面编程的魅力。
    ```java
    @AccessLog
    public void test() {
        ...
    }
    ```