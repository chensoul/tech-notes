import{_ as a,o as n,c as i,ae as p}from"./chunks/framework.gns6yynO.js";const g=JSON.parse('{"title":"2. 架构设计","description":"","frontmatter":{},"headers":[],"relativePath":"architecture/DDD分层架构实践指南/02-架构设计.md","filePath":"architecture/DDD分层架构实践指南/02-架构设计.md"}'),l={name:"architecture/DDD分层架构实践指南/02-架构设计.md"};function e(t,s,r,o,h,c){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="_2-架构设计" tabindex="-1">2. 架构设计 <a class="header-anchor" href="#_2-架构设计" aria-label="Permalink to &quot;2. 架构设计&quot;">​</a></h1><h2 id="_2-1-四层架构模型" tabindex="-1">2.1 四层架构模型 <a class="header-anchor" href="#_2-1-四层架构模型" aria-label="Permalink to &quot;2.1 四层架构模型&quot;">​</a></h2><p>DDD分层架构采用经典的四层模型，每层都有明确的职责和边界：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────┐</span></span>
<span class="line"><span>│           接口层 (Interfaces)        │  ← 用户交互、API接口</span></span>
<span class="line"><span>├─────────────────────────────────────┤</span></span>
<span class="line"><span>│           应用层 (Application)       │  ← 业务流程编排、事务控制</span></span>
<span class="line"><span>├─────────────────────────────────────┤</span></span>
<span class="line"><span>│            领域层 (Domain)           │  ← 核心业务逻辑、业务规则</span></span>
<span class="line"><span>├─────────────────────────────────────┤</span></span>
<span class="line"><span>│         基础设施层 (Infrastructure)   │  ← 技术实现、外部依赖</span></span>
<span class="line"><span>└─────────────────────────────────────┘</span></span></code></pre></div><p><strong>架构特点：</strong></p><ul><li><strong>清晰的职责分离</strong>：每层专注于特定的关注点</li><li><strong>依赖方向控制</strong>：高层不依赖低层的具体实现</li><li><strong>业务逻辑隔离</strong>：核心业务逻辑与技术实现分离</li><li><strong>可测试性</strong>：每层都可以独立进行单元测试</li></ul><p><strong>依赖规则：</strong></p><ul><li><strong>接口层</strong> → 应用层：调用应用服务，不直接访问领域层或基础设施层</li><li><strong>应用层</strong> → 领域层：编排领域服务和聚合，通过接口访问基础设施层</li><li><strong>领域层</strong> → 无依赖：纯业务逻辑，不依赖任何外部框架</li><li><strong>基础设施层</strong> → 领域层：实现领域层定义的接口（依赖倒置）</li></ul><p><strong>典型调用流程：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户请求 → Controller → Application Service → Domain Service/Entity → Repository Interface → Repository Implementation</span></span></code></pre></div><p><strong>详细流程：</strong></p><ol><li><strong>用户发起请求</strong>：通过HTTP请求到达Controller</li><li><strong>接口层处理</strong>：Controller验证参数，转换DTO</li><li><strong>应用层编排</strong>：Application Service编排业务流程</li><li><strong>领域层执行</strong>：Domain Service或Entity执行业务逻辑</li><li><strong>数据层访问</strong>：通过Repository接口访问数据</li><li><strong>基础设施实现</strong>：Repository Implementation执行具体数据操作</li><li><strong>结果返回</strong>：逐层返回结果，最终响应用户</li></ol><h2 id="_2-2-项目结构" tabindex="-1">2.2 项目结构 <a class="header-anchor" href="#_2-2-项目结构" aria-label="Permalink to &quot;2.2 项目结构&quot;">​</a></h2><h3 id="_2-2-1-单体项目结构" tabindex="-1">2.2.1 单体项目结构 <a class="header-anchor" href="#_2-2-1-单体项目结构" aria-label="Permalink to &quot;2.2.1 单体项目结构&quot;">​</a></h3><p>基于DDD分层架构的标准项目结构，支持多领域场景下的&quot;领域+分层&quot;组织方式：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>src/</span></span>
<span class="line"><span>├── main/</span></span>
<span class="line"><span>│   ├── java/</span></span>
<span class="line"><span>│   │   └── com/example/app/</span></span>
<span class="line"><span>│   │       ├── AppApplication.java                    # 应用启动类</span></span>
<span class="line"><span>│   │       │</span></span>
<span class="line"><span>│   │       ├── user/                                  # 用户领域</span></span>
<span class="line"><span>│   │       │   ├── interfaces/                        # 用户接口层 - 负责与外部系统交互</span></span>
<span class="line"><span>│   │       │   │   ├── web/                           # Web控制器 - 处理HTTP请求</span></span>
<span class="line"><span>│   │       │   │   │   ├── UserController.java        # 用户管理控制器</span></span>
<span class="line"><span>│   │       │   │   │   └── UserProfileController.java # 用户资料控制器</span></span>
<span class="line"><span>│   │       │   │   ├── dto/                           # 数据传输对象 - 定义接口数据结构</span></span>
<span class="line"><span>│   │       │   │   │   ├── request/                   # 请求DTO</span></span>
<span class="line"><span>│   │       │   │   │   │   ├── CreateUserRequest.java # 创建用户请求</span></span>
<span class="line"><span>│   │       │   │   │   │   ├── UpdateUserRequest.java # 更新用户请求</span></span>
<span class="line"><span>│   │       │   │   │   │   └── UserQueryRequest.java  # 查询用户请求</span></span>
<span class="line"><span>│   │       │   │   │   └── response/                  # 响应DTO</span></span>
<span class="line"><span>│   │       │   │   │       ├── UserResponse.java      # 用户信息响应</span></span>
<span class="line"><span>│   │       │   │   │       └── UserProfileResponse.java # 用户资料响应</span></span>
<span class="line"><span>│   │       │   │   ├── assembler/                     # DTO转换器 - 负责DTO与领域对象转换</span></span>
<span class="line"><span>│   │       │   │   │   └── UserAssembler.java         # 用户对象组装器</span></span>
<span class="line"><span>│   │       │   │   ├── api/                           # API接口定义(如有)</span></span>
<span class="line"><span>│   │       │   │   │   └── UserApi.java               # 用户API接口</span></span>
<span class="line"><span>│   │       │   │   └── advice/                        # 控制器增强 - 处理异常、日志等</span></span>
<span class="line"><span>│   │       │   │       └── UserControllerAdvice.java  # 用户控制器增强</span></span>
<span class="line"><span>│   │       │   ├── application/                       # 用户应用层 - 协调领域对象完成业务用例</span></span>
<span class="line"><span>│   │       │   │   ├── service/                       # 应用服务 - 实现业务用例</span></span>
<span class="line"><span>│   │       │   │   │   ├── UserApplicationService.java # 用户应用服务</span></span>
<span class="line"><span>│   │       │   │   │   └── UserQueryService.java      # 用户查询服务</span></span>
<span class="line"><span>│   │       │   │   ├── command/                       # 命令对象 - 封装业务操作参数</span></span>
<span class="line"><span>│   │       │   │   │   ├── CreateUserCommand.java     # 创建用户命令</span></span>
<span class="line"><span>│   │       │   │   │   ├── UpdateUserCommand.java     # 更新用户命令</span></span>
<span class="line"><span>│   │       │   │   │   └── DeleteUserCommand.java     # 删除用户命令</span></span>
<span class="line"><span>│   │       │   │   ├── query/                         # 查询对象 - 封装查询参数</span></span>
<span class="line"><span>│   │       │   │   │   └── UserQuery.java             # 用户查询对象</span></span>
<span class="line"><span>│   │       │   │   ├── event/                         # 应用事件处理 - 处理领域事件</span></span>
<span class="line"><span>│   │       │   │   │   └── UserCreatedEventHandler.java # 用户创建事件处理器</span></span>
<span class="line"><span>│   │       │   │   └── apiResponse/                        # 应用结果对象 - 返回应用层结果</span></span>
<span class="line"><span>│   │       │   │       └── UserResult.java            # 用户结果对象</span></span>
<span class="line"><span>│   │       │   ├── domain/                            # 用户领域核心 - 包含核心业务逻辑</span></span>
<span class="line"><span>│   │       │   │   ├── model/                         # 领域模型 - 业务核心概念</span></span>
<span class="line"><span>│   │       │   │   │   ├── aggregate/                 # 聚合根 - 实体和值对象的集合</span></span>
<span class="line"><span>│   │       │   │   │   │   └── User.java              # 用户聚合根</span></span>
<span class="line"><span>│   │       │   │   │   └── entity/                    # 实体 - 有唯一标识的对象</span></span>
<span class="line"><span>│   │       │   │   │       └── UserProfile.java       # 用户资料实体</span></span>
<span class="line"><span>│   │       │   │   ├── valueobject/                   # 值对象 - 无唯一标识的对象</span></span>
<span class="line"><span>│   │       │   │   │   ├── PhoneNumber.java           # 电话号码值对象 - 复杂业务概念才使用值对象</span></span>
<span class="line"><span>│   │       │   │   │   └── Email.java                 # 邮箱值对象</span></span>
<span class="line"><span>│   │       │   │   ├── service/                       # 领域服务 - 不属于实体的业务逻辑</span></span>
<span class="line"><span>│   │       │   │   │   ├── UserDomainService.java     # 用户领域服务</span></span>
<span class="line"><span>│   │       │   │   │   └── PasswordService.java       # 密码服务</span></span>
<span class="line"><span>│   │       │   │   ├── repository/                    # 仓储接口 - 持久化领域对象</span></span>
<span class="line"><span>│   │       │   │   │   └── UserRepository.java        # 用户仓储接口</span></span>
<span class="line"><span>│   │       │   │   ├── factory/                       # 工厂 - 创建复杂领域对象</span></span>
<span class="line"><span>│   │       │   │   │   └── UserFactory.java           # 用户工厂</span></span>
<span class="line"><span>│   │       │   │   └── event/                         # 领域事件 - 领域模型状态变化通知</span></span>
<span class="line"><span>│   │       │   │       ├── UserCreatedEvent.java      # 用户创建事件</span></span>
<span class="line"><span>│   │       │   │       └── UserUpdatedEvent.java      # 用户更新事件</span></span>
<span class="line"><span>│   │       │   └── infrastructure/                    # 用户基础设施层 - 提供技术实现</span></span>
<span class="line"><span>│   │       │       ├── persistence/                   # 持久化实现 - 数据访问实现</span></span>
<span class="line"><span>│   │       │       │   ├── repository/                # 仓储实现 - 实现领域仓储接口</span></span>
<span class="line"><span>│   │       │       │   │   └── UserRepositoryImpl.java # 用户仓储实现</span></span>
<span class="line"><span>│   │       │       │   ├── mapper/                    # MyBatis映射器 - 数据库访问接口</span></span>
<span class="line"><span>│   │       │       │   │   └── UserMapper.java        # 用户Mapper</span></span>
<span class="line"><span>│   │       │       │   ├── po/                        # 持久化对象 - 映射数据库表结构</span></span>
<span class="line"><span>│   │       │       │   │   ├── UserPO.java            # 用户持久化对象</span></span>
<span class="line"><span>│   │       │       │   │   └── UserProfilePO.java     # 用户资料持久化对象</span></span>
<span class="line"><span>│   │       │       │   └── converter/                 # 转换器 - 领域对象与PO转换</span></span>
<span class="line"><span>│   │       │       │       └── UserConverter.java     # 用户转换器</span></span>
<span class="line"><span>│   │       │       ├── external/                      # 外部服务 - 集成外部系统</span></span>
<span class="line"><span>│   │       │       │   ├── UserNotificationService.java # 用户通知服务</span></span>
<span class="line"><span>│   │       │       │   └── ThirdPartyUserService.java # 第三方用户服务</span></span>
<span class="line"><span>│   │       │       ├── config/                        # 配置 - 模块特定配置</span></span>
<span class="line"><span>│   │       │       │   └── UserConfig.java            # 用户模块配置</span></span>
<span class="line"><span>│   │       │       └── cache/                         # 缓存 - 数据缓存实现</span></span>
<span class="line"><span>│   │       │           ├── UserCacheService.java      # 用户缓存服务</span></span>
<span class="line"><span>│   │       │           └── UserCacheKeyGenerator.java # 用户缓存键生成器</span></span>
<span class="line"><span>│   │       │</span></span>
<span class="line"><span>│   │       ├── order/                                 # 订单领域(示例) - 完整的订单上下文</span></span>
<span class="line"><span>│   │       │   ├── interfaces/                        # 订单接口层</span></span>
<span class="line"><span>│   │       │   │   ├── web/                           # Web控制器</span></span>
<span class="line"><span>│   │       │   │   │   └── OrderController.java       # 订单控制器</span></span>
<span class="line"><span>│   │       │   │   └── dto/                           # 数据传输对象</span></span>
<span class="line"><span>│   │       │   │       ├── request/                   # 请求DTO</span></span>
<span class="line"><span>│   │       │   │       └── response/                  # 响应DTO</span></span>
<span class="line"><span>│   │       │   ├── application/                       # 订单应用层</span></span>
<span class="line"><span>│   │       │   │   ├── service/                       # 应用服务</span></span>
<span class="line"><span>│   │       │   │   │   └── OrderApplicationService.java # 订单应用服务</span></span>
<span class="line"><span>│   │       │   │   └── command/                       # 命令对象</span></span>
<span class="line"><span>│   │       │   │       └── CreateOrderCommand.java    # 创建订单命令</span></span>
<span class="line"><span>│   │       │   ├── domain/                            # 订单领域层</span></span>
<span class="line"><span>│   │       │   │   ├── model/                         # 领域模型</span></span>
<span class="line"><span>│   │       │   │   │   ├── aggregate/                 # 聚合根</span></span>
<span class="line"><span>│   │       │   │   │   │   └── Order.java             # 订单聚合根</span></span>
<span class="line"><span>│   │       │   │   │   └── entity/                    # 实体</span></span>
<span class="line"><span>│   │       │   │   │       └── OrderItem.java         # 订单项实体</span></span>
<span class="line"><span>│   │       │   │   └── service/                       # 领域服务</span></span>
<span class="line"><span>│   │       │   │       └── OrderDomainService.java    # 订单领域服务</span></span>
<span class="line"><span>│   │       │   └── infrastructure/                    # 订单基础设施层</span></span>
<span class="line"><span>│   │       │       ├── persistence/                   # 持久化实现</span></span>
<span class="line"><span>│   │       │       │   ├── repository/                # 仓储实现</span></span>
<span class="line"><span>│   │       │       │   └── mapper/                    # MyBatis映射器</span></span>
<span class="line"><span>│   │       │       └── external/                      # 外部服务</span></span>
<span class="line"><span>│   │       │</span></span>
<span class="line"><span>│   │       └── shared/                                # 共享层 - 跨领域共享组件</span></span>
<span class="line"><span>│   │           ├── domain/                            # 共享领域组件 - 跨领域的领域概念</span></span>
<span class="line"><span>│   │           │   ├── valueobject/                   # 共享值对象 - 跨领域使用的值对象</span></span>
<span class="line"><span>│   │           │   │   └── Address.java               # 地址值对象</span></span>
<span class="line"><span>│   │           │   ├── entity/                        # 共享实体基类 - 实体通用行为</span></span>
<span class="line"><span>│   │           │   │   ├── BaseEntity.java            # 实体基类</span></span>
<span class="line"><span>│   │           │   │   └── AggregateRoot.java         # 聚合根基类</span></span>
<span class="line"><span>│   │           │   └── event/                         # 共享事件 - 领域事件基础设施</span></span>
<span class="line"><span>│   │           │       ├── DomainEvent.java           # 领域事件接口</span></span>
<span class="line"><span>│   │           │       ├── BaseDomainEvent.java       # 领域事件基类</span></span>
<span class="line"><span>│   │           │       └── DomainEventPublisher.java  # 领域事件发布器</span></span>
<span class="line"><span>│   │           ├── application/                       # 共享应用组件 - 跨应用层组件</span></span>
<span class="line"><span>│   │           │   ├── dto/                           # 共享DTO - 通用数据传输对象</span></span>
<span class="line"><span>│   │           │   │   └── ApiResponse.java           # 统一响应对象</span></span>
<span class="line"><span>│   │           │   └── service/                       # 共享应用服务 - 跨领域应用服务</span></span>
<span class="line"><span>│   │           │       ├── NotificationService.java   # 通知服务</span></span>
<span class="line"><span>│   │           │       └── IdGeneratorService.java    # ID生成服务</span></span>
<span class="line"><span>│   │           ├── infrastructure/                    # 共享基础设施 - 技术基础组件</span></span>
<span class="line"><span>│   │           │   ├── persistence/                   # 共享持久化组件 - 数据访问基础组件</span></span>
<span class="line"><span>│   │           │   │   ├── BaseMapper.java            # 基础Mapper接口</span></span>
<span class="line"><span>│   │           │   │   ├── BaseRepository.java        # 基础仓储接口</span></span>
<span class="line"><span>│   │           │   │   └── BaseRepositoryImpl.java    # 基础仓储实现</span></span>
<span class="line"><span>│   │           │   ├── cache/                         # 缓存组件 - 缓存基础设施</span></span>
<span class="line"><span>│   │           │   │   ├── CacheManager.java          # 缓存管理器</span></span>
<span class="line"><span>│   │           │   │   └── RedisCacheManager.java     # Redis缓存管理器</span></span>
<span class="line"><span>│   │           │   ├── security/                      # 安全组件 - 认证授权基础设施</span></span>
<span class="line"><span>│   │           │   │   ├── SecurityContext.java       # 安全上下文</span></span>
<span class="line"><span>│   │           │   │   ├── SecurityUtils.java         # 安全工具类</span></span>
<span class="line"><span>│   │           │   │   └── JwtTokenProvider.java      # JWT令牌提供者</span></span>
<span class="line"><span>│   │           │   └── messaging/                     # 消息组件 - 消息通信基础设施</span></span>
<span class="line"><span>│   │           │       ├── MessagePublisher.java      # 消息发布器</span></span>
<span class="line"><span>│   │           │       ├── MessageSubscriber.java     # 消息订阅器</span></span>
<span class="line"><span>│   │           │       └── KafkaMessagePublisher.java # Kafka消息发布器</span></span>
<span class="line"><span>│   │           ├── exception/                         # 异常处理 - 全局异常定义和处理</span></span>
<span class="line"><span>│   │           │   ├── BusinessException.java         # 业务异常</span></span>
<span class="line"><span>│   │           │   ├── DomainException.java           # 领域异常</span></span>
<span class="line"><span>│   │           │   ├── InfrastructureException.java   # 基础设施异常</span></span>
<span class="line"><span>│   │           │   ├── ApplicationException.java      # 应用层异常</span></span>
<span class="line"><span>│   │           │   └── GlobalExceptionHandler.java    # 全局异常处理器</span></span>
<span class="line"><span>│   │           ├── constant/                          # 常量定义 - 全局常量</span></span>
<span class="line"><span>│   │           │   ├── ErrorCode.java                 # 错误码</span></span>
<span class="line"><span>│   │           │   ├── BusinessConstant.java          # 业务常量</span></span>
<span class="line"><span>│   │           │   └── SystemConstant.java            # 系统常量</span></span>
<span class="line"><span>│   │           ├── annotation/                        # 自定义注解 - 框架扩展点</span></span>
<span class="line"><span>│   │           │   ├── DomainService.java             # 领域服务注解</span></span>
<span class="line"><span>│   │           │   ├── ApplicationService.java        # 应用服务注解</span></span>
<span class="line"><span>│   │           │   ├── ReadOnly.java                  # 只读操作注解</span></span>
<span class="line"><span>│   │           │   └── Audit.java                     # 审计注解</span></span>
<span class="line"><span>│   │           └── base/                              # 基础类 - 基础抽象类</span></span>
<span class="line"><span>│   │               ├── BaseEntity.java                # 实体基类</span></span>
<span class="line"><span>│   │               ├── BaseValueObject.java           # 值对象基类</span></span>
<span class="line"><span>│   │               ├── BaseRepository.java            # 仓储基类</span></span>
<span class="line"><span>│   │               └── BaseController.java            # 控制器基类</span></span>
<span class="line"><span>│   │</span></span>
<span class="line"><span>│   └── resources/</span></span>
<span class="line"><span>│       ├── application.yml                            # 主配置文件</span></span>
<span class="line"><span>│       ├── application-dev.yml                        # 开发环境配置</span></span>
<span class="line"><span>│       ├── application-test.yml                       # 测试环境配置</span></span>
<span class="line"><span>│       ├── application-prod.yml                       # 生产环境配置</span></span>
<span class="line"><span>│       ├── sql/                                        # 数据库脚本</span></span>
<span class="line"><span>│       └── messages/                                  # 国际化资源</span></span>
<span class="line"><span>│           ├── messages.properties                    # 默认消息</span></span>
<span class="line"><span>│           ├── messages_en.properties                 # 英文消息</span></span>
<span class="line"><span>│           └── messages_zh_CN.properties              # 中文消息</span></span></code></pre></div><p><strong>项目结构设计原则：</strong></p><ol><li><strong>领域+分层组织</strong>：多领域场景下，按&quot;领域+DDD分层&quot;方式组织包结构，每个领域内部完整实现DDD四层架构</li><li><strong>共享组件分离</strong>：分页对象、统一响应对象等共享组件放在shared层，避免重复定义</li><li><strong>值对象按需设计</strong>：避免过度设计，简单的字符串类型（如email、id）可直接使用基本类型，复杂的业务概念才使用值对象，是否创建值对象由开发者来判定和决定。</li><li><strong>严格的分层隔离</strong>：每层都有明确的边界，不允许跨层直接访问</li><li><strong>接口与实现分离</strong>：领域层定义接口，基础设施层提供实现</li><li><strong>配置外部化</strong>：所有配置都放在resources目录下，支持多环境</li><li><strong>资源按领域分类</strong>：XML映射文件等资源按领域分类存放</li></ol><h3 id="_2-2-2-微服务项目结构" tabindex="-1">2.2.2 微服务项目结构 <a class="header-anchor" href="#_2-2-2-微服务项目结构" aria-label="Permalink to &quot;2.2.2 微服务项目结构&quot;">​</a></h3><p>在微服务架构中，每个服务都是一个独立的DDD应用，遵循分层架构。服务之间通过API网关进行通信，共享的领域模型和基础设施可以提取为公共库。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>project/</span></span>
<span class="line"><span>├── project-shared/                # 共享模块</span></span>
<span class="line"><span>│   ├── project-shared-domain/     # 共享领域模型</span></span>
<span class="line"><span>│   │   ├── src/main/java/</span></span>
<span class="line"><span>│   │   │   └── com/example/shared/domain/</span></span>
<span class="line"><span>│   │   │       ├── valueobject/   # 共享值对象</span></span>
<span class="line"><span>│   │   │       ├── event/         # 共享领域事件</span></span>
<span class="line"><span>│   │   │       └── exception/     # 共享领域异常</span></span>
<span class="line"><span>│   ├── project-shared-application/ # 共享应用层组件</span></span>
<span class="line"><span>│   │   ├── src/main/java/</span></span>
<span class="line"><span>│   │   │   └── com/example/shared/application/</span></span>
<span class="line"><span>│   │   │       ├── dto/           # 共享DTO</span></span>
<span class="line"><span>│   │   │       └── command/       # 共享命令</span></span>
<span class="line"><span>│   └── project-shared-infrastructure/ # 共享基础设施</span></span>
<span class="line"><span>│       ├── src/main/java/</span></span>
<span class="line"><span>│       │   └── com/example/shared/infrastructure/</span></span>
<span class="line"><span>│       │       ├── persistence/   # 共享持久化组件</span></span>
<span class="line"><span>│       │       ├── messaging/     # 共享消息组件</span></span>
<span class="line"><span>│       │       ├── security/      # 共享安全组件</span></span>
<span class="line"><span>│       │       └── util/          # 共享工具类</span></span>
<span class="line"><span>├── project-user/                  # 用户服务</span></span>
<span class="line"><span>│   ├── project-user-api/          # 用户服务API模块</span></span>
<span class="line"><span>│   │   ├── src/main/java/</span></span>
<span class="line"><span>│   │   │   └── com/example/user/api/</span></span>
<span class="line"><span>│   │   │       ├── dto/           # API数据传输对象</span></span>
<span class="line"><span>│   │   │       ├── client/        # Feign客户端</span></span>
<span class="line"><span>│   │   │       └── fallback/      # 服务降级处理</span></span>
<span class="line"><span>│   └── project-user-service/      # 用户服务实现模块</span></span>
<span class="line"><span>│       ├── src/main/java/</span></span>
<span class="line"><span>│       │   └── com/example/user/</span></span>
<span class="line"><span>│       │       ├── interfaces/    # 接口层</span></span>
<span class="line"><span>│       │       ├── application/   # 应用层</span></span>
<span class="line"><span>│       │       ├── domain/        # 领域层</span></span>
<span class="line"><span>│       │       └── infrastructure/ # 基础设施层</span></span>
<span class="line"><span>│       └── src/main/resources/</span></span>
<span class="line"><span>│           └── application.yml</span></span>
<span class="line"><span>├── project-order/                 # 订单服务</span></span>
<span class="line"><span>│   ├── project-order-api/         # 订单服务API模块</span></span>
<span class="line"><span>│   └── project-order-service/     # 订单服务实现模块</span></span>
<span class="line"><span>├── project-gateway/               # API网关服务</span></span>
<span class="line"><span>│   ├── src/main/java/</span></span>
<span class="line"><span>│   │   └── com/example/gateway/</span></span>
<span class="line"><span>│   │       ├── filter/            # 网关过滤器</span></span>
<span class="line"><span>│   │       ├── config/            # 网关配置</span></span>
<span class="line"><span>│   │       └── security/          # 安全配置</span></span>
<span class="line"><span>│   └── src/main/resources/</span></span>
<span class="line"><span>│       └── application.yml</span></span>
<span class="line"><span>├── project-auth/                  # 认证授权服务</span></span>
<span class="line"><span>│   ├── src/main/java/</span></span>
<span class="line"><span>│   │   └── com/example/auth/</span></span>
<span class="line"><span>│   └── src/main/resources/</span></span>
<span class="line"><span>├── project-config/                # 配置服务</span></span>
<span class="line"><span>│   ├── src/main/java/</span></span>
<span class="line"><span>│   │   └── com/example/config/</span></span>
<span class="line"><span>│   └── src/main/resources/</span></span>
<span class="line"><span>│       └── config/                # 集中配置文件</span></span>
<span class="line"><span>└── project-registry/              # 服务注册中心</span></span>
<span class="line"><span>    ├── src/main/java/</span></span>
<span class="line"><span>    │   └── com/example/registry/</span></span>
<span class="line"><span>    └── src/main/resources/</span></span></code></pre></div><h2 id="_2-3-分层职责" tabindex="-1">2.3 分层职责 <a class="header-anchor" href="#_2-3-分层职责" aria-label="Permalink to &quot;2.3 分层职责&quot;">​</a></h2><h3 id="_2-3-1-接口层-interfaces-layer" tabindex="-1">2.3.1 接口层 (Interfaces Layer) <a class="header-anchor" href="#_2-3-1-接口层-interfaces-layer" aria-label="Permalink to &quot;2.3.1 接口层 (Interfaces Layer)&quot;">​</a></h3><p><strong>核心职责：</strong></p><ul><li>处理HTTP请求和响应</li><li>数据格式转换（DTO ↔ Domain Object）</li><li>输入验证和参数校验</li><li>异常处理和错误响应</li><li>国际化消息处理</li><li>API文档生成</li></ul><p><strong>主要组件：</strong></p><ul><li><strong>Controller</strong>：REST API 控制器，处理HTTP请求</li><li><strong>DTO</strong>：数据传输对象，定义API的输入输出格式</li><li><strong>Assembler</strong>：DTO 与领域对象的转换器</li><li><strong>Facade</strong>：为复杂操作提供简化接口</li></ul><p><strong>设计原则：</strong></p><ul><li>薄接口层：不包含业务逻辑，只负责协议转换</li><li>统一响应格式：所有API返回统一的响应结构</li><li>完整的输入验证：确保数据的有效性和安全性</li></ul><h3 id="_2-3-2-应用层-application-layer" tabindex="-1">2.3.2 应用层 (Application Layer) <a class="header-anchor" href="#_2-3-2-应用层-application-layer" aria-label="Permalink to &quot;2.3.2 应用层 (Application Layer)&quot;">​</a></h3><p><strong>核心职责：</strong></p><ul><li>业务流程编排和协调</li><li>事务边界控制</li><li>权限验证和安全控制</li><li>应用事件发布和处理</li><li>缓存管理</li><li>外部服务调用协调</li></ul><p><strong>主要组件：</strong></p><ul><li><strong>Application Service</strong>：应用服务，编排业务流程</li><li><strong>Command</strong>：命令对象，封装操作请求</li><li><strong>Query</strong>：查询对象，封装查询请求</li><li><strong>Event Handler</strong>：应用事件处理器</li><li><strong>Cache Service</strong>：缓存服务</li></ul><p><strong>设计原则：</strong></p><ul><li>无状态服务：应用服务不保存状态信息</li><li>事务边界：在应用层控制事务的开始和结束</li><li>编排不实现：编排领域服务，不实现具体业务逻辑</li></ul><h3 id="_2-3-3-领域层-domain-layer" tabindex="-1">2.3.3 领域层 (Domain Layer) <a class="header-anchor" href="#_2-3-3-领域层-domain-layer" aria-label="Permalink to &quot;2.3.3 领域层 (Domain Layer)&quot;">​</a></h3><p><strong>核心职责：</strong></p><ul><li>核心业务逻辑实现</li><li>业务规则和约束</li><li>领域模型定义</li><li>业务不变性保证</li><li>领域事件定义和发布</li></ul><p><strong>主要组件：</strong></p><ul><li><strong>Entity</strong>：领域实体，具有唯一标识的业务对象</li><li><strong>Value Object</strong>：值对象，通过属性值区分的对象</li><li><strong>Domain Service</strong>：领域服务，跨实体的业务逻辑</li><li><strong>Repository Interface</strong>：仓储接口，定义数据访问契约</li><li><strong>Factory</strong>：领域对象工厂，负责复杂对象的创建</li><li><strong>Domain Event</strong>：领域事件，表示业务中的重要事件</li></ul><p><strong>设计原则：</strong></p><ul><li>业务逻辑纯净：不依赖任何技术框架</li><li>充血模型：实体包含业务行为，不仅仅是数据容器</li><li>不变性保证：通过业务规则维护数据一致性</li></ul><h3 id="_2-3-4-基础设施层-infrastructure-layer" tabindex="-1">2.3.4 基础设施层 (Infrastructure Layer) <a class="header-anchor" href="#_2-3-4-基础设施层-infrastructure-layer" aria-label="Permalink to &quot;2.3.4 基础设施层 (Infrastructure Layer)&quot;">​</a></h3><p><strong>核心职责：</strong></p><ul><li>数据持久化实现</li><li>外部服务集成</li><li>技术框架配置</li><li>横切关注点实现</li><li>国际化和时区支持</li><li>消息队列集成</li></ul><p><strong>主要组件：</strong></p><ul><li><strong>Repository Implementation</strong>：仓储实现，具体的数据访问逻辑</li><li><strong>MyBatis Plus Mapper</strong>：数据访问映射</li><li><strong>DataObject (DO)</strong>：数据库实体对象，对应数据库表结构</li><li><strong>Converter</strong>：领域对象与数据库实体的转换器</li><li><strong>External Service</strong>：外部服务客户端</li><li><strong>Configuration</strong>：技术配置类</li><li><strong>I18n Support</strong>：国际化支持</li></ul><p><strong>命名约定说明：</strong></p><ul><li><strong>领域层Entity</strong>：领域实体，包含业务逻辑和业务规则，如 <code>User</code>、<code>Order</code></li><li><strong>基础设施层DataObject</strong>：数据库实体对象，纯数据结构，如 <code>UserDO</code>、<code>OrderDO</code></li><li>这样命名可以避免混淆，清晰区分业务模型和数据模型</li></ul><p><strong>设计原则：</strong></p><ul><li>实现抽象：实现领域层定义的接口</li><li>技术隔离：将技术细节封装在基础设施层</li><li>可替换性：支持不同技术实现的替换</li></ul><h3 id="_2-3-5-领域entity-vs-数据库dataobject" tabindex="-1">2.3.5 领域Entity vs 数据库DataObject <a class="header-anchor" href="#_2-3-5-领域entity-vs-数据库dataobject" aria-label="Permalink to &quot;2.3.5 领域Entity vs 数据库DataObject&quot;">​</a></h3><p>为了避免混淆，我们需要明确区分领域层的Entity和基础设施层的DataObject：</p><table tabindex="0"><thead><tr><th>对比维度</th><th>领域层Entity</th><th>基础设施层DataObject</th></tr></thead><tbody><tr><td><strong>命名约定</strong></td><td><code>User</code>、<code>Order</code>、<code>Product</code></td><td><code>UserDO</code>、<code>OrderDO</code>、<code>ProductDO</code></td></tr><tr><td><strong>核心职责</strong></td><td>业务逻辑和业务规则</td><td>数据持久化映射</td></tr><tr><td><strong>包含内容</strong></td><td>业务方法、验证逻辑、不变性保证</td><td>数据字段、数据库注解</td></tr><tr><td><strong>依赖关系</strong></td><td>不依赖任何技术框架</td><td>依赖MyBatis Plus、数据库</td></tr><tr><td><strong>生命周期</strong></td><td>由业务逻辑驱动</td><td>由数据访问驱动</td></tr><tr><td><strong>变更原因</strong></td><td>业务需求变化</td><td>数据库结构变化</td></tr></tbody></table><p><strong>示例对比：</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 领域层Entity - 包含业务逻辑</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> User</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> AggregateRoot</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ID</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    private</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ID id;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    private</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> String username;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    private</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> String email;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    private</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> UserStatus status;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 业务方法</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> activate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.status </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> UserStatus.DELETED) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            throw</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> DomainException</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;已删除用户无法激活&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.status </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> UserStatus.ACTIVE;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 发布领域事件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        addDomainEvent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> UserActivatedEvent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.id));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> changeEmail</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(String </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">newEmail</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 业务规则验证</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.status </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> UserStatus.ACTIVE) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            throw</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> DomainException</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;非活跃用户无法修改邮箱&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.email </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> newEmail;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 基础设施层DataObject - 纯数据结构</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">TableName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;users&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> UserDO</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">TableId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">type</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> IdType.ASSIGN_UUID)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    private</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> String id;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">TableField</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;username&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    private</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> String username;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">TableField</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;email&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    private</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> String email;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">TableField</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;status&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    private</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> String status;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">TableField</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;created_at&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    private</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> LocalDateTime createdAt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">TableField</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;updated_at&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    private</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> LocalDateTime updatedAt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 只有getter/setter，无业务逻辑</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><strong>转换关系：</strong></p><ul><li>通过Converter在领域Entity和DataObject之间进行转换</li><li>领域层不知道DataObject的存在</li><li>基础设施层负责两者之间的映射</li></ul><h2 id="_2-4-最佳实践" tabindex="-1">2.4 最佳实践 <a class="header-anchor" href="#_2-4-最佳实践" aria-label="Permalink to &quot;2.4 最佳实践&quot;">​</a></h2><h3 id="_2-4-1-依赖管理原则" tabindex="-1">2.4.1 依赖管理原则 <a class="header-anchor" href="#_2-4-1-依赖管理原则" aria-label="Permalink to &quot;2.4.1 依赖管理原则&quot;">​</a></h3><p><strong>1. 严格的分层依赖</strong></p><ul><li>接口层 → 应用层 → 领域层</li><li>基础设施层 → 领域层（实现仓储接口）</li><li>禁止跨层调用和循环依赖</li></ul><p><strong>2. 依赖倒置原则</strong></p><ul><li>高层模块不依赖低层模块</li><li>抽象不依赖具体实现</li><li>具体实现依赖抽象</li></ul><p><strong>3. 接口隔离原则</strong></p><ul><li>为不同的客户端定义不同的接口</li><li>避免胖接口，保持接口的单一职责</li></ul><h3 id="_2-4-2-事务控制策略" tabindex="-1">2.4.2 事务控制策略 <a class="header-anchor" href="#_2-4-2-事务控制策略" aria-label="Permalink to &quot;2.4.2 事务控制策略&quot;">​</a></h3><p><strong>事务边界原则：</strong></p><ul><li>在应用层控制事务边界</li><li>一个应用服务方法对应一个事务</li><li>避免跨应用服务的事务</li></ul><p><strong>事务配置最佳实践：</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Service</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Transactional</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">readOnly</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 默认只读事务</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> UserApplicationService</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Transactional</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">rollbackFor</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Exception.class)  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 写操作事务</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> UserDTO </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">createUser</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(CreateUserCommand </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">command</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 业务逻辑实现</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="_3-技术栈" tabindex="-1">3. 技术栈 <a class="header-anchor" href="#_3-技术栈" aria-label="Permalink to &quot;3. 技术栈&quot;">​</a></h2><p><strong>核心框架：</strong></p><ul><li><strong>Java 17+</strong>：使用最新的Java特性，如记录类、模式匹配等</li><li><strong>Spring Boot 3.5+</strong>：主框架，提供依赖注入和自动配置</li><li><strong>Spring Security 6.x</strong>：安全框架，处理认证和授权</li><li><strong>MyBatis Plus 3.x</strong>：数据访问层ORM框架，提供强大的查询能力</li></ul><p><strong>数据存储：</strong></p><ul><li><strong>MySQL 8.0</strong>：主数据库，支持JSON字段和窗口函数。使用 mysql-connector-j jdbc 驱动。</li><li><strong>HikariCP</strong>：高性能数据库连接池</li><li><strong>Redis 7.x</strong>：缓存和会话存储，支持多种数据结构</li><li><strong>Elasticsearch</strong>：搜索引擎，用于复杂查询和全文搜索</li></ul><p><strong>构建和部署：</strong></p><ul><li><strong>Maven 3.9+</strong>：构建工具和依赖管理</li><li><strong>Docker</strong>：容器化部署</li><li><strong>Docker Compose</strong>：本地开发环境编排</li></ul><p><strong>监控和运维：</strong></p><ul><li><strong>Spring Boot Actuator</strong>：应用监控和健康检查</li><li><strong>Micrometer</strong>：指标收集</li><li><strong>Logback</strong>：日志框架</li></ul><p><strong>测试框架：</strong></p><ul><li><strong>JUnit 5</strong>：单元测试框架，支持参数化测试和动态测试</li><li><strong>Mockito 5.x</strong>：模拟框架，用于创建测试替身</li><li><strong>AssertJ</strong>：流式断言库，提供更好的测试可读性</li><li><strong>TestContainers</strong>：集成测试容器，支持真实数据库和中间件测试</li><li><strong>Spring Boot Test</strong>：Spring Boot测试支持，包含各种测试切片</li><li><strong>WireMock</strong>：HTTP服务模拟，用于外部API测试</li><li><strong>Testcontainers-JUnit5</strong>：JUnit5与TestContainers集成</li></ul><p><strong>开发工具：</strong></p><ul><li><strong>Lombok</strong>：减少样板代码，自动生成getter/setter等</li><li><strong>Spring Boot DevTools</strong>：开发时热重载和自动重启</li><li><strong>Swagger/OpenAPI 3</strong>：API文档生成和在线测试</li><li><strong>Spring Boot Configuration Processor</strong>：配置元数据生成</li><li><strong>MapStruct</strong>：对象映射工具，编译时生成映射代码</li><li><strong>Spotless</strong>：代码格式化工具，保持代码风格一致</li><li><strong>ArchUnit</strong>：架构测试工具，验证架构规则</li></ul><p><strong>工具库：</strong></p><ul><li><strong>Apache Commons Lang3</strong>：通用工具类库</li><li><strong>Jackson</strong>：JSON序列化和反序列化</li><li><strong>Validation API</strong>：参数校验</li><li><strong>Guava</strong>：Google核心库，提供集合、缓存、并发等工具</li></ul><p><strong>禁止使用的依赖：</strong></p><ul><li><strong>Hutool</strong>：避免过度依赖工具库，保持代码的可控性</li><li><strong>Fastjson</strong>：存在安全风险，使用Jackson替代</li><li><strong>Spring Data JPA</strong>：与MyBatis Plus冲突，统一使用MyBatis Plus</li><li><strong>Apache Commons BeanUtils</strong>：性能较差，使用MapStruct替代</li><li><strong>Dozer</strong>：映射性能差，使用MapStruct替代</li><li><strong>ModelMapper</strong>：运行时映射，性能不如编译时的MapStruct</li><li><strong>Gson</strong>：功能不如Jackson完善，统一使用Jackson</li><li><strong>Log4j 1.x</strong>：已停止维护且存在安全漏洞，使用Logback</li><li><strong>Commons Logging</strong>：桥接复杂，直接使用SLF4J</li><li><strong>Quartz</strong>：过于重量级，简单任务使用Spring Task</li><li><strong>Ehcache 2.x</strong>：版本过旧，使用Caffeine或Redis</li><li><strong>Jedis</strong>：连接池管理复杂，使用Spring Data Redis</li><li><strong>HttpClient 4.x</strong>：版本过旧，使用Spring WebClient或OkHttp</li><li><strong>Swagger 2.x</strong>：已过时，使用OpenAPI 3</li><li><strong>JUnit 4</strong>：功能有限，使用JUnit 5</li><li><strong>Hamcrest</strong>：断言不够流畅，使用AssertJ</li><li><strong>PowerMock</strong>：与现代JVM不兼容，重构代码以支持Mockito</li></ul>`,89)])])}const d=a(l,[["render",e]]);export{g as __pageData,d as default};
