import{_ as a,c as r,a0 as t,o as i}from"./chunks/framework.DHkrr0_B.js";const f=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"java/index.md","filePath":"java/index.md"}'),l={name:"java/index.md"};function s(n,e,o,h,p,k){return i(),r("div",null,e[0]||(e[0]=[t(`<h2 id="installation" tabindex="-1">Installation <a class="header-anchor" href="#installation" aria-label="Permalink to &quot;Installation&quot;">​</a></h2><p>Easy way to install Java is using <a href="https://sdkman.io/" target="_blank" rel="noreferrer">SDKMAN</a></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;https://get.sdkman.io&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> bash</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> source</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$HOME</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/.sdkman/bin/sdkman-init.sh&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sdk</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> version</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sdk</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> java</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sdk</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> java</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 21.0.1-tem</span></span></code></pre></div><h2 id="ides" tabindex="-1">IDEs <a class="header-anchor" href="#ides" aria-label="Permalink to &quot;IDEs&quot;">​</a></h2><ul><li><a href="https://www.jetbrains.com/idea/" target="_blank" rel="noreferrer">Intellij IDEA</a></li><li><a href="https://www.eclipse.org/downloads/packages/" target="_blank" rel="noreferrer">Eclipse</a></li><li><a href="https://spring.io/tools/sts/all" target="_blank" rel="noreferrer">Spring Tool Suite</a></li><li><a href="https://netbeans.org/" target="_blank" rel="noreferrer">NetBeans</a></li></ul><h2 id="java-libraries-and-tools" tabindex="-1">Java Libraries and Tools <a class="header-anchor" href="#java-libraries-and-tools" aria-label="Permalink to &quot;Java Libraries and Tools&quot;">​</a></h2><ul><li><a href="https://projectlombok.org/" target="_blank" rel="noreferrer">Lombok</a></li><li><a href="https://github.com/google/auto/blob/master/value/userguide/index.md" target="_blank" rel="noreferrer">AutoValue</a></li><li><a href="https://immutables.github.io/immutable.html" target="_blank" rel="noreferrer">Immutable objects</a></li><li><a href="http://www.jasypt.org/" target="_blank" rel="noreferrer">Jasypt</a></li><li><a href="https://github.com/jwtk/jjwt" target="_blank" rel="noreferrer">JJwt</a></li><li><a href="https://github.com/FasterXML/jackson" target="_blank" rel="noreferrer">Jackson JSON</a></li><li><a href="http://www.vavr.io/" target="_blank" rel="noreferrer">Vavr</a></li><li><a href="https://ff4j.github.io/" target="_blank" rel="noreferrer">FF4j</a></li><li><a href="https://github.com/jhalterman/failsafe" target="_blank" rel="noreferrer">Failsafe</a></li><li><a href="https://github.com/elennick/retry4j" target="_blank" rel="noreferrer">Retry4j</a></li><li><a href="http://twitter4j.org/en/" target="_blank" rel="noreferrer">Twitter4j</a></li><li><a href="https://www.jooq.org/" target="_blank" rel="noreferrer">JooQ</a></li><li><a href="https://github.com/vladmihalcea/flexy-pool" target="_blank" rel="noreferrer">FlexyPool</a></li><li><a href="https://github.com/vladmihalcea/hibernate-types" target="_blank" rel="noreferrer">Hibernate-Types</a></li><li><a href="https://github.com/resilience4j/resilience4j" target="_blank" rel="noreferrer">Resilience4j</a></li><li><a href="https://github.com/zalando/problem-spring-web" target="_blank" rel="noreferrer">Zalando/problem-spring-web</a></li><li><a href="http://springfox.github.io/springfox/" target="_blank" rel="noreferrer">SpringFox</a></li></ul><h2 id="code-generator" tabindex="-1">Code Generator <a class="header-anchor" href="#code-generator" aria-label="Permalink to &quot;Code Generator&quot;">​</a></h2><ul><li><p>Spring Initializr</p></li><li><p><a href="https://www.jhipster.tech/" target="_blank" rel="noreferrer">JHipster</a></p></li><li><p><a href="https://bootify.io/" target="_blank" rel="noreferrer">Bootify</a></p></li><li><p><a href="https://github.com/sivaprasadreddy/generator-springboot" target="_blank" rel="noreferrer">generator-springboot</a></p></li><li><p><a href="https://github.com/sivaprasadreddy/progen" target="_blank" rel="noreferrer">progen</a></p></li></ul><h3 id="testing" tabindex="-1">Testing <a class="header-anchor" href="#testing" aria-label="Permalink to &quot;Testing&quot;">​</a></h3><ul><li><a href="https://junit.org/junit5/docs/current/user-guide/" target="_blank" rel="noreferrer">JUnit 5 Docs</a></li><li><a href="https://github.com/rest-assured/rest-assured/wiki/Usage" target="_blank" rel="noreferrer">REST Assured</a></li><li><a href="http://www.mock-server.com/" target="_blank" rel="noreferrer">Mock Server</a></li><li><a href="https://www.testcontainers.org/" target="_blank" rel="noreferrer">TestContainers</a></li><li><a href="https://site.mockito.org/" target="_blank" rel="noreferrer">Mockito</a></li><li><a href="http://joel-costigliola.github.io/assertj/" target="_blank" rel="noreferrer">Assertj</a></li><li><a href="https://github.com/awaitility/awaitility" target="_blank" rel="noreferrer">Awaitility</a></li><li><a href="https://localstack.cloud/" target="_blank" rel="noreferrer">Localstack</a></li><li><a href="https://www.eclemma.org/jacoco/" target="_blank" rel="noreferrer">Jacoco</a></li><li><a href="https://www.sonarqube.org/" target="_blank" rel="noreferrer">SonarQube</a></li><li><a href="https://sonarcloud.io/" target="_blank" rel="noreferrer">SonarCloud</a></li></ul><h3 id="performace-testinng" tabindex="-1">Performace Testinng <a class="header-anchor" href="#performace-testinng" aria-label="Permalink to &quot;Performace Testinng&quot;">​</a></h3><ul><li><a href="https://gatling.io/" target="_blank" rel="noreferrer">Gatling</a></li><li><a href="https://jmeter.apache.org/" target="_blank" rel="noreferrer">JMeter</a></li></ul><h3 id="database-migration" tabindex="-1">Database Migration <a class="header-anchor" href="#database-migration" aria-label="Permalink to &quot;Database Migration&quot;">​</a></h3><ul><li><a href="https://flywaydb.org/" target="_blank" rel="noreferrer">Flyway DB Migration</a></li><li><a href="https://www.liquibase.org/" target="_blank" rel="noreferrer">Liquibase</a></li></ul><h3 id="ci-cd" tabindex="-1">CI/CD <a class="header-anchor" href="#ci-cd" aria-label="Permalink to &quot;CI/CD&quot;">​</a></h3><ul><li><a href="https://jenkins.io/" target="_blank" rel="noreferrer">Jenkins</a></li><li><a href="https://travis-ci.org/" target="_blank" rel="noreferrer">TravisCI</a></li><li><a href="https://circleci.com/" target="_blank" rel="noreferrer">CircleCI</a></li></ul><h3 id="monitoring" tabindex="-1">Monitoring <a class="header-anchor" href="#monitoring" aria-label="Permalink to &quot;Monitoring&quot;">​</a></h3><ul><li><a href="https://grafana.com/" target="_blank" rel="noreferrer">Grafana</a></li><li><a href="https://prometheus.io/" target="_blank" rel="noreferrer">Prometheus</a></li><li><a href="https://www.elastic.co/elk-stack" target="_blank" rel="noreferrer">ELK Stack</a></li></ul><h2 id="references" tabindex="-1">References <a class="header-anchor" href="#references" aria-label="Permalink to &quot;References&quot;">​</a></h2><ul><li><a href="https://www.oracle.com/technetwork/java/javase/downloads/index.html" target="_blank" rel="noreferrer">https://www.oracle.com/technetwork/java/javase/downloads/index.html</a></li><li><a href="https://www.reddit.com/r/java" target="_blank" rel="noreferrer">https://www.reddit.com/r/java</a></li></ul>`,21)]))}const d=a(l,[["render",s]]);export{f as __pageData,d as default};
