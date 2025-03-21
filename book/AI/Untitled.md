## Ollama

```bash
brew install ollama

ollama serve

ollama run deepseek-r1:1.5b

docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```

**如何配置远程 Ollama 服务？**

需要设置以下两个环境变量：

```bash
OLLAMA_HOST=0.0.0.0
OLLAMA_ORIGINS=*
```

在 MacOS 上配置：

 ```bash
 launchctl setenv OLLAMA_HOST "0.0.0.0"
 launchctl setenv OLLAMA_ORIGINS "*"
 ```



其他工具：

- [Chrome 插件：Page Assist - 本地 AI 模型的 Web UI](https://chromewebstore.google.com/detail/page-assist-%E6%9C%AC%E5%9C%B0-ai-%E6%A8%A1%E5%9E%8B%E7%9A%84-web/jfgfiigpkhlkbnfnbobbkinehhfdhndo?hl=zh-CN&utm_source=ext_sidebar)

- [Chatbox AI](https://chatboxai.app/zh)