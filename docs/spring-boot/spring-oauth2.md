# Spring Authorization Server

Spring Authorization Server 是一个框架，提供[OAuth 2.1](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-07)和 [OpenID Connect 1.0](https://openid.net/specs/openid-connect-core-1_0.html) 规范以及其他相关规范的实现。它建立在[Spring Security](https://spring.io/projects/spring-security)之上，为构建 OpenID Connect 1.0 身份提供者和 OAuth2 授权服务器产品提供了安全、轻量且可定制的基础。

## 概览

### 功能

Spring Authorization Server 支持以下[功能](https://docs.spring.io/spring-authorization-server/reference/overview.html#feature-list)：

1、Authorization Grant：	

- Authorization Code：The OAuth 2.1 Authorization Framework ([draft](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-07))、OpenID Connect Core 1.0 ([spec](https://openid.net/specs/openid-connect-core-1_0.html))
- Client Credentials
- Refresh Token
- Device Code：OAuth 2.0 Device Authorization Grant ([spec](https://tools.ietf.org/html/rfc8628))
- Token Exchange：OAuth 2.0 Token Exchange ([spec](https://datatracker.ietf.org/doc/html/rfc8693))

2、Token Formats：

- Self-contained (JWT)：JSON Web Token (JWT) ([RFC 7519](https://tools.ietf.org/html/rfc7519))
- Reference (Opaque)：JSON Web Signature (JWS) ([RFC 7515](https://tools.ietf.org/html/rfc7515))

3、Token Types

- DPoP-bound Access Tokens：OAuth 2.0 Demonstrating Proof of Possession (DPoP) ([RFC 9449](https://datatracker.ietf.org/doc/html/rfc9449))

4、Client Authentication

- `client_secret_basic`
- `client_secret_post`
- `client_secret_jwt`
- `private_key_jwt`
- `tls_client_auth`
- `self_signed_tls_client_auth`
- `none` (public clients)

5、Protocol Endpoints：

- [OAuth2 Authorization Endpoint](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oauth2-authorization-endpoint)
- [OAuth2 Pushed Authorization Request Endpoint](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oauth2-pushed-authorization-request-endpoint)
- [OAuth2 Device Authorization Endpoint](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oauth2-device-authorization-endpoint)
- [OAuth2 Device Verification Endpoint](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oauth2-device-verification-endpoint)
- [OAuth2 Token Endpoint](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oauth2-token-endpoint)
- [OAuth2 Token Introspection Endpoint](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oauth2-token-introspection-endpoint)
- [OAuth2 Token Revocation Endpoint](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oauth2-token-revocation-endpoint)
- [OAuth2 Authorization Server Metadata Endpoint](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oauth2-authorization-server-metadata-endpoint)
- [JWK Set Endpoint](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#jwk-set-endpoint)
- [OpenID Connect 1.0 Provider Configuration Endpoint](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oidc-provider-configuration-endpoint)
- [OpenID Connect 1.0 Logout Endpoint](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oidc-logout-endpoint)
- [OpenID Connect 1.0 UserInfo Endpoint](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oidc-user-info-endpoint)
- [OpenID Connect 1.0 Client Registration Endpoint](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oidc-client-registration-endpoint)

### 参考资料

1、Spring Authorization Server 常见问题：

- [How-to: Authenticate using a Single Page Application with PKCE](https://docs.spring.io/spring-authorization-server/reference/guides/how-to-pkce.html)
- [How-to: Authenticate using Social Login](https://docs.spring.io/spring-authorization-server/reference/guides/how-to-social-login.html)
- [How-to: Implement an Extension Authorization Grant Type](https://docs.spring.io/spring-authorization-server/reference/guides/how-to-ext-grant-type.html)
- [How-to: Implement Multitenancy](https://docs.spring.io/spring-authorization-server/reference/guides/how-to-multitenancy.html)
- [How-to: Customize the OpenID Connect 1.0 UserInfo response](https://docs.spring.io/spring-authorization-server/reference/guides/how-to-userinfo.html)
- [How-to: Implement core services with JPA](https://docs.spring.io/spring-authorization-server/reference/guides/how-to-jpa.html)
- [How-to: Implement core services with Redis](https://docs.spring.io/spring-authorization-server/reference/guides/how-to-redis.html)
- [How-to: Add authorities as custom claims in JWT access tokens](https://docs.spring.io/spring-authorization-server/reference/guides/how-to-custom-claims-authorities.html)
- [How-to: Register a client dynamically](https://docs.spring.io/spring-authorization-server/reference/guides/how-to-dynamic-client-registration.html)

2、[Spring Security](https://spring.io/projects/spring-security#learn) 中关于  Spring Authorization Server [示例](https://github.com/spring-projects/spring-security-samples)

3、Spring Authorization Server [示例](https://github.com/spring-projects/spring-authorization-server/tree/main/samples) 

## 快速上手

### 示例 1：使用 yaml 配置文件

1、添加 maven 依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-oauth2-authorization-server</artifactId>
</dependency>
```

2、添加配置 application.yml

```yaml
server:
  port: 9000

logging:
  level:
    org.springframework.security: trace

spring:
  security:
    user:
      name: user
      password: password
    oauth2:
      authorizationserver:
        client:
          credentialsClient:
            registration:
              client-id: "credentialsClient"
              client-secret: "{noop}credentialsClient"
              client-authentication-methods:
                - "client_secret_basic"
              authorization-grant-types:
                - "client_credentials"
              scopes:
                - "read"
                - "write"

          introspectClient:
            registration:
              client-id: "introspectClient"
              client-secret: "{noop}introspectClient"
              client-authentication-methods:
                - "client_secret_basic"
              authorization-grant-types:
                - "client_credentials"
              scopes:
                - "read"
                - "write"
            token:
              access-token-format: REFERENCE

          authCodeClient:
            registration:
              client-id: "authCodeClient"
              client-secret: "{noop}authCodeClient"
              client-authentication-methods:
                - "client_secret_basic"
              authorization-grant-types:
                - "authorization_code"
                - "refresh_token"
              redirect-uris:
                - "https://oidcdebugger.com/debug"
                - "https://oauthdebugger.com/debug"
                - "http://127.0.0.1:8080/login/oauth2/code/authCodeClient"
                - "http://127.0.0.1:8080/authorized"
              post-logout-redirect-uris:
                - "http://127.0.0.1:8080/"
              scopes:
                - "openid"
                - "profile"
            token:
              access-token-format: SELF_CONTAINED
              reuse-refresh-tokens: false
            require-authorization-consent: true

          pkceClient:
            registration:
              client-id: "pkceClient"
              client-secret: "{noop}pkceClient"
              client-authentication-methods:
                - "client_secret_basic"
                - "none"
              authorization-grant-types:
                - "authorization_code"
                - "refresh_token"
              redirect-uris:
                - "https://oidcdebugger.com/debug"
                - "https://oauthdebugger.com/debug"
                - "http://127.0.0.1:8080/login/oauth2/code/pkceClient"
                - "http://127.0.0.1:8080/authorized"
              post-logout-redirect-uris:
                - "http://127.0.0.1:8080/"
              scopes:
                - "openid"
                - "profile"
            token:
              access-token-format: SELF_CONTAINED
              reuse-refresh-tokens: false
            require-authorization-consent: true
            require-proof-key: true
```

3、添加 AuthServerApplication

```java
@SpringBootApplication
public class AuthServerApplication {
	public static void main(String[] args) {
		SpringApplication.run(AuthServerApplication.class, args);
	}
}
```

### 示例 2：使用 @Bean 注解

1、添加 SecurityConfig

```java
@Configuration
@EnableWebSecurity(debug = true)
public class SecurityConfig {
    @Bean
    @Order(1)
    public SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http)
            throws Exception {
        OAuth2AuthorizationServerConfigurer authorizationServerConfigurer =
                OAuth2AuthorizationServerConfigurer.authorizationServer();

        http
                .securityMatcher(authorizationServerConfigurer.getEndpointsMatcher())
                .with(authorizationServerConfigurer, (authorizationServer) ->
                        authorizationServer
                                .oidc(Customizer.withDefaults())    // Enable OpenID Connect 1.0
                )
                .authorizeHttpRequests((authorize) ->
                        authorize
                                .anyRequest().authenticated()
                )
                // Redirect to the login page when not authenticated from the
                // authorization endpoint
                .exceptionHandling((exceptions) -> exceptions
                        .defaultAuthenticationEntryPointFor(
                                new LoginUrlAuthenticationEntryPoint("/login"),
                                new MediaTypeRequestMatcher(MediaType.TEXT_HTML)
                        )
                );

        return http.build();
    }

    @Bean
    @Order(2)
    public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http)
            throws Exception {
        http
                .authorizeHttpRequests((authorize) -> authorize
                        .anyRequest().authenticated()
                )
                // Form login handles the redirect to the login page from the
                // authorization server filter chain
                .formLogin(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails userDetails = User.withDefaultPasswordEncoder()
                .username("user")
                .password("password")
                .roles("USER")
                .build();

        return new InMemoryUserDetailsManager(userDetails);
    }

    @Bean
    public RegisteredClientRepository registeredClientRepository() {
        RegisteredClient credentialsClient = RegisteredClient.withId(UUID.randomUUID().toString())
                .clientId("credentialsClient")
                .clientSecret("{noop}credentialsClient")
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
                .authorizationGrantType(AuthorizationGrantType.CLIENT_CREDENTIALS)
                .scope(OidcScopes.OPENID)
                .scope(OidcScopes.PROFILE)
                .scope("read")
                .scope("write")
                .tokenSettings(TokenSettings.builder().accessTokenFormat(OAuth2TokenFormat.SELF_CONTAINED).build()
                ).build();

        RegisteredClient introspectClient = RegisteredClient.withId(UUID.randomUUID().toString())
                .clientId("introspectClient")
                .clientSecret("{noop}introspectClient")
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
                .authorizationGrantType(AuthorizationGrantType.CLIENT_CREDENTIALS)
                .scope(OidcScopes.OPENID)
                .scope(OidcScopes.PROFILE)
                .scope("read")
                .scope("write")
                .tokenSettings(TokenSettings.builder().accessTokenFormat(OAuth2TokenFormat.REFERENCE).build()
                ).build();

        RegisteredClient authCodeClient = RegisteredClient.withId(UUID.randomUUID().toString())
                .clientId("authCodeClient")
                .clientSecret("{noop}authCodeClient")
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_POST)
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
                .redirectUri("https://oidcdebugger.com/debug")
                .redirectUri("https://oauthdebugger.com/debug")
                .redirectUri("http://127.0.0.1:8080/login/oauth2/code/authCodeClient")
                .redirectUri("http://127.0.0.1:8080/authorized")
                .scope(OidcScopes.OPENID)
                .scope(OidcScopes.PROFILE)
                .scope("read")
                .scope("write")
                .tokenSettings(TokenSettings.builder()
                        .reuseRefreshTokens(false)
                        .accessTokenFormat(OAuth2TokenFormat.SELF_CONTAINED).build()
                ).build();

        RegisteredClient pkceClient = RegisteredClient.withId(UUID.randomUUID().toString())
                .clientId("pkceClient")
                .clientSecret("{noop}pkceClient")
                .clientAuthenticationMethod(ClientAuthenticationMethod.NONE)
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
                .redirectUri("https://oidcdebugger.com/debug")
                .redirectUri("https://oauthdebugger.com/debug")
                .redirectUri("http://127.0.0.1:8080/login/oauth2/code/authCodeClient")
                .redirectUri("http://127.0.0.1:8080/authorized")
                .scope(OidcScopes.OPENID)
                .scope(OidcScopes.PROFILE)
                .scope("read")
                .scope("write")
                .clientSettings(ClientSettings.builder()
                        .requireProofKey(true)
                        .requireAuthorizationConsent(true)
                        .build()
                )
                .tokenSettings(TokenSettings.builder()
                        .reuseRefreshTokens(false)
                        .accessTokenFormat(OAuth2TokenFormat.SELF_CONTAINED).build()
                ).build();

        return new InMemoryRegisteredClientRepository(credentialsClient, introspectClient, authCodeClient, pkceClient);
    }

    @Bean
    public AuthorizationServerSettings authorizationServerSettings() {
        return AuthorizationServerSettings.builder().build();
    }

    @Bean
    public JwtDecoder jwtDecoder(JWKSource<SecurityContext> jwkSource) {
        return OAuth2AuthorizationServerConfiguration.jwtDecoder(jwkSource);
    }

    @Bean
    JWKSource<SecurityContext> jwkSource() {
        RSAKey rsaKey = generateRsa();
        JWKSet jwkSet = new JWKSet(rsaKey);
        return new ImmutableJWKSet<>(jwkSet);
    }

    private RSAKey generateRsa() {
        KeyPair keyPair = generateRsaKey();
        RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();
        RSAPrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();
        // @formatter:off
        return new RSAKey.Builder(publicKey)
                .privateKey(privateKey)
                .keyID(UUID.randomUUID().toString())
                .build();
        // @formatter:on
    }

    private KeyPair generateRsaKey() {
        KeyPair keyPair;
        try {
            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            keyPairGenerator.initialize(2048);
            keyPair = keyPairGenerator.generateKeyPair();
        } catch (Exception ex) {
            throw new IllegalStateException(ex);
        }
        return keyPair;
    }
}
```

2、修改 application.yml

```yaml
server:
  port: 9000

logging:
  level:
    org.springframework.security: trace
```

### 示例 3：默认配置

`OAuth2AuthorizationServerConfiguration`为 OAuth2 授权服务器提供最小的默认配置。

OAuth2AuthorizationServerConfiguration 源码：

```java
@Configuration(proxyBeanMethods = false)
public class OAuth2AuthorizationServerConfiguration {

	@Bean
	@Order(Ordered.HIGHEST_PRECEDENCE)
	public SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http) throws Exception {
		// @formatter:off
		OAuth2AuthorizationServerConfigurer authorizationServerConfigurer =
				OAuth2AuthorizationServerConfigurer.authorizationServer();
		http
			.securityMatcher(authorizationServerConfigurer.getEndpointsMatcher())
			.with(authorizationServerConfigurer, Customizer.withDefaults())
			.authorizeHttpRequests((authorize) ->
				authorize.anyRequest().authenticated()
			);
		// @formatter:on
		return http.build();
	}

	@Deprecated(since = "1.4", forRemoval = true)
	public static void applyDefaultSecurity(HttpSecurity http) throws Exception {
		// @formatter:off
		OAuth2AuthorizationServerConfigurer authorizationServerConfigurer =
				OAuth2AuthorizationServerConfigurer.authorizationServer();
		http
			.securityMatcher(authorizationServerConfigurer.getEndpointsMatcher())
			.with(authorizationServerConfigurer, Customizer.withDefaults())
			.authorizeHttpRequests((authorize) ->
				authorize.anyRequest().authenticated()
			);
		// @formatter:on
	}

	public static JwtDecoder jwtDecoder(JWKSource<SecurityContext> jwkSource) {
		Set<JWSAlgorithm> jwsAlgs = new HashSet<>();
		jwsAlgs.addAll(JWSAlgorithm.Family.RSA);
		jwsAlgs.addAll(JWSAlgorithm.Family.EC);
		jwsAlgs.addAll(JWSAlgorithm.Family.HMAC_SHA);
		ConfigurableJWTProcessor<SecurityContext> jwtProcessor = new DefaultJWTProcessor<>();
		JWSKeySelector<SecurityContext> jwsKeySelector = new JWSVerificationKeySelector<>(jwsAlgs, jwkSource);
		jwtProcessor.setJWSKeySelector(jwsKeySelector);
		// Override the default Nimbus claims set verifier as NimbusJwtDecoder handles it
		// instead
		jwtProcessor.setJWTClaimsSetVerifier((claims, context) -> {
		});
		return new NimbusJwtDecoder(jwtProcessor);
	}

	@Bean
	RegisterMissingBeanPostProcessor registerMissingBeanPostProcessor() {
		RegisterMissingBeanPostProcessor postProcessor = new RegisterMissingBeanPostProcessor();
		postProcessor.addBeanDefinition(AuthorizationServerSettings.class,
				() -> AuthorizationServerSettings.builder().build());
		return postProcessor;
	}
}
```

OAuth2AuthorizationServerConfiguration 类：

- 注册了一个名词为 authorizationServerSecurityFilterChain 的 SecurityFilterChain Bean，可以看到实现一个 Authorization Server 的 SecurityFilterChain 需要的最小代码。
- `applyDefaultSecurity(HttpSecurity http)` 为静态方法，已经过时。
- `jwtDecoder(JWKSource<SecurityContext> jwkSource) `为静态方法，通过JWKSource 创建 JwtDecoder。
- 注册一个 RegisterMissingBeanPostProcessor Bean 用于提供 AuthorizationServerSettings 的默认实现。

> ⚠️ 注意：
>
> OAuth2AuthorizationServerConfiguration 类位于 spring-security-oauth2-authorization-server jar 包中，没有配置自动注入。如果需要使用 OAuth2AuthorizationServerConfiguration 需要调用它提供的静态方法或者使用 @Import 导入。

OAuth2AuthorizationServerConfiguration 使用 OAuth2AuthorizationServerConfigurer 应用默认配置来配置 OAuth2 授权服务器，并注册一个 SecurityFilterChain @Bean。

OAuth2 授权服务器`SecurityFilterChain` `@Bean`配置了以下默认协议端点：

- [OAuth2 授权端点](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oauth2-authorization-endpoint)
- [OAuth2 设备授权端点](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oauth2-device-authorization-endpoint)
- [OAuth2 设备验证端点](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oauth2-device-verification-endpoint)
- [OAuth2 令牌端点](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oauth2-token-endpoint)
- [OAuth2 令牌自检端点](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oauth2-token-introspection-endpoint)
- [OAuth2 令牌撤销端点](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oauth2-token-revocation-endpoint)
- [OAuth2 授权服务器元数据端点](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oauth2-authorization-server-metadata-endpoint)
- [JWK 设置端点](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#jwk-set-endpoint)

> ⚠️注意：
>
> **仅**当`JWKSource<SecurityContext>` `@Bean`注册后，才会配置 JWK Set 端点。

以下示例显示如何应用`OAuth2AuthorizationServerConfiguration`最小默认配置：

```java
@Configuration
@Import(OAuth2AuthorizationServerConfiguration.class)
public class AuthorizationServerConfig {

	@Bean
	public RegisteredClientRepository registeredClientRepository() {
		List<RegisteredClient> registrations = ...
		return new InMemoryRegisteredClientRepository(registrations);
	}

	@Bean
	public JWKSource<SecurityContext> jwkSource() {
		RSAKey rsaKey = ...
		JWKSet jwkSet = new JWKSet(rsaKey);
		return (jwkSelector, securityContext) -> jwkSelector.select(jwkSet);
	}

}
```

总结：Spring Authorization Server 最小配置需要：

- 配置一个 SecurityFilterChain 启用 OAuth2 相关端点和过滤器
- 一个 RegisteredClientRepository Bean
- 一个 JWKSource Bean
- 一个 AuthorizationServerSettings Bean

> ⚠️注意：
>
> 授权码模式需要资源所有者进行身份验证。因此，除了默认的 OAuth2 安全配置之外， **还必须配置用户身份验证机制。**

[OpenID Connect 1.0](https://openid.net/specs/openid-connect-core-1_0.html)在默认配置中处于禁用状态。以下示例显示如何通过初始化来启用 OpenID Connect 1.0 `OidcConfigurer`：

```java
@Bean
public SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http) throws Exception {
	OAuth2AuthorizationServerConfigurer authorizationServerConfigurer =
			OAuth2AuthorizationServerConfigurer.authorizationServer();
	http
		.securityMatcher(authorizationServerConfigurer.getEndpointsMatcher())
		.with(authorizationServerConfigurer, (authorizationServer) ->
			authorizationServer
				.oidc(Customizer.withDefaults())	// Initialize `OidcConfigurer`
		);
	return http.build();
}
```

除了默认协议端点之外，OAuth2 授权服务器`SecurityFilterChain` `@Bean`还配置了以下 OpenID Connect 1.0 协议端点：

- [OpenID Connect 1.0 提供程序配置端点](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oidc-provider-configuration-endpoint)
- [OpenID Connect 1.0 注销端点](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oidc-logout-endpoint)
- [OpenID Connect 1.0 UserInfo 端点](https://docs.spring.io/spring-authorization-server/reference/protocol-endpoints.html#oidc-user-info-endpoint)

> 注意：
>
> - 1、OpenID Connect 1.0 客户端注册端点默认是禁用的，因为许多部署不需要动态客户端注册。
> - 2、`OAuth2AuthorizationServerConfiguration.jwtDecoder(JWKSource<SecurityContext>)`是一种便捷的 ( `static`) 实用方法，可用于注册`JwtDecoder` `@Bean`，这对于OpenID Connect 1.0 UserInfo 端点和OpenID Connect 1.0 Client Registration 端点是**必需的**。

在引入 spring-boot-starter-oauth2-authorization-server 的依赖之后，Spring Boot 提供了自动装配的功能。从 spring-boot-autoconfigure-3.5.0.jar 的 META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports 文件中可以看到，对应的自动装配类是 OAuth2AuthorizationServerAutoConfiguration 和 OAuth2AuthorizationServerJwtAutoConfiguration。

```bash
org.springframework.boot.autoconfigure.security.oauth2.server.servlet.OAuth2AuthorizationServerAutoConfiguration
org.springframework.boot.autoconfigure.security.oauth2.server.servlet.OAuth2AuthorizationServerJwtAutoConfiguration
```

OAuth2AuthorizationServerAutoConfiguration 类：

```java
@AutoConfiguration(
    before = {OAuth2ResourceServerAutoConfiguration.class, SecurityAutoConfiguration.class, UserDetailsServiceAutoConfiguration.class}
)
@ConditionalOnClass({OAuth2Authorization.class})
@ConditionalOnWebApplication(
    type = Type.SERVLET
)
@Import({OAuth2AuthorizationServerConfiguration.class, OAuth2AuthorizationServerWebSecurityConfiguration.class})
public class OAuth2AuthorizationServerAutoConfiguration {
}
```

该类通过 @Import 导入两个类：

- OAuth2AuthorizationServerConfiguration
- OAuth2AuthorizationServerWebSecurityConfiguration

OAuth2AuthorizationServerConfiguration 提供了基于配置文件自动装配 RegisteredClientRepository Bean，还提供了一个默认的 AuthorizationServerSettings Bean。

```java
@Configuration(
    proxyBeanMethods = false
)
@EnableConfigurationProperties({OAuth2AuthorizationServerProperties.class})
class OAuth2AuthorizationServerConfiguration {
    private final OAuth2AuthorizationServerPropertiesMapper propertiesMapper;

    OAuth2AuthorizationServerConfiguration(OAuth2AuthorizationServerProperties properties) {
        this.propertiesMapper = new OAuth2AuthorizationServerPropertiesMapper(properties);
    }

    @Bean
    @ConditionalOnMissingBean
    @Conditional({RegisteredClientsConfiguredCondition.class})
    RegisteredClientRepository registeredClientRepository() {
        return new InMemoryRegisteredClientRepository(this.propertiesMapper.asRegisteredClients());
    }

    @Bean
    @ConditionalOnMissingBean
    AuthorizationServerSettings authorizationServerSettings() {
        return this.propertiesMapper.asAuthorizationServerSettings();
    }
}
```

OAuth2AuthorizationServerWebSecurityConfiguration 在 OAuth2AuthorizationServerConfiguration 的基础上装配了两个 SecurityFilterChain：

- authorizationServerSecurityFilterChain：配置 OAuth2 端点的 Spring Security 过滤器链，对应的 securityMatcher 为` /oauth2/**`

  ```java
  	@Bean
  	@Order(Ordered.HIGHEST_PRECEDENCE)
  	SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http) throws Exception {
  		OAuth2AuthorizationServerConfigurer authorizationServer = OAuth2AuthorizationServerConfigurer
  			.authorizationServer();
  		http.securityMatcher(authorizationServer.getEndpointsMatcher());
  		http.with(authorizationServer, withDefaults());
  		http.authorizeHttpRequests((authorize) -> authorize.anyRequest().authenticated());
  		http.getConfigurer(OAuth2AuthorizationServerConfigurer.class).oidc(withDefaults());
  		http.oauth2ResourceServer((resourceServer) -> resourceServer.jwt(withDefaults()));
  		http.exceptionHandling((exceptions) -> exceptions.defaultAuthenticationEntryPointFor(
  				new LoginUrlAuthenticationEntryPoint("/login"), createRequestMatcher()));
  		return http.build();
  	}
  ```

- defaultSecurityFilterChain：配置 用于身份验证的 Spring Security 过滤器链，对应的 securityMatcher 为 `/**`

  ```java
  	@Bean
  	@Order(SecurityProperties.BASIC_AUTH_ORDER)
  	SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
  		http.authorizeHttpRequests((authorize) -> authorize.anyRequest().authenticated()).formLogin(withDefaults());
  		return http.build();
  	}
  ```

  

OAuth2AuthorizationServerJwtAutoConfiguration 类用于配置 JWT，主要是配置一个 JWKSource Bean。该类用于生成 RSA KeyPair，然后创建一个 ImmutableJWKSet。在 JWKSource Bean。 存在的情况下，JwtDecoder Bean 会自动装配。

```java
@AutoConfiguration(after = UserDetailsServiceAutoConfiguration.class)
@ConditionalOnClass({ OAuth2Authorization.class, JWKSource.class })
@ConditionalOnWebApplication(type = ConditionalOnWebApplication.Type.SERVLET)
public class OAuth2AuthorizationServerJwtAutoConfiguration {

	@Bean
	@Role(BeanDefinition.ROLE_INFRASTRUCTURE)
	@ConditionalOnMissingBean
	JWKSource<SecurityContext> jwkSource() {
		RSAKey rsaKey = getRsaKey();
		JWKSet jwkSet = new JWKSet(rsaKey);
		return new ImmutableJWKSet<>(jwkSet);
	}

	private static RSAKey getRsaKey() {
		KeyPair keyPair = generateRsaKey();
		RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();
		RSAPrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();
		RSAKey rsaKey = new RSAKey.Builder(publicKey).privateKey(privateKey)
			.keyID(UUID.randomUUID().toString())
			.build();
		return rsaKey;
	}

	private static KeyPair generateRsaKey() {
		KeyPair keyPair;
		try {
			KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
			keyPairGenerator.initialize(2048);
			keyPair = keyPairGenerator.generateKeyPair();
		}
		catch (Exception ex) {
			throw new IllegalStateException(ex);
		}
		return keyPair;
	}

	@Configuration(proxyBeanMethods = false)
	@ConditionalOnClass(JwtDecoder.class)
	static class JwtDecoderConfiguration {
		@Bean
		@ConditionalOnMissingBean
		JwtDecoder jwtDecoder(JWKSource<SecurityContext> jwkSource) {
			return OAuth2AuthorizationServerConfiguration.jwtDecoder(jwkSource);
		}
	}
}
```

从上可以看到，在引入了 spring-boot-starter-oauth2-authorization-server  之后，AuthorizationServer 的最小配置只需要在配置文件中定义 RegisteredClientRepository 的相关配置即可，当然，也可以通过代码配置：

```java
@Configuration(proxyBeanMethods = false)
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public RegisteredClientRepository registeredClientRepository() {
        RegisteredClient credentialsClient = RegisteredClient.withId(UUID.randomUUID().toString())
                .clientId("credentialsClient")
                .clientSecret("{noop}credentialsClient")
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
                .authorizationGrantType(AuthorizationGrantType.CLIENT_CREDENTIALS)
                .scope(OidcScopes.OPENID)
                .scope(OidcScopes.PROFILE)
                .scope("read")
                .scope("write")
                .tokenSettings(TokenSettings.builder().accessTokenFormat(OAuth2TokenFormat.SELF_CONTAINED).build()
                ).build();

        RegisteredClient introspectClient = RegisteredClient.withId(UUID.randomUUID().toString())
                .clientId("introspectClient")
                .clientSecret("{noop}introspectClient")
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
                .authorizationGrantType(AuthorizationGrantType.CLIENT_CREDENTIALS)
                .scope(OidcScopes.OPENID)
                .scope(OidcScopes.PROFILE)
                .scope("read")
                .scope("write")
                .tokenSettings(TokenSettings.builder().accessTokenFormat(OAuth2TokenFormat.REFERENCE).build()
                ).build();

        RegisteredClient authCodeClient = RegisteredClient.withId(UUID.randomUUID().toString())
                .clientId("authCodeClient")
                .clientSecret("{noop}authCodeClient")
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_POST)
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
                .redirectUri("https://oidcdebugger.com/debug")
                .redirectUri("https://oauthdebugger.com/debug")
                .redirectUri("http://127.0.0.1:8080/login/oauth2/code/authCodeClient")
                .redirectUri("http://127.0.0.1:8080/authorized")
                .scope(OidcScopes.OPENID)
                .scope(OidcScopes.PROFILE)
                .scope("read")
                .scope("write")
                .tokenSettings(TokenSettings.builder()
                        .reuseRefreshTokens(false)
                        .accessTokenFormat(OAuth2TokenFormat.SELF_CONTAINED).build()
                ).build();

        RegisteredClient pkceClient = RegisteredClient.withId(UUID.randomUUID().toString())
                .clientId("pkceClient")
                .clientSecret("{noop}pkceClient")
                .clientAuthenticationMethod(ClientAuthenticationMethod.NONE)
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
                .redirectUri("https://oidcdebugger.com/debug")
                .redirectUri("https://oauthdebugger.com/debug")
                .redirectUri("http://127.0.0.1:8080/login/oauth2/code/authCodeClient")
                .redirectUri("http://127.0.0.1:8080/authorized")
                .scope(OidcScopes.OPENID)
                .scope(OidcScopes.PROFILE)
                .scope("read")
                .scope("write")
                .clientSettings(ClientSettings.builder()
                        .requireProofKey(true)
                        .requireAuthorizationConsent(true)
                        .build()
                )
                .tokenSettings(TokenSettings.builder()
                        .reuseRefreshTokens(false)
                        .accessTokenFormat(OAuth2TokenFormat.SELF_CONTAINED).build()
                ).build();

        return new InMemoryRegisteredClientRepository(credentialsClient, introspectClient, authCodeClient, pkceClient);
    }
}
```

### 示例 4：自定义配置

`OAuth2AuthorizationServerConfigurer`提供完全自定义 OAuth2 授权服务器安全配置的功能。它允许您指定要使用的核心组件，以及各种端点。例如：

- RegisteredClientRepository：**必需的**组件。
- OAuth2AuthorizationService：默认为内存实现。
- OAuth2AuthorizationConsentService：默认为内存实现。
- AuthorizationServerSettings：**必需的**组件。
- OAuth2TokenGenerator：提供了默认实现。

```java
@Bean
public SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http) throws Exception {
	OAuth2AuthorizationServerConfigurer authorizationServerConfigurer =
			OAuth2AuthorizationServerConfigurer.authorizationServer();

	http
		.securityMatcher(authorizationServerConfigurer.getEndpointsMatcher())
		.with(authorizationServerConfigurer, (authorizationServer) ->
			authorizationServer
				.registeredClientRepository(registeredClientRepository)	
				.authorizationService(authorizationService)	
				.authorizationConsentService(authorizationConsentService)	
				.authorizationServerSettings(authorizationServerSettings)	
				.tokenGenerator(tokenGenerator)	
				.clientAuthentication(clientAuthentication -> { })	
				.authorizationEndpoint(authorizationEndpoint -> { })	
				.pushedAuthorizationRequestEndpoint(pushedAuthorizationRequestEndpoint -> { })  
				.deviceAuthorizationEndpoint(deviceAuthorizationEndpoint -> { })	
				.deviceVerificationEndpoint(deviceVerificationEndpoint -> { })	
				.tokenEndpoint(tokenEndpoint -> { })	
				.tokenIntrospectionEndpoint(tokenIntrospectionEndpoint -> { })	
				.tokenRevocationEndpoint(tokenRevocationEndpoint -> { })	
				.authorizationServerMetadataEndpoint(authorizationServerMetadataEndpoint -> { })	
				.oidc(oidc -> oidc
					.providerConfigurationEndpoint(providerConfigurationEndpoint -> { })	
					.logoutEndpoint(logoutEndpoint -> { })	
					.userInfoEndpoint(userInfoEndpoint -> { })	
					.clientRegistrationEndpoint(clientRegistrationEndpoint -> { })	
				)
		);

	return http.build();
}
```

#### 配置授权服务器设置

```java
public final class AuthorizationServerSettings extends AbstractSettings {
	public static Builder builder() {
		return new Builder()
			.authorizationEndpoint("/oauth2/authorize")
			.pushedAuthorizationRequestEndpoint("/oauth2/par")
			.deviceAuthorizationEndpoint("/oauth2/device_authorization")
			.deviceVerificationEndpoint("/oauth2/device_verification")
			.tokenEndpoint("/oauth2/token")
			.tokenIntrospectionEndpoint("/oauth2/introspect")
			.tokenRevocationEndpoint("/oauth2/revoke")
			.jwkSetEndpoint("/oauth2/jwks")
			.oidcLogoutEndpoint("/connect/logout")
			.oidcUserInfoEndpoint("/userinfo")
			.oidcClientRegistrationEndpoint("/connect/register");
	}
}
```

以下示例显示如何自定义配置设置并注册`AuthorizationServerSettings` `@Bean`：

```java
@Bean
public AuthorizationServerSettings authorizationServerSettings() {
	return AuthorizationServerSettings.builder()
		.issuer("https://example.com")
		.authorizationEndpoint("/oauth2/v1/authorize")
		.pushedAuthorizationRequestEndpoint("/oauth2/v1/par")
		.deviceAuthorizationEndpoint("/oauth2/v1/device_authorization")
		.deviceVerificationEndpoint("/oauth2/v1/device_verification")
		.tokenEndpoint("/oauth2/v1/token")
		.tokenIntrospectionEndpoint("/oauth2/v1/introspect")
		.tokenRevocationEndpoint("/oauth2/v1/revoke")
		.jwkSetEndpoint("/oauth2/v1/jwks")
		.oidcLogoutEndpoint("/connect/v1/logout")
		.oidcUserInfoEndpoint("/connect/v1/userinfo")
		.oidcClientRegistrationEndpoint("/connect/v1/register")
		.build();
}
```

是`AuthorizationServerContext`一个上下文对象，用于保存授权服务器运行时环境的信息。它提供对`AuthorizationServerSettings`和“当前”颁发者标识符的访问。

注意：

1、AuthorizationServerSettings 的 issuer 不能为空

2、可以通过 AuthorizationServerContextHolder 访问 AuthorizationServerContext。



#### 配置客户端身份验证

`OAuth2ClientAuthenticationConfigurer`提供以下配置选项：

```java
@Bean
public SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http) throws Exception {
	OAuth2AuthorizationServerConfigurer authorizationServerConfigurer =
			OAuth2AuthorizationServerConfigurer.authorizationServer();

	http
		.securityMatcher(authorizationServerConfigurer.getEndpointsMatcher())
		.with(authorizationServerConfigurer, (authorizationServer) ->
			authorizationServer
				.clientAuthentication(clientAuthentication ->
					clientAuthentication
						.authenticationConverter(authenticationConverter)	
						.authenticationConverters(authenticationConvertersConsumer)	
						.authenticationProvider(authenticationProvider)	
						.authenticationProviders(authenticationProvidersConsumer)	
						.authenticationSuccessHandler(authenticationSuccessHandler)	
						.errorResponseHandler(errorResponseHandler)	
				)
		);

	return http.build();
}
```

默认情况， OAuth2 Token endpoint、 OAuth2 Token Introspection endpoint 和 OAuth2 Token Revocation endpoint 需要客户端验证。客户端验证方法有以下几种：

- `client_secret_basic`
-  `client_secret_post`
-  `private_key_jwt`
-  `client_secret_jwt`
-  `tls_client_auth`
-  `self_signed_tls_client_auth`
- ` none` (public clients)

`OAuth2ClientAuthenticationFilter`配置了以下默认设置：

- **AuthenticationConverter**
  - JwtClientAssertionAuthenticationConverter
  - X509ClientCertificateAuthenticationConverter
  - ClientSecretBasicAuthenticationConverter
  - ClientSecretPostAuthenticationConverter
  - PublicClientAuthenticationConverter
  - DelegatingAuthenticationConverter
- **AuthenticationManager**
  - JwtClientAssertionAuthenticationProvider
  - X509ClientCertificateAuthenticationProvider
  - ClientSecretAuthenticationProvider
  - PublicClientAuthenticationProvider
- **AuthenticationSuccessHandler**
- **AuthenticationFailureHandler**

JwtClientAssertionAuthenticationProvider 使用 JwtDecoderFactory 提供的 JwtDecoder 类解析 Jwt token 而得到一个 RegisteredClient。JwtClientAssertionDecoderFactory 提供了一个 JwtDecoderFactory 的默认实现，用于校验 JWT Claims 中的 `iss`, `sub`, `exp` 和 `nbf` 字段。

以下例子自定义一个 *JwtClientAssertionDecoderFactory* 类校验 Jwt。

```java
@Bean
public SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http) throws Exception {
	OAuth2AuthorizationServerConfigurer authorizationServerConfigurer =
			OAuth2AuthorizationServerConfigurer.authorizationServer();

	http
		.securityMatcher(authorizationServerConfigurer.getEndpointsMatcher())
		.with(authorizationServerConfigurer, (authorizationServer) ->
			authorizationServer
				.clientAuthentication(clientAuthentication ->
					clientAuthentication
						.authenticationProviders(configureJwtClientAssertionValidator())
				)
		);

	return http.build();
}

private Consumer<List<AuthenticationProvider>> configureJwtClientAssertionValidator() {
	return (authenticationProviders) ->
		authenticationProviders.forEach((authenticationProvider) -> {
			if (authenticationProvider instanceof JwtClientAssertionAuthenticationProvider) {
				// Customize JwtClientAssertionDecoderFactory
				JwtClientAssertionDecoderFactory jwtDecoderFactory = new JwtClientAssertionDecoderFactory();
				Function<RegisteredClient, OAuth2TokenValidator<Jwt>> jwtValidatorFactory = (registeredClient) ->
					new DelegatingOAuth2TokenValidator<>(
						// Use default validators
						JwtClientAssertionDecoderFactory.DEFAULT_JWT_VALIDATOR_FACTORY.apply(registeredClient),
						// Add custom validator
						new JwtClaimValidator<>("claim", "value"::equals));
				jwtDecoderFactory.setJwtValidatorFactory(jwtValidatorFactory);

				((JwtClientAssertionAuthenticationProvider) authenticationProvider)
					.setJwtDecoderFactory(jwtDecoderFactory);
			}
		});
}
```

同样，X509ClientCertificateAuthenticationProvider 用于校验 Mutual-TLS 客户端，使用的客户端验证方法为：

- tls_client_auth

- self_signed_tls_client_auth

详细的文档可以参考 [Customizing Mutual-TLS Client Authentication](https://docs.spring.io/spring-authorization-server/reference/configuration-model.html#configuring-client-authentication-customizing-mutual-tls-client-authentication) 。

#### 核心对象

- RegisteredClient：表示已在授权服务器注册的客户端。客户端必须先在授权服务器注册，然后才能发起授权流程，例如`authorization_code`或`client_credentials`。
- RegisteredClientRepository：用于注册新客户端和查询现有客户端的核心组件。其他组件在遵循特定协议流程时会使用它，例如客户端身份验证、授权授予处理、令牌自检、动态客户端注册等。
  - InMemoryRegisteredClientRepository
  - JdbcRegisteredClientRepository
- OAuth2Authorization： 是 OAuth2 授权的表示，它持有与授权给客户端的状态相关联的信息，该授权由资源所有者或自身在 `client_credentials` 授权类型的情况下授予。
  - 在授权授予流程成功完成后，会创建一个 `OAuth2Authorization` ，并将其与一个 `OAuth2AccessToken` 、一个（可选的） `OAuth2RefreshToken` 以及与已执行的授权授予类型特定的其他状态相关联。
  - 与 `OAuth2Authorization` 关联的 `OAuth2Token` 实例因授权授予类型而异。
    - 对于 OAuth2 授权码授予，关联一个 `OAuth2AuthorizationCode` 、一个 `OAuth2AccessToken` 以及一个（可选的） `OAuth2RefreshToken` 。
    - 对于 OpenID Connect 1.0 授权码授予，关联一个 `OAuth2AuthorizationCode` 、一个 `OidcIdToken` 、一个 `OAuth2AccessToken` 以及一个（可选的） `OAuth2RefreshToken` 。
    - 对于 OAuth2 客户端凭证授予，仅关联一个 `OAuth2AccessToken` 。
- OAuth2AuthorizationService：是存储新授权和查询现有授权的中心组件。当遵循特定协议流程时，其他组件会使用它——例如客户端认证、授权授予处理、令牌自省、令牌撤销、动态客户端注册等。
  - InMemoryOAuth2AuthorizationService
  - JdbcOAuth2AuthorizationService
- OAuth2AuthorizationConsent：是 OAuth2 授权请求流程中授权"同意"（决定）的表示——例如 `authorization_code` 授权，它包含了资源所有者授予客户端的权限。
- OAuth2AuthorizationConsentService：是一个中央组件，用于存储新的授权同意信息并查询现有的授权同意信息。它主要由实现 OAuth2 授权请求流程的组件使用——例如， `authorization_code` 授权。
  - InMemoryOAuth2AuthorizationConsentService
  - JdbcOAuth2AuthorizationConsentService
- OAuth2TokenContext：是一个上下文对象，它保存与 OAuth2Token 相关的信息，并由 OAuth2TokenGenerator 和 OAuth2TokenCustomizer 使用。
- OAuth2TokenGenerator：负责根据提供的 OAuth2TokenContext 中的信息生成一个 `OAuth2Token` 。
  - `OAuth2Token` 的生成主要取决于 `OAuth2TokenContext` 中指定的 `OAuth2TokenType` 类型。当 OAuth2TokenType 为 code，生成 OAuth2AuthorizationCode；为 access_token，生成 OAuth2AccessToken；为 refresh_token，生成 OAuth2RefreshToken；为 id_token，生成 OidcIdToken。
    - OAuth2AccessToken 的默认格式为 OAuth2TokenFormat.SELF_CONTAINED，则会生成一个 `Jwt` ；如果格式是 `OAuth2TokenFormat.REFERENCE` ，则会生成一个"不透明"的令牌。
  - 如果生成的 `OAuth2Token` 包含一组声明并且实现了 `ClaimAccessor` ，则这些声明可以通过 OAuth2Authorization.Token.getClaims() 访问。
  - `OAuth2TokenGenerator` 主要用于实现授权授予处理的组件——例如， `authorization_code` 、 `client_credentials` 和 `refresh_token` 。
    - OAuth2AccessTokenGenerator：生成一个"不透明"（ `OAuth2TokenFormat.REFERENCE` ）的访问令牌
    - OAuth2RefreshTokenGenerator
    - JwtGenerator：生成一个 `Jwt` （ `OAuth2TokenFormat.SELF_CONTAINED` ）。
- OAuth2TokenCustomizer：提供了自定义 `OAuth2Token` 属性的能力，这些属性可以在提供的 OAuth2TokenContext 中访问。它被 OAuth2TokenGenerator 使用，以在生成 `OAuth2Token` 之前自定义其属性。
- SessionRegistry：如果启用了 OpenID Connect 1.0，将使用 `SessionRegistry` 实例来跟踪已认证的会话。 `SessionRegistry` 被默认实现用于与 OAuth2 授权端点关联的 `SessionAuthenticationStrategy` ，用于注册新的已认证会话。

#### 协议端点

**1、OAuth2 Authorization Endpoint**

```java
@Bean
public SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http) throws Exception {
	OAuth2AuthorizationServerConfigurer authorizationServerConfigurer =
			OAuth2AuthorizationServerConfigurer.authorizationServer();

	http
		.securityMatcher(authorizationServerConfigurer.getEndpointsMatcher())
		.with(authorizationServerConfigurer, (authorizationServer) ->
			authorizationServer
				.authorizationEndpoint(authorizationEndpoint ->
					authorizationEndpoint
        				.authorizationRequestConverter(authorizationRequestConverter)
                        .authorizationRequestConverters(authorizationRequestConvertersConsumer)
                        .authenticationProvider(authenticationProvider)
                        .authenticationProviders(authenticationProvidersConsumer)
                        .authorizationResponseHandler(authorizationResponseHandler)
                        .errorResponseHandler(errorResponseHandler)
                        .consentPage("/oauth2/v1/authorize")
				)
		);

	return http.build();
}
```

`OAuth2AuthorizationCodeRequestAuthenticationValidator` 是用于验证授权码授权方式中特定 OAuth2 授权请求参数的默认验证器。默认实现验证 `redirect_uri` 和 `scope` 参数。如果验证失败，将抛出 `OAuth2AuthorizationCodeRequestAuthenticationException` 。

在开发生命周期阶段，常见用例是允许在 `redirect_uri` 参数中设置 `localhost` 。

以下示例展示了如何使用自定义认证验证器配置 `OAuth2AuthorizationCodeRequestAuthenticationProvider` ，允许在 `redirect_uri` 参数中设置 `localhost` ：

```java
@Bean
public SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http) throws Exception {
	OAuth2AuthorizationServerConfigurer authorizationServerConfigurer =
			OAuth2AuthorizationServerConfigurer.authorizationServer();

	http
		.securityMatcher(authorizationServerConfigurer.getEndpointsMatcher())
		.with(authorizationServerConfigurer, (authorizationServer) ->
			authorizationServer
				.authorizationEndpoint(authorizationEndpoint ->
					authorizationEndpoint
                        .authenticationProviders(configureAuthenticationValidator())
				)
		);

	return http.build();
}

private Consumer<List<AuthenticationProvider>> configureAuthenticationValidator() {
	return (authenticationProviders) ->
		authenticationProviders.forEach((authenticationProvider) -> {
			if (authenticationProvider instanceof OAuth2AuthorizationCodeRequestAuthenticationProvider) {
				Consumer<OAuth2AuthorizationCodeRequestAuthenticationContext> authenticationValidator =
					// Override default redirect_uri validator
					new CustomRedirectUriValidator()
						// Reuse default scope validator
						.andThen(OAuth2AuthorizationCodeRequestAuthenticationValidator.DEFAULT_SCOPE_VALIDATOR);

				((OAuth2AuthorizationCodeRequestAuthenticationProvider) authenticationProvider)
					.setAuthenticationValidator(authenticationValidator);
			}
		});
}

static class CustomRedirectUriValidator implements Consumer<OAuth2AuthorizationCodeRequestAuthenticationContext> {

	@Override
	public void accept(OAuth2AuthorizationCodeRequestAuthenticationContext authenticationContext) {
		OAuth2AuthorizationCodeRequestAuthenticationToken authorizationCodeRequestAuthentication =
			authenticationContext.getAuthentication();
		RegisteredClient registeredClient = authenticationContext.getRegisteredClient();
		String requestedRedirectUri = authorizationCodeRequestAuthentication.getRedirectUri();

		// Use exact string matching when comparing client redirect URIs against pre-registered URIs
		if (!registeredClient.getRedirectUris().contains(requestedRedirectUri)) {
			OAuth2Error error = new OAuth2Error(OAuth2ErrorCodes.INVALID_REQUEST);
			throw new OAuth2AuthorizationCodeRequestAuthenticationException(error, null);
		}
	}
}
```



**2、OAuth2 Pushed Authorization Request Endpoint** 

`OAuth2PushedAuthorizationRequestEndpointConfigurer` 提供了自定义 OAuth2 推送授权请求端点的功能。它定义了扩展点，允许您自定义 OAuth2 推送授权请求的预处理、主要处理和后处理逻辑。

```java
@Bean
public SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http) throws Exception {
	OAuth2AuthorizationServerConfigurer authorizationServerConfigurer =
			OAuth2AuthorizationServerConfigurer.authorizationServer();

	http
		.securityMatcher(authorizationServerConfigurer.getEndpointsMatcher())
		.with(authorizationServerConfigurer, (authorizationServer) ->
			authorizationServer
				.pushedAuthorizationRequestEndpoint(pushedAuthorizationRequestEndpoint ->
					pushedAuthorizationRequestEndpoint
        				.pushedAuthorizationRequestConverter(pushedAuthorizationRequestConverter)
                        .pushedAuthorizationRequestConverters(pushedAuthorizationRequestConvertersConsumer)
                        .authenticationProvider(authenticationProvider)
                        .authenticationProviders(authenticationProvidersConsumer)
                        .pushedAuthorizationResponseHandler(pushedAuthorizationResponseHandler)
                        .errorResponseHandler(errorResponseHandler)
				)
		);

	return http.build();
}
```

3、OAuth2 Device Authorization Endpoint 

```java
@Bean
public SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http) throws Exception {
	OAuth2AuthorizationServerConfigurer authorizationServerConfigurer =
			OAuth2AuthorizationServerConfigurer.authorizationServer();

	http
		.securityMatcher(authorizationServerConfigurer.getEndpointsMatcher())
		.with(authorizationServerConfigurer, (authorizationServer) ->
			authorizationServer
				.deviceAuthorizationEndpoint(deviceAuthorizationEndpoint ->
                    deviceAuthorizationEndpoint
                        .deviceAuthorizationRequestConverter(deviceAuthorizationRequestConverter)
                        .deviceAuthorizationRequestConverters(deviceAuthorizationRequestConvertersConsumer)
                        .authenticationProvider(authenticationProvider)
                        .authenticationProviders(authenticationProvidersConsumer)
                        .deviceAuthorizationResponseHandler(deviceAuthorizationResponseHandler)
                        .errorResponseHandler(errorResponseHandler)
                        .verificationUri("/oauth2/v1/device_verification")
				)
		);

	return http.build();
}
```

4、OAuth2 Device Verification Endpoint 

```java
@Bean
public SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http) throws Exception {
	OAuth2AuthorizationServerConfigurer authorizationServerConfigurer =
			OAuth2AuthorizationServerConfigurer.authorizationServer();

	http
		.securityMatcher(authorizationServerConfigurer.getEndpointsMatcher())
		.with(authorizationServerConfigurer, (authorizationServer) ->
			authorizationServer
				.deviceVerificationEndpoint(deviceVerificationEndpoint ->
                    deviceVerificationEndpoint
                        .deviceVerificationRequestConverter(deviceVerificationRequestConverter)
                        .deviceVerificationRequestConverters(deviceVerificationRequestConvertersConsumer)
                        .authenticationProvider(authenticationProvider)
                        .authenticationProviders(authenticationProvidersConsumer)
                        .deviceVerificationResponseHandler(deviceVerificationResponseHandler)
                        .errorResponseHandler(errorResponseHandler)
                        .consentPage("/oauth2/v1/consent")
				)
		);

	return http.build();
}
```

5、OAuth2 Token Endpoint

```java
@Bean
public SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http) throws Exception {
	OAuth2AuthorizationServerConfigurer authorizationServerConfigurer =
			OAuth2AuthorizationServerConfigurer.authorizationServer();

	http
		.securityMatcher(authorizationServerConfigurer.getEndpointsMatcher())
		.with(authorizationServerConfigurer, (authorizationServer) ->
			authorizationServer
				.tokenEndpoint(tokenEndpoint ->
                    tokenEndpoint
                        .accessTokenRequestConverter(accessTokenRequestConverter)
                        .accessTokenRequestConverters(accessTokenRequestConvertersConsumer)
                        .authenticationProvider(authenticationProvider)
                        .authenticationProviders(authenticationProvidersConsumer)
                        .accessTokenResponseHandler(accessTokenResponseHandler)
                        .errorResponseHandler(errorResponseHandler)
				)
		);

	return http.build();
}
```

6、OAuth2 Token Introspection Endpoint 

```java
@Bean
public SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http) throws Exception {
	OAuth2AuthorizationServerConfigurer authorizationServerConfigurer =
			OAuth2AuthorizationServerConfigurer.authorizationServer();

	http
		.securityMatcher(authorizationServerConfigurer.getEndpointsMatcher())
		.with(authorizationServerConfigurer, (authorizationServer) ->
			authorizationServer
				.tokenIntrospectionEndpoint(tokenIntrospectionEndpoint ->
                    tokenIntrospectionEndpoint
                        .introspectionRequestConverter(introspectionRequestConverter)
                        .introspectionRequestConverters(introspectionRequestConvertersConsumer)
                        .authenticationProvider(authenticationProvider)
                        .authenticationProviders(authenticationProvidersConsumer)
                        .introspectionResponseHandler(introspectionResponseHandler)
                        .errorResponseHandler(errorResponseHandler)
				)
		);

	return http.build();
}
```

7、OAuth2 Token Revocation Endpoint 

```java
@Bean
public SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http) throws Exception {
	OAuth2AuthorizationServerConfigurer authorizationServerConfigurer =
			OAuth2AuthorizationServerConfigurer.authorizationServer();

	http
		.securityMatcher(authorizationServerConfigurer.getEndpointsMatcher())
		.with(authorizationServerConfigurer, (authorizationServer) ->
			authorizationServer
				.tokenRevocationEndpoint(tokenRevocationEndpoint ->
                    tokenRevocationEndpoint
                        .revocationRequestConverter(revocationRequestConverter)
                        .revocationRequestConverters(revocationRequestConvertersConsumer)
                        .authenticationProvider(authenticationProvider)
                        .authenticationProviders(authenticationProvidersConsumer)
                        .revocationResponseHandler(revocationResponseHandler)
                        .errorResponseHandler(errorResponseHandler)
				)
		);

	return http.build();
}
```

8、OAuth2 Authorization Server Metadata Endpoint 

```java
@Bean
public SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http) throws Exception {
	OAuth2AuthorizationServerConfigurer authorizationServerConfigurer =
			OAuth2AuthorizationServerConfigurer.authorizationServer();

	http
		.securityMatcher(authorizationServerConfigurer.getEndpointsMatcher())
		.with(authorizationServerConfigurer, (authorizationServer) ->
			authorizationServer
				.authorizationServerMetadataEndpoint(authorizationServerMetadataEndpoint ->
                    authorizationServerMetadataEndpoint
                        .authorizationServerMetadataCustomizer(authorizationServerMetadataCustomizer)
				)
		);

	return http.build();
}
```

9、JWK Set Endpoint 

10、OpenID Connect 1.0 Provider Configuration Endpoint 

```java
@Bean
public SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http) throws Exception {
	OAuth2AuthorizationServerConfigurer authorizationServerConfigurer =
			OAuth2AuthorizationServerConfigurer.authorizationServer();

	http
		.securityMatcher(authorizationServerConfigurer.getEndpointsMatcher())
		.with(authorizationServerConfigurer, (authorizationServer) ->
			authorizationServer
                .oidc(oidc ->
                    oidc
                        .providerConfigurationEndpoint(providerConfigurationEndpoint ->
                            providerConfigurationEndpoint
                                .providerConfigurationCustomizer(providerConfigurationCustomizer)
                        )
                )
		);

	return http.build();
}
```

11、OpenID Connect 1.0 Logout Endpoint 

```java
@Bean
public SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http) throws Exception {
	OAuth2AuthorizationServerConfigurer authorizationServerConfigurer =
			OAuth2AuthorizationServerConfigurer.authorizationServer();

	http
		.securityMatcher(authorizationServerConfigurer.getEndpointsMatcher())
		.with(authorizationServerConfigurer, (authorizationServer) ->
			authorizationServer
                .oidc(oidc ->
                    oidc
                        .logoutEndpoint(logoutEndpoint ->
                            logoutEndpoint
                                .logoutRequestConverter(logoutRequestConverter)
                                .logoutRequestConverters(logoutRequestConvertersConsumer)
                                .authenticationProvider(authenticationProvider)
                                .authenticationProviders(authenticationProvidersConsumer)
                                .logoutResponseHandler(logoutResponseHandler)
                                .errorResponseHandler(errorResponseHandler)
                        )
                )
		);

	return http.build();
}
```

12、OpenID Connect 1.0 UserInfo Endpoint 

```java
@Bean
public SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http) throws Exception {
	OAuth2AuthorizationServerConfigurer authorizationServerConfigurer =
			OAuth2AuthorizationServerConfigurer.authorizationServer();

	http
		.securityMatcher(authorizationServerConfigurer.getEndpointsMatcher())
		.with(authorizationServerConfigurer, (authorizationServer) ->
			authorizationServer
                .oidc(oidc ->
                    oidc
                        .userInfoEndpoint(userInfoEndpoint ->
                            userInfoEndpoint
                                .userInfoRequestConverter(userInfoRequestConverter)
                                .userInfoRequestConverters(userInfoRequestConvertersConsumer)
                                .authenticationProvider(authenticationProvider)
                                .authenticationProviders(authenticationProvidersConsumer)
                                .userInfoResponseHandler(userInfoResponseHandler)
                                .errorResponseHandler(errorResponseHandler)
                                .userInfoMapper(userInfoMapper)
                        )
                )
		);

	return http.build();
}
```

13、OpenID Connect 1.0 Client Registration Endpoint 

```java
@Bean
public SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http) throws Exception {
	OAuth2AuthorizationServerConfigurer authorizationServerConfigurer =
			OAuth2AuthorizationServerConfigurer.authorizationServer();

	http
		.securityMatcher(authorizationServerConfigurer.getEndpointsMatcher())
		.with(authorizationServerConfigurer, (authorizationServer) ->
			authorizationServer
                .oidc(oidc ->
                    oidc
                        .clientRegistrationEndpoint(clientRegistrationEndpoint ->
                            clientRegistrationEndpoint
                                .clientRegistrationRequestConverter(clientRegistrationRequestConverter)
                                .clientRegistrationRequestConverters(clientRegistrationRequestConvertersConsumers)
                                .authenticationProvider(authenticationProvider)
                                .authenticationProviders(authenticationProvidersConsumer)
                                .clientRegistrationResponseHandler(clientRegistrationResponseHandler)
                                .errorResponseHandler(errorResponseHandler)
                        )
                )
		);

	return http.build();
}
```

