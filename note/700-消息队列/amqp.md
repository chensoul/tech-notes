AMQP 是一个开放标准的面向消息中间件设计的应用层协议。它是一个二进制协议，主要特点是面向消息、队列、路由（包括点对点和发布/订阅）、可靠性和安全。

其目的是通过协议使应用模块之间或应用程序与中间件等进行充分解耦。而在设计初期，AMQP的原始用途只是为金融界提供一个可以彼此协作的消息协议。现在已经有相当一部分遵循AMQP的服务器和客户端供使用。其中RabbitMQ是AMQP的一款开源标准实现。

## AMQP概述

AMQP是一种二进制应用层协议，用于应对广泛的面向消息应用程序的支持。协议提供了消息流控制，保证的一个消息对象的传递过程，如*至多一次*、*保证多次*、*仅有一次*等，和基于SASL和TLS的身份验证和消息加密。

## 消息中间件发展历史

早期商业产品阶段（20世纪80年代-90年代）

- **The Information Bus（TIB）**：1985年，Vivek Ranadive创立了Teknekron公司，并开发了世界上第一个消息中间件TIB（The Information Bus），主要用于金融行业，采用发布订阅模式。
- **IBM MQ**：1993年，IBM推出了MQSeries（后更名为WebSphere MQ），成为当时最具代表性的商业消息中间件，主要用于大型企业。

开源与标准化阶段（2000年-2007年）

- **JMS标准**：为了能够让消息在各个消息队列平台间互融互通，1998年，Java Message Service（JMS）诞生。JMS 试图通过提供公共 Java API 的方式，隐藏单独 MQ 产品供应商提供的实际接口，从而跨越了壁垒，解决了互通问题。从技术上讲， Java 应用程序只需 针对 JMS API 编程，选择合适的 MQ 驱动即可， JMS 会打理好其他部分 。ActiveMQ 就是 JMS 的 一种实现 。不过尝试使用单独标准化接口来胶合众多不同的接口，最终会暴露出问题，使得应用程序变得更加脆弱 ，所以急需一种新的消息通信标准化方案 。
- **AMQP标准**：2003年，AMQP（Advanced Message Queuing Protocol）协议被提出，它为面向消息的中间件设计，基于此协议的客户端与消息中间件可传递消息，并不受产品、开发语言等条件的限制 。
- **ActiveMQ和RabbitMQ**：2004年，ActiveMQ作为JMS的实现之一出现。2007年，RabbitMQ诞生，是第一个完全实现AMQP协议的消息中间件，支持多语言客户端。

大数据与互联网阶段（2007年-2018年）

- **Kafka**：2010年，LinkedIn 在开发 Kafka 用于处理大数据流时，觉得AMQP规范并不适合自己，所以Kafka并不支持AMQP协议，2011年 Kafka 开源。Kafka以其高吞吐量和分布式架构迅速成为大数据处理领域的核心组件。
- **RocketMQ**：2012年，阿里巴巴开源了RocketMQ，借鉴了Kafka的架构思想，适用于大规模分布式系统。在Kafka和RocketMQ中都有类似Topic和Consumer Group的概念，而这些概念在AMQP协议中是不存在的。

云原生与微服务阶段（2014年至今）

- **云原生消息中间件**：随着云计算和微服务架构的普及，云原生消息中间件如Amazon SQS、Azure Service Bus等出现，提供全托管服务。
- **Apache Pulsar**：2016年，Yahoo开源了Pulsar，它结合了Kafka和RabbitMQ的优点，支持多租户和跨地域复制，适应云原生环境。

## AMQP发展历史

1. **起源（2003-2006）**

- **背景**：
  早期的消息中间件（如IBM MQ、TIBCO）多为商业闭源产品，协议不开放且互操作性差。金融行业（如银行、交易所）需要高可靠、低延迟的消息系统，但传统方案成本高且难以扩展。
- **发起者**：
  2003年，摩根大通（JPMorgan Chase）联合其他金融机构（如高盛、瑞士信贷）提出开发一种**开放、标准化**的消息协议，以解决不同系统间的兼容性问题。
- **初始设计**：
  早期版本（如AMQP 0.8）由摩根大通的工程师主导设计，核心目标是定义消息格式、路由规则和网络协议，确保不同厂商实现互操作。

2. **标准化与社区发展（2006-2011）**

- **AMQP 0-9-1（2006）**：
  这是首个广泛采用的稳定版本，定义了核心概念（如Exchange、Queue、Binding），并被多个开源项目实现，最著名的是**RabbitMQ**（由Rabbit Technologies开发，后由Pivotal支持）。
- **AMQP 1.0（2011）**：
  - 由OASIS（结构化信息标准促进组织）正式标准化，解决了早期版本的复杂性并简化协议。
  - 引入**二进制协议**，支持更高效的消息传输。
  - 强调**跨平台兼容性**，不再依赖特定编程语言或中间件。
  - 微软、Red Hat、VMware等公司积极参与，推动其成为行业标准。



3. **成为国际标准（2012-2014）**

- 2012年，AMQP 1.0被提交至ISO/IEC，最终成为**国际标准（ISO/IEC 19464）**。
- 主流中间件厂商（如Apache ActiveMQ、Azure Service Bus、IBM MQ）逐步支持AMQP 1.0。



4. **生态扩展与现状**

- **开源实现**：
  - **RabbitMQ**（基于AMQP 0-9-1）：最流行的开源消息代理，支持插件扩展。
  - **Apache Qpid**（支持0-9-1和1.0）：提供多种语言客户端和Broker实现。
  - **Azure Service Bus**、**Amazon MQ**等云服务原生支持AMQP。
- **行业应用**：
  AMQP因其可靠性和灵活性，被广泛用于金融交易系统、物联网（IoT）、电信和云计算（如微服务通信）。

## AMQP协议

AMQP协议本身包括三层，如下图：

![img](https://www.hxstrive.com/hxstrivedocs/2022/02/14/aac9fefc772b478ba1a22713d22e233b.jpeg)

其中：

- **Module Layer：**协议最高层，主要定义了一些供客户端调用的命令，客户端可以利用这些命令实现自己的业务逻辑。例如，客户端可以使用 Queue.Declare 命令声明一个队列或者使用 Basic.Consume 订阅消费一个队列中的消息。
- **Session Layer：**中间层，主要负责将客户端的命令发送给服务器，再将服务端的应答返回给客户端，主要为客户端和服务端之间的通信提供可靠的同步机制和错误处理。
- **Transport Layer：**最底层，主要传输二进制流，提供帧的处理、信道复用、错误检测和数据表示等。

## AMQP概念

![img](https://dyzhou.gitbooks.io/jia_gou_zhi_lu/content/assets/amqp_stru_pic.png)



### 生产者（Producer）

生产者，就是投递消息的一方。生产者创建消息，然后将消息直接发送到交换器，由交换器将消息路由到符合要求的队列中去。



### 消费者（Consumer）

消费者，就是接收消息的一方。消费者连接到 Broker ，并订阅到指定的队列上。当消费者消费一条消息时，只是消费消息的消息体（payload）。



### 服务节点（Broker）

Broker 表示消息中间件服务节点。



### 消息队列（Message Queue）

队列用于存储消息。消息只能存储在队列中，生产者生产的消息最终将投递到队列中，消费者可以从队列中获取消息并进行消费。

多个消费者可以订阅同一个队列，这是队列中的消息将会被平均分摊给多个消费者进行消费，而不是每一个消费者都收到所有的消息并消费。

队列与 exchange 共享一些属性，但也有一些额外的属性：

- Name：队列的名称
- Durable：设置队列是否持久化。如果设置为true，则队列为持久化队列。队列信息将持久化到磁盘，重启 Broker 服务可以保证不丢失队列信息。
- Exclusive：设置队列是否排他。如果设置为true，则队列为排他队列。仅由一个连接使用，当该连接关闭时队列将被删除
- Auto-delete：设置队列是否自动删除。如果设置为 true，则设置队列为自动删除。自动删除的前提是：至少有一个消费者连接到这个队列，之后所有与这个队列连接的消费者都断开时，才会自动删除该队列。
- Arguments ：设置队列的其他一些参数，如：x-message-ttl、x-expires、x-max-length 等。



在使用队列之前，必须先声明它。如果队列不存在，则声明队列将导致它被创建。如果队列已经存在并且其属性与声明中的相同，则声明将无效。当现有队列属性与声明中的不同时，将引发代码为 406 (PRECONDITION_FAILED) 的通道级异常。



应用程序可以选择队列名称或要求代理为它们生成名称。队列名称最多可以是 255 个字节的 UTF-8 字符。AMQP 0-9-1 代理可以代表应用程序生成唯一的队列名称。要使用此功能，请传递一个空字符串作为队列名称参数。生成的名称将与队列声明响应一起返回给客户端。

以 “amq” 开头的队列名称。保留供 broker 内部使用。尝试使用违反此规则的名称声明队列将导致通道级异常，回复代码为 403 (ACCESS_REFUSED)。



### 消息（Message）

消息是指在应用程序之间传递的数据。消息由消息头和消息体组成。消息体（payload）是不透明的，在实际应用中，消息体一般是一个带有业务逻辑结构的数据，比如：JSON字符串。而消息头则由一系列的可选属性组成，这些属性包括 routing-key（路由键）、priority（相对于其他消息的优先权）、delivery-mode（指出该消息可能需要持久性存储）等。



AMQP 0-9-1 模型中的消息具有属性。某些属性非常常见，以至于 AMQP 0-9-1 规范定义了它们，应用程序开发人员不必考虑确切的属性名称。一些例子是：

- Content type
- Content encoding
- Routing key
- Delivery mode (persistent or not)
- Message priority
- Message publishing timestamp
- Expiration period
- Publisher application id

AMQP 代理使用了一些属性，但大多数属性都可以由接收它们的应用程序解释。 一些属性是可选的，称为标题。 它们类似于 HTTP 中的 X-Headers。 消息属性在消息发布时设置。

消息还有一个有效负载（它们携带的数据），AMQP 代理将其视为一个不透明的字节数组。 代理不会检查或修改有效负载。 消息可能只包含属性而不包含有效负载。 通常使用 JSON、Thrift、Protocol Buffers 和 MessagePack 等序列化格式来序列化结构化数据，以便将其作为消息有效负载发布。协议对等点通常使用 “content-type” 和 “content-encoding” 字段来传达此信息，但这只是约定俗成的。

消息可以作为持久性发布，这使得代理将它们持久化到磁盘。 如果服务器重新启动，系统会确保接收到的持久消息不会丢失。 简单地将消息发布到持久交换或它路由到的队列是持久的这一事实并不能使消息持久化：这完全取决于消息本身的持久性模式。 将消息作为持久性发布会影响性能（就像数据存储一样，持久性是以一定的性能成本为代价的）。

### 交换器（exchange）

生产者永远不会直接将消息投递到队列中，而是直接投递给交换器。由交换器将消息路由到一个或多个队列中。如果路由不到，或许会返回给生产者，或许直接丢弃。

交换器有四种类型:

![img](https://www.hxstrive.com/hxstrivedocs/2022/01/19/deb37ddc0cf84b3285bda4fdc48a145d.jpg)

- 直接交换器：路根据消息路由键将消息传递到队列。直接交换是消息的单播路由的理想选择（尽管它们也可用于多播路由）。下面是它的工作原理：

  - 队列使用路由键 K 绑定到交换器
  - 当具有路由键 R 的新消息到达直接交换时，如果 K = R，则交换将其路由到队列

  直接交换通常用于以循环方式在多个工作人员（同一应用程序的实例）之间分配任务。这样做时，重要的是要了解，在 AMQP 0-9-1 中，消息在消费者之间而不是队列之间进行负载均衡。

- 扇形交换器：将消息路由到绑定到它的所有队列，并且忽略路由键。如果 N 个队列绑定到一个扇出交换器，则当一条新消息发布到该交换器时，该消息的副本将传递到所有 N 个队列。扇出交换是消息广播路由的理想选择。

- 主题交换器：基于消息路由键与用于将队列绑定到交换的模式之间的匹配将消息路由到一个或多个队列。主题交换类型通常用于实现各种发布/订阅模式变体。主题交换通常用于消息的多播路由。这里为匹配定义了如下规则：

  - 路由键（RoutingKey）和绑定键（BindingKey）是一个由点号（.）分割的字符串。
  - 绑定键（BindingKey）中可以存在两种特殊字符串，用于做模糊匹配：
    - *：用于匹配一个单词
    - \#：用于匹配零个或多个单词

- 头交换器：不依赖路由键的匹配规则来路有消息，而是根据发送消息内容中的消息头属性进行匹配。在绑定队列和交换器指定一组键值对。当发送消息到交换器时，Broker 会获取该消息的消息头，将消息头与绑定队列和交换器指定键值对进行匹配。如果匹配，则消息会路由到该队列。否则，不会路由到该队列。

  在绑定队列和交换器时，可以在绑定键中指定一个特殊的键“x-match”来设置 Broker 的 headers 类型交换器匹配规则。x-match 可取值如下：

  - **all：**完全匹配，如果消息头与绑定队列和交换器指定键值对完全匹配，则将消息路由到该队列。否则，不路由到该队列。例如：绑定队列和交换器时，指定了 key1=val1，key2=val2，key3=val3 三个键值对，而发送的消息指定了 key1=val1，key2=val2 两个键值对，则不会将消息路由到该队列。如果消息指定了 key1=val1，key2=val2，key3=val3 三个键值对，则将消息路由到该队列。
  - **any：**部分匹配，如果消息头与绑定队列和交换器指定键值对任意一个匹配，则将消息路由到该队列。如果全部都不匹配，不路由到该队列。例如：绑定队列和交换器时，指定了 key1=val1，key2=val2，key3=val3 三个键值对，而发送的消息指定了 key2=val2 两个键值对，则将消息路由到该队列。

  在绑定队列和交换器时，怎样通过 java 代码指定 x-match 呢？代码如下：

  ```java
  String queueName = channel.queueDeclare().getQueue();
  // 绑定的header关键字
  Map<String,Object> headers = new HashMap<String,Object>();
  headers.put("x-match", "any"); // 设置匹配方式
  headers.put("level", "error");
  headers.put("package", "com.example");
  channel.queueBind(queueName, EXCHANGE_NAME, "", headers);
  ```



除了 Exchange 类型之外，Exchange 还声明了许多属性，其中最重要的是：

- Name
- Durability (exchanges 在 broker 重启后幸存下来)
- Auto-delete (当最后一个队列与它解除绑定时，exchange 被删除)
- Arguments (可选，由插件和特定于代理的功能使用)

Exchange 可以是持久的或短暂的。持久 exchange 在代理重启后仍然存在，而临时 exchange 则不会（当代理重新上线时必须重新声明它们）。并非所有场景和用例都要求 exchange 是持久的。



**默认交换器**是代理预先声明的没有名称（空字符串）的直接交换（direct exchange）。 它有一个特殊的属性，使它对简单的应用程序非常有用：创建的每个队列都会自动绑定到它，并使用与队列名称相同的路由键。



### 绑定（Binding）

通过将交换器与队列关联起来，且在绑定的时候一般会指定一个绑定键（BindingKey），这样 Broker 就知道如何正确地将消息路由到队列了。



### 路由键（Routing Key）

生产者将消息发送给交换器时，一般会指定一个路由键，用来指定消息的路由规则，而这个路由键需要与交换器类型和绑定键联合使用才能最终生效。

如果交换器通过绑定键和队列建立了绑定关系，生产者可以在发送消息给交换器时，通过指定路由键来控制消息的流向。



### 连接（Connection）

AMQP 0-9-1 连接通常是长期存在的。 AMQP 0-9-1 是一个应用层协议，它使用 TCP 进行可靠传输。 连接使用身份验证，并且可以使用 TLS 进行保护。 当应用程序不再需要连接到服务器时，它应该优雅地关闭其 AMQP 0-9-1 连接，而不是突然关闭底层 TCP 连接。



我们可以使用 Connection 来创建多个 Channel 信道实例。但是，Channel 实例不能在线程间共享，应用程序应该为每一个线程创建一个 Channel。某些情况下 Channel 的操作可以并发运行，但是在其他情况下会导致在网络上出现错误的通信帧交错，同时也会影响发送方确认机制的运行。所以，多线程间共享 Channel 实例是非线程安全的。



### 信道（Channel）

信道，多路复用连接中的一条独立的双向数据流通道。信道是建立在真实的TCP连接内地虚拟连接，AMQP 命令都是通过信道发出去的，不管是发布消息、订阅队列还是接收消息，这些动作都是通过信道完成。因为对于操作系统来说建立和销毁 TCP 都是非常昂贵的开销，所以引入了信道的概念，以复用一条 TCP 连接。

### 虚拟主机（Virtual Host）

虚拟主机，表示一批交换器、消息队列和相关对象。虚拟主机是共享相同的身份认证和加密环境的独立服务器域。每个 vhost 本质上就是一个 mini 版的 RabbitMQ 服务器，拥有自己的队列、交换器、绑定和权限机制。vhost 是 AMQP 概念的基础，必须在连接时指定，RabbitMQ 默认的 vhost 是 / 。

### 消息确认（Message Acknowledgements） 

消费者应用程序（即接收和处理消息的应用程序）有时可能无法处理单个消息，或者有时会崩溃。网络问题也有可能导致问题。这就提出了一个问题：代理应该什么时候从队列中删除消息？ AMQP 0-9-1 规范让消费者对此进行控制。有两种确认方式：

- 在代理向应用程序发送消息后（使用 basic.deliver 或 basic.get-ok 方法）。
- 在应用程序发回确认后（使用 basic.ack 方法）。

前一种选择称为自动确认模型，而后者称为显式确认模型。使用显式模型，应用程序选择何时发送确认。它可以是在收到消息之后，或者在处理之前将其持久化到数据存储之后，或者在完全处理消息之后（例如，成功获取网页，处理并将其存储到某个持久性数据存储中）。

如果一个消费者在没有发送确认的情况下死亡，代理将把它重新传递给另一个消费者，或者，如果当时没有可用的消费者，代理将等到至少一个消费者注册到同一个队列，然后再尝试重新传递。

### 拒绝消息（Rejecting Messages）

当消费者应用程序接收到消息时，对该消息的处理可能会成功，也可能不会成功。应用程序可以通过拒绝消息向代理指示消息处理已失败（或当时无法完成）。拒绝消息时，应用程序可以要求代理丢弃或重新排队。当队列中只有一个消费者时，请确保不要通过一遍又一遍地拒绝和重新排队来自同一消费者的消息来创建无限的消息传递循环。

### 否定确认（Negative Acknowledgements）

使用 basic.reject 方法拒绝消息。basic.reject 有一个限制：无法像使用确认一样拒绝多条消息。但是，如果您使用的是 RabbitMQ，那么有一个解决方案。RabbitMQ 提供了一个 AMQP 0-9-1 扩展，称为否定确认或 nacks。有关更多信息，请参阅确认和 basic.nack 扩展指南。

### 预取消息（Prefetching Messages）

对于多个消费者共享一个队列的情况，能够指定每个消费者可以在发送下一个确认之前一次发送多少条消息是很有用的。如果消息倾向于批量发布，这可以用作简单的负载平衡技术或提高吞吐量。例如，如果生产应用程序由于其工作的性质而每分钟发送消息。

请注意，RabbitMQ 仅支持通道级预取计数，不支持基于连接或大小的预取。

### 消息确认（Message Acknowledgements）

由于网络不可靠且应用程序失败，因此通常需要某种处理确认。 有时只需要确认已收到消息这一事实。 有时，确认意味着消息已由消费者验证和处理，例如，验证为具有强制性数据并保存到数据存储或索引。

这种情况很常见，因此 AMQP 0-9-1 有一个内置功能，称为消息确认（有时称为 acks），消费者使用它来确认消息传递和/或处理。 如果应用程序崩溃（连接关闭时 AMQP 代理会注意到这一点），如果预期消息的确认但 AMQP 代理未收到，则消息将重新排队（并可能立即传递给另一个消费者，如果有的话存在）。

在协议中内置确认有助于开发人员构建更强大的软件。

## AMQP工作过程

### 生产者工作过程 

为了形象的说明AMQP协议命令的工作过程，下面是使用 RabbitMQ 生产消息的简单代码。代码如下：

```java
// 创建连接工厂
ConnectionFactory factory = new ConnectionFactory();
factory.setHost("127.0.0.1");
factory.setPort(5672);
// 创建连接
Connection connection = factory.newConnection();
// 创建信道
Channel channel = connection.createChannel();
// 声明队列
channel.queueDeclare(QUEUE_NAME, false, false, false, null);
// 发送消息
String message = "Hello World!";
channel.basicPublish("", QUEUE_NAME, null, message.getBytes());
// 关闭连接，释放资源
channel.close();
connection.close();
```

生产者工作过程如下：

- **创建连接：**当客户端与 Broker 建立连接的时候，会调用 factory.newConnection() 方法，这个方法会进一步封装成 AMQP 0-9-1 协议报文头发送给 Broker，告知 Broker 本次采用 AMQP 0-9-1 协议进行交互，紧接着返回 Connection.Start 来建立连接，在连接过程中涉及如下6个命令的交互：
  - Connection.Start/Connection.Start-OK
  - Connection.Tune/Connection.Tune-OK 
  - Connection.Open/Connection.Open-OK
- **创建信道（Channel）：**成功创建连接后，将在 Connection 之上调用 connection.createChannel() 方法创建信道 Channel。该过程涉及 Channel.Open/Channel.Open-OK 命令。
- **发送消息：**通过调用信道的 channel.queueDeclare() 方法来发送消息，它对应的 AMQP 协议的命令为 Basic.Publish。注意，Basic.Publish 命令还包含了 Content Header 和 Content Body。Content Header 里面包含了消息属性，例如优先级等。Content Body 包含消息主体。
- 关闭资源：当生产者发送完消息后，需要调用信道和连接的 channel.close()、connection.close() 方法。这里涉及了如下命令：
  - Channel.Close/Channel.Close-OK
  - Connection.Close/Connection.Close-OK

详细工作过程如下图：

![img](https://www.hxstrive.com/hxstrivedocs/2022/02/14/32c37e4941ec4d568d11bfd4152b8574.jpeg)

### 消费者工作过程

为了形象的说明AMQP协议命令的工作过程，下面是使用 RabbitMQ 消费者的简单代码。代码如下：

```java
// 创建连接工厂
ConnectionFactory factory = new ConnectionFactory();
factory.setHost("127.0.0.1");
factory.setPort(5672);
// 创建连接
Connection connection = factory.newConnection();
// 创建信道
Channel channel = connection.createChannel();
// 声明队列
channel.queueDeclare(QUEUE_NAME, false, false, false, null);
// 消费消息
channel.basicConsume(QUEUE_NAME, true, new DefaultConsumer(channel) {
    @Override
    public void handleDelivery(String consumerTag, Envelope envelope,
            AMQP.BasicProperties properties, byte[] body)
            throws IOException {
        String message = new String(body, "UTF-8");
        System.out.println("[x] Received '" + message + "'");
    }
});
```

消费者工作过程如下：

- **创建连接：**当客户端与 Broker 建立连接的时候，会调用 factory.newConnection() 方法，这个方法会进一步封装成 AMQP 0-9-1 协议报文头发送给 Broker，告知 Broker 本次采用 AMQP 0-9-1 协议进行交互，紧接着返回 Connection.Start 来建立连接，在连接过程中涉及如下6个命令的交互：
  - Connection.Start/Connection.Start-OK
  - Connection.Tune/Connection.Tune-OK 
  - Connection.Open/Connection.Open-OK
- **创建信道（Channel）：**成功创建连接后，将在 Connection 之上调用 connection.createChannel() 方法创建信道 Channel。该过程涉及 Channel.Open/Channel.Open-OK 命令。
- **消费消息：**通过调用信道的 channel.basicConsume() 方法订阅指定队列，它对于AMQP的 Basic.Consum、Basic.Consum-OK 命令。如果 Broker 向消费者推送消息，涉及到 AMQP 的 Basic.Deliver 命令。

详细工作过程如下图：

![img](https://www.hxstrive.com/hxstrivedocs/2022/02/15/282adc24043d4a29b8dcc6b0d56c967c.jpeg)



## 参考

- [AMQP 协议介绍](https://www.hxstrive.com/subject/rabbitmq/1067.htm)

- [MQTT 与 AMQP：物联网通信协议对比](https://www.emqx.com/zh/blog/mqtt-vs-amqp-for-iot-communications)

- [维基百科：高级消息队列协议](https://zh.wikipedia.org/wiki/%E9%AB%98%E7%BA%A7%E6%B6%88%E6%81%AF%E9%98%9F%E5%88%97%E5%8D%8F%E8%AE%AE)
- [物联网常见协议之Amqp协议及使用场景解析](https://developer.huawei.com/consumer/cn/forum/topic/0201117473153979649)

