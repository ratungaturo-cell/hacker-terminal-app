# Design do Aplicativo Hacker Terminal

## Conceito Geral
Aplicativo móvel com tema hacker/cyberpunk que simula uma interface de terminal de comandos. O design deve evocar a estética de filmes de hacker dos anos 90/2000, com cores neon em fundo escuro, tipografia monoespaçada e efeitos visuais característicos de terminais.

## Orientação e Uso
- **Orientação**: Portrait (9:16)
- **Uso**: Uma mão, com elementos interativos acessíveis na parte inferior/central da tela

## Paleta de Cores
- **Background**: Preto profundo (#000000) e cinza escuro (#0a0e14)
- **Primary (Accent)**: Verde neon (#00ff41) - cor característica de terminais clássicos
- **Secondary**: Ciano (#00d9ff) - para destaques e elementos secundários
- **Text**: Verde claro (#00ff41) para texto principal, branco (#ffffff) para títulos
- **Error**: Vermelho neon (#ff0055)
- **Success**: Verde brilhante (#00ff41)
- **Border**: Verde escuro com transparência (#00ff4133)

## Lista de Telas

### 1. Tela de Login (LoginScreen)
**Localização**: `app/login.tsx` (fora das tabs)

**Conteúdo e Funcionalidade**:
- Logo do aplicativo (ícone de terminal/skull hacker) no topo
- Título "HACKER TERMINAL" com efeito de texto digitado
- Campo de input para username (com prefixo "> root@")
- Campo de input para password (caracteres mascarados com asteriscos)
- Botão "ACCESS GRANTED" com efeito de brilho neon
- Animação de "scanning" ou "loading" ao fazer login
- Mensagens de erro em vermelho neon se credenciais inválidas

**Fluxo**: 
- Usuário abre o app → Tela de Login
- Preenche credenciais → Clica em ACCESS GRANTED
- Validação bem-sucedida → Navega para Terminal Screen

### 2. Tela Principal - Terminal (TerminalScreen)
**Localização**: `app/(tabs)/index.tsx`

**Conteúdo e Funcionalidade**:
- Header fixo no topo:
  - Título "TERMINAL" ou "root@hacker:~$"
  - Indicador de status (online/connected) com LED pulsante
  - Botão de logout no canto superior direito
  
- Área de comandos (ScrollView):
  - Lista de comandos disponíveis em cards/botões:
    - "SCAN NETWORK" - simula scan de rede
    - "DECRYPT FILES" - animação de decriptação
    - "BREACH FIREWALL" - barra de progresso de ataque
    - "ACCESS DATABASE" - lista de dados fictícios
    - "TRACE IP" - mapa com localização fictícia
    - "SYSTEM INFO" - informações do dispositivo
  - Cada comando é um card com:
    - Ícone temático (shield, lock, wifi, etc.)
    - Nome do comando em verde neon
    - Descrição breve
    - Indicador de status (ready/running/complete)

- Área de output (parte inferior):
  - Console de texto monoespaçado
  - Mostra resultado dos comandos executados
  - Efeito de texto digitando linha por linha
  - Scroll automático para última linha

**Fluxo**:
- Usuário seleciona um comando → Animação de execução
- Output aparece no console → Status atualizado
- Usuário pode executar múltiplos comandos sequencialmente

### 3. Tela de Perfil (ProfileScreen) - Opcional
**Localização**: `app/(tabs)/profile.tsx`

**Conteúdo e Funcionalidade**:
- Avatar com tema hacker (ícone de usuário com máscara)
- Username e nível de acesso (ex: "LEVEL 5 HACKER")
- Estatísticas:
  - Comandos executados
  - Tempo de sessão
  - Sistemas acessados
- Configurações:
  - Tema de cor (verde/ciano/vermelho)
  - Som de digitação on/off
  - Efeitos visuais on/off
- Botão de logout

## Fluxos de Usuário Principais

### Fluxo 1: Login e Acesso ao Terminal
1. Usuário abre o app
2. Tela de Login aparece
3. Usuário digita username e password
4. Clica em "ACCESS GRANTED"
5. Animação de loading/scanning
6. Redireciona para Terminal Screen

### Fluxo 2: Executar Comando
1. Usuário está na Terminal Screen
2. Visualiza lista de comandos disponíveis
3. Toca em um comando (ex: "SCAN NETWORK")
4. Animação de execução inicia
5. Output aparece no console linha por linha
6. Status do comando atualiza para "COMPLETE"
7. Usuário pode executar próximo comando

### Fluxo 3: Logout
1. Usuário toca no botão de logout (header ou profile)
2. Confirmação aparece: "TERMINATE SESSION?"
3. Confirma → Retorna para tela de Login
4. Estado do app é resetado

## Elementos de Design Específicos

### Tipografia
- **Títulos**: Fonte monoespaçada bold (ex: "Courier New", "Fira Code")
- **Corpo**: Fonte monoespaçada regular
- **Tamanhos**: 
  - Título principal: 24-28px
  - Comandos: 16-18px
  - Console output: 14px

### Efeitos Visuais
- **Glow/Brilho**: Texto e bordas com sombra neon (shadow com blur)
- **Scan lines**: Linhas horizontais sutis animadas sobre a tela
- **Cursor piscante**: No console de output
- **Typing effect**: Texto aparece caractere por caractere
- **Glitch effect**: Ocasional distorção visual em transições

### Componentes Reutilizáveis
- **CommandCard**: Card de comando com ícone, título, descrição e status
- **ConsoleOutput**: Área de texto monoespaçado com scroll e typing effect
- **NeonButton**: Botão com borda neon e efeito de brilho ao pressionar
- **StatusIndicator**: LED pulsante (verde/vermelho/amarelo)
- **HackerInput**: Input field com prefixo de terminal e estilo neon

## Considerações de UX
- Feedback tátil (haptics) ao tocar em comandos
- Animações rápidas (200-400ms) para não atrasar interação
- Mensagens de status claras durante execução de comandos
- Possibilidade de cancelar comandos em execução
- Persistência de sessão (usuário não precisa fazer login toda vez)
- Dados fictícios/simulados - não há funcionalidade real de hacking
