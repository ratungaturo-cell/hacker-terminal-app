# 🎯 Hacker Terminal App

Um aplicativo móvel interativo com tema cyberpunk que simula uma interface de terminal hacker. Desenvolvido com React Native, Expo e TypeScript.

## 📱 Características Principais

### 🔐 Autenticação
- **Tela de Login** - Acesso para usuários existentes
- **Tela de Registro** - Criação de novas contas
- **Persistência de Sessão** - Dados salvos em AsyncStorage
- **Logout Seguro** - Limpeza completa de dados

### 🎮 Interface Terminal
- **6 Comandos Simulados**
  - 📡 Escanear Rede - Detecta dispositivos conectados
  - 🔓 Decriptar Arquivos - Simula decriptação AES-256
  - 🛡️ Quebrar Firewall - Análise de vulnerabilidades
  - 💾 Acessar Banco de Dados - Executa queries SQL
  - 🌍 Rastrear IP - Geolocalização de endereços IP
  - ⚙️ Informações do Sistema - Dados do dispositivo

### 🎨 Personalização
- **4 Temas Disponíveis**
  - Verde Neon (padrão)
  - Ciano
  - Roxo
  - Vermelho

- **3 Idiomas Suportados**
  - Português (padrão)
  - Inglês
  - Espanhol

### 🔊 Efeitos de Som
- Som de digitação
- Som de sucesso
- Som de erro
- Som de clique

### 🎯 Telas de Detalhes
Cada comando possui uma tela dedicada com:
- Análise aprofundada
- Progresso em tempo real
- Dados simulados realistas
- Interatividade completa

### 📊 Console Output
- Exibe últimas 8 notificações
- Atualização em tempo real
- Apenas alterações recentes
- Feedback visual de execução

## 🛠️ Stack Tecnológico

- **React Native** 0.81.5
- **Expo** SDK 54
- **TypeScript** 5.9
- **React Router** 6
- **NativeWind** 4 (Tailwind CSS)
- **Expo Audio** - Efeitos de som
- **Expo Haptics** - Feedback háptico
- **AsyncStorage** - Persistência local
- **Vitest** - Testes unitários

## 📁 Estrutura do Projeto

```
hacker-terminal-app/
├── app/
│   ├── _layout.tsx              # Layout raiz com providers
│   ├── index.tsx                # Redirecionamento inicial
│   ├── login.tsx                # Tela de login
│   ├── signup.tsx               # Tela de registro
│   ├── settings.tsx             # Tela de configurações
│   ├── (tabs)/
│   │   ├── _layout.tsx          # Layout das abas
│   │   └── index.tsx            # Tela principal do terminal
│   └── command-details/
│       ├── scan.tsx             # Detalhes: Escanear Rede
│       ├── decrypt.tsx          # Detalhes: Decriptar Arquivos
│       ├── firewall.tsx         # Detalhes: Quebrar Firewall
│       ├── database.tsx         # Detalhes: Acessar Banco de Dados
│       ├── trace.tsx            # Detalhes: Rastrear IP
│       └── sysinfo.tsx          # Detalhes: Informações do Sistema
├── components/
│   ├── screen-container.tsx     # Wrapper de SafeArea
│   ├── command-card.tsx         # Card de comando
│   ├── console-output.tsx       # Exibição do console
│   ├── status-indicator.tsx     # Indicador de status
│   ├── hacker-input.tsx         # Input estilizado
│   ├── neon-button.tsx          # Botão com efeito neon
│   └── ui/
│       └── icon-symbol.tsx      # Mapeamento de ícones
├── hooks/
│   ├── use-language.ts          # Gerenciamento de idioma
│   ├── use-theme.ts             # Gerenciamento de tema
│   ├── use-sound.ts             # Gerenciamento de efeitos de som
│   ├── use-colors.ts            # Acesso às cores do tema
│   └── use-color-scheme.ts      # Detecção de tema do sistema
├── lib/
│   ├── auth-service.ts          # Serviço de autenticação
│   ├── i18n.ts                  # Sistema de internacionalização
│   ├── themes.ts                # Definição de temas
│   ├── utils.ts                 # Utilitários (cn, etc)
│   ├── trpc.ts                  # Cliente tRPC
│   └── __tests__/
│       ├── auth-service.test.ts # Testes de autenticação
│       └── commands.test.ts     # Testes de comandos
├── constants/
│   └── theme.ts                 # Exportação de cores do tema
├── assets/
│   ├── images/
│   │   ├── icon.png             # Logo do app
│   │   ├── splash-icon.png      # Ícone splash
│   │   ├── favicon.png          # Favicon web
│   │   └── android-icon-*.png   # Ícones Android
│   └── fonts/                   # Fontes customizadas
├── app.config.ts                # Configuração do Expo
├── tailwind.config.js           # Configuração Tailwind
├── theme.config.js              # Paleta de cores
├── package.json                 # Dependências
├── tsconfig.json                # Configuração TypeScript
└── README.md                    # Este arquivo
```

## 🚀 Como Começar

### Pré-requisitos
- Node.js 18+
- npm ou pnpm
- Expo CLI (opcional)

### Instalação

```bash
# Clonar repositório
git clone https://github.com/ratungaturo-cell/hacker-terminal-app.git
cd hacker-terminal-app

# Instalar dependências
pnpm install
# ou
npm install
```

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
pnpm dev
# ou
npm run dev

# Executar testes
pnpm test
# ou
npm test

# Verificar tipos TypeScript
pnpm check
# ou
npm run check
```

### Build

```bash
# Build para produção
pnpm build
# ou
npm run build

# Iniciar servidor de produção
pnpm start
# ou
npm start
```

## 📱 Testando no Dispositivo

### iOS
```bash
pnpm ios
# ou
npm run ios
```

### Android
```bash
pnpm android
# ou
npm run android
```

### Web
O aplicativo está disponível em `http://localhost:8081` durante o desenvolvimento.

## 🧪 Testes

O projeto inclui testes unitários para:
- Autenticação (login, registro, logout)
- Execução de comandos
- Persistência de dados

```bash
# Executar testes
pnpm test

# Executar testes com cobertura
pnpm test -- --coverage

# Modo watch
pnpm test -- --watch
```

## 🎨 Temas Disponíveis

### Verde Neon (Padrão)
- Primária: `#00ff41`
- Secundária: `#00cc33`
- Sucesso: `#00ff41`
- Erro: `#ff0055`

### Ciano
- Primária: `#00ffff`
- Secundária: `#00cccc`
- Sucesso: `#00ff88`
- Erro: `#ff0055`

### Roxo
- Primária: `#bb86fc`
- Secundária: `#9966ff`
- Sucesso: `#69f0ae`
- Erro: `#ff6b6b`

### Vermelho
- Primária: `#ff3333`
- Secundária: `#cc0000`
- Sucesso: `#00ff41`
- Erro: `#ff0055`

## 🌐 Idiomas Suportados

- **Português** (pt) - Padrão
- **Inglês** (en)
- **Espanhol** (es)

Adicionar novos idiomas é simples - edite `lib/i18n.ts` e adicione suas traduções.

## 🔊 Efeitos de Som

O aplicativo usa Web Audio API para gerar efeitos de som sintetizados:
- **Digitação**: 150Hz, 50ms
- **Sucesso**: 400Hz → 800Hz, 300ms
- **Erro**: 600Hz → 200Hz, 200ms
- **Clique**: 300Hz, 100ms

Em dispositivos mobile, os sons são simulados (sem dependências externas).

## 🔐 Segurança

- Senhas armazenadas em AsyncStorage (em produção, usar backend seguro)
- Sessões persistentes com logout seguro
- Validação de entrada em todos os formulários
- Sem dados sensíveis em logs

## 📦 Dependências Principais

```json
{
  "react": "19.1.0",
  "react-native": "0.81.5",
  "expo": "~54.0.29",
  "expo-router": "~6.0.19",
  "nativewind": "^4.2.1",
  "typescript": "~5.9.3"
}
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Desenvolvido por:** Manus AI  
**Usuário GitHub:** [ratungaturo-cell](https://github.com/ratungaturo-cell)

## 🐛 Reportar Bugs

Se encontrar um bug, por favor abra uma [Issue](https://github.com/ratungaturo-cell/hacker-terminal-app/issues) com:
- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs. atual
- Screenshots/vídeos (se aplicável)

## 💡 Sugestões de Melhorias

Tem ideias para melhorar o app? Abra uma [Discussion](https://github.com/ratungaturo-cell/hacker-terminal-app/discussions) ou [Issue](https://github.com/ratungaturo-cell/hacker-terminal-app/issues) com a tag `enhancement`.

## 🎓 Aprendizado

Este projeto demonstra:
- Desenvolvimento mobile com React Native e Expo
- Gerenciamento de estado com React Hooks
- Internacionalização (i18n)
- Temas personalizáveis
- Autenticação local
- Testes unitários com Vitest
- TypeScript em aplicações mobile
- Efeitos de som sintetizados
- Feedback háptico
- Design responsivo

## 📞 Suporte

Para suporte, abra uma [Issue](https://github.com/ratungaturo-cell/hacker-terminal-app/issues) ou entre em contato através do GitHub.

---

**Versão:** 1.0.0  
**Última atualização:** Janeiro 2026  
**Status:** ✅ Produção
