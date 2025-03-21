## OAuth2.0

### 什么是 OAuth2.0

Open Authorization 2.0 简写为 OAuth2.0，中文译作“开放式授权协议 2.0”。

[RFC-6749](https://datatracker.ietf.org/doc/html/rfc6749) 文件中明确定义了 OAuth2.0 的含义。

OAuth2.0 出现的原因：避免 APP 之间重复注册和认证的繁琐流程。

OAuth2.0 的作用：提高效率与数据安全性，提升用户体验。



https://oauth.net/2/

https://datatracker.ietf.org/doc/html/rfc6749



### OAuth2.0 的角色

- Resource Owner：资源所有者，即用户
- Resource Server：资源服务器，即保存用户 Resource 的服务器，通过令牌可访问所保存的用户资源。
- Client：客户端即用户想要登录使用的某个应用程序。经过用户的同意后可代理 用户去获取对于的资源。
- Authorization Server：搜权服务器，即给客户端颁发令牌的服务器。

提示：Authorization Server 与 Resource Server 可以部署一起，也可以分开部署。

### OAuth2.0 授权模式

- 授权码模式。客户端应用 要用授权码换取令牌，并且提供刷新令牌的支持，可以使用刷新令牌来获取新的访问令牌，延长授权时间。常见的社交登录均采用该模式。
- 密码模式。用户要向客户端应用提供他们的凭证（通常为用户名和密码），客户端以此向授权服务器获取访问令牌，该模式提供刷新令牌的支持。密码模式原本是为遗留系统提供的过度方式，使它们可以更容易地采用 OAuth2.0 标准，同时保存现有的用户验证机制。这种模式存在泄露的风险，在最新的 OAuth2.1 草案中，已提出建议废弃该授权模式。
- 简易模式。适用于纯前端无后端的应用。授权服务器直接将 token 信息已 Get 的方式拼接到回调地址中传给前端页面，所以该授权模式下 token 极易被拦截，建议将 token 的有效期尽可能的控制到短期，以降低 token 泄露的风险。因为没有授权码这个中间步骤，所以称为隐藏式授权模式，该模式不会返回刷新令牌。在最新的 OAuth2.1 草案中，已提出建议废弃该授权模式。
- 客户端模式。为了满足没有最终用户参与的场景，即客户端应用本身需要直接访问受控资源，而这些资源不是属于某个用户。在客户端模式下，授权的重点是确保客户端是可信任的，而不是急于用户的授权。客户端模式更加适用于微服务架构中服务之间的互信、非用户访问级别的 API 的鉴权等场景。

总结：

- 提供刷新令牌支持的：授权码模式、密码模式
- OAuth2.1 草案中建议废弃的：密码模式、简易模式

- 从授权码模式到客户端模式，对于客户端的信任程度是增加的，但是安全性是递减的。

### 实现原理

### JWS/JWK

JWS 的全称是 JWT 签名（通常是指添加了签名的 JWT）。签名是用来保证 JWT 不能被他人随意篡改。

JWK 的全称是 JSON 网络密钥(通常是指 JWT 的密钥或者密钥对)。当 0Auth2 客户端接收到一个 JWT 时，它需要使用这些公钥来验证JWT 的有效性，确保 JWT 没有被篡改，并且是由可信的授权服务器签发的。

## OAuth2.1

### 什么是 OAuth2.1

### OIDC 1.0

## Spring Authorization Server

### 发展历史

- 2012 年 10 月，OAuth 2.0，Spring Security OAuth、Spring Cloud Security、Spring Boot 以及 Spring Security5.x 中都提供了对 OAuth2 的实现。
- 2018 年 1 月，Spring 官方宣布要逐渐停止现有的 OAuth2 支持，而在 Spring Security5 中构建下一代 OAuth2.0 支持。
- 2019 年 11 月，Spring 官方宣布不再支持授权服务器。
- 2020 年 4 月，Spring 对外公布 Spring Authorization Server，决定继续提供授权服务器。
- 2020 年 8 月，Spring Authorization Server v0.0.1 发布
- 2021 年 11 月，Spring Authorization Server v0.2.0 发布
- 2022 年 5 月，Spring Security OAuth 2.0 停止更新
- 2022 年 11 月，Spring Authorization Server v1.0 发布

### 功能

Spring Authorization Server 支持以下功能：

| 类别           | 特征                                                         | 规范                                                         |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 授权类型       | 授权码                                                       | OAuth 2.1   [授权码授予](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-07#section-4.1) ，OpenID Connect Core 1.0（[规范](https://openid.net/specs/openid-connect-core-1_0.html)） |
|                | 客户端凭证                                                   | OAuth 2.1   [授予客户凭证](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-07#section-4.2) |
|                | 刷新令牌                                                     | OAuth 2.1   [刷新令牌授予](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-07#section-4.3) |
|                | 设备代码                                                     | OAuth 2.0 设备授权授予（[规范](https://tools.ietf.org/html/rfc8628)） |
|                | 令牌兑换                                                     | OAuth 2.0 令牌交换（[规范](https://datatracker.ietf.org/doc/html/rfc8693)） |
| 令牌格式       | JWT                                                          | JSON Web Token (JWT) ([RFC 7519](https://tools.ietf.org/html/rfc7519)) |
|                | Opaque                                                       | JSON Web Signature (JWS) ([RFC 7515](https://tools.ietf.org/html/rfc7515)) |
| 客户端身份验证 | `client_secret_basic`                                        | OAuth 2.1 授权框架（[客户端身份验证](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-07#section-2.4)） |
|                | `client_secret_post`                                         | OAuth 2.0 客户端身份验证的 JWT 配置 ( [RFC 7523](https://tools.ietf.org/html/rfc7523) ) |
|                | `client_secret_jwt`                                          | OAuth 2.0 双向 TLS 客户端身份验证和证书绑定访问令牌 ( [RFC 8705](https://datatracker.ietf.org/doc/html/rfc8705) ) |
|                | `private_key_jwt`                                            | OAuth 公共客户端代码交换的证明密钥 (PKCE) ( [RFC 7636](https://tools.ietf.org/html/rfc7636) ) |
|                | `tls_client_auth`                                            |                                                              |
|                | `self_signed_tls_client_auth`                                |                                                              |
|                | `none`                                                       |                                                              |
| 协议端点       | [OAuth2 授权端点](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oauth2-authorization-endpoint) | OAuth 2.1 授权框架（[草案](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-07)） |
|                | [OAuth2 设备授权端点](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oauth2-device-authorization-endpoint) | OAuth 2.0 设备授权授予 ( [RFC 8628](https://tools.ietf.org/html/rfc8628) ) |
|                | [OAuth2 设备验证端点](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oauth2-device-verification-endpoint) | OAuth 2.0 令牌自检（[RFC 7662](https://tools.ietf.org/html/rfc7662)） |
|                | [OAuth2 令牌端点](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oauth2-token-endpoint) | OAuth 2.0 令牌撤销 ( [RFC 7009](https://tools.ietf.org/html/rfc7009) ) |
|                | [OAuth2 令牌自检端点](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oauth2-token-introspection-endpoint) | OAuth 2.0 授权服务器元数据（[RFC 8414](https://tools.ietf.org/html/rfc8414)） |
|                | [OAuth2 令牌撤销端点](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oauth2-token-revocation-endpoint) | JSON 网络密钥 (JWK) ( [RFC 7517](https://tools.ietf.org/html/rfc7517) ) |
|                | [OAuth2 授权服务器元数据端点](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oauth2-authorization-server-metadata-endpoint) | OpenID Connect Discovery 1.0（[规范](https://openid.net/specs/openid-connect-discovery-1_0.html)） |
|                | [JWK 设置端点](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#jwk-set-endpoint) | OpenID Connect RP 发起的注销 1.0（[规范](https://openid.net/specs/openid-connect-rpinitiated-1_0.html)） |
|                | [OpenID Connect 1.0 提供商配置端点](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oidc-provider-configuration-endpoint) | OpenID Connect Core 1.0（[规范](https://openid.net/specs/openid-connect-core-1_0.html)） |
|                | [OpenID Connect 1.0 注销端点](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oidc-logout-endpoint) | OpenID Connect 动态客户端注册 1.0（[规范](https://openid.net/specs/openid-connect-registration-1_0.html)） |
|                | [OpenID Connect 1.0 UserInfo 端点](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oidc-user-info-endpoint) |                                                              |
|                | [OpenID Connect 1.0 客户端注册端点](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oidc-client-registration-endpoint) |                                                              |
