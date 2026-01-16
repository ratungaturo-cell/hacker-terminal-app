# Project TODO

## Branding
- [x] Gerar logo personalizado com tema hacker
- [x] Atualizar app.config.ts com nome e logo

## Configuração de Tema
- [x] Atualizar theme.config.js com paleta de cores hacker (verde neon, preto, ciano)
- [x] Configurar cores personalizadas no Tailwind

## Tela de Login
- [x] Criar componente LoginScreen
- [x] Implementar campos de input (username e password)
- [x] Adicionar botão "ACCESS GRANTED" com estilo neon
- [x] Implementar validação de login
- [x] Adicionar animação de loading/scanning
- [x] Implementar navegação para tela principal após login

## Tela Principal - Terminal
- [x] Criar layout principal com header
- [x] Implementar lista de comandos disponíveis
- [x] Criar componente CommandCard reutilizável
- [x] Implementar área de console output
- [x] Adicionar efeito de texto digitando
- [x] Implementar execução de comandos com animações
- [x] Adicionar funcionalidade de logout

## Componentes Reutilizáveis
- [x] Criar componente NeonButton
- [x] Criar componente HackerInput
- [x] Criar componente StatusIndicator
- [x] Criar componente ConsoleOutput

## Funcionalidades dos Comandos
- [x] SCAN NETWORK - simulação de scan
- [x] DECRYPT FILES - animação de decriptação
- [x] BREACH FIREWALL - barra de progresso
- [x] ACCESS DATABASE - exibir dados fictícios
- [x] TRACE IP - mostrar localização fictícia
- [x] SYSTEM INFO - informações do dispositivo

## Efeitos Visuais
- [x] Adicionar efeito de brilho neon em textos e bordas
- [x] Implementar cursor piscante no console
- [x] Adicionar feedback háptico nos botões

## Navegação
- [x] Configurar navegação entre login e terminal
- [x] Implementar persistência de sessão com AsyncStorage


## Novas Funcionalidades - Autenticação Melhorada
- [x] Criar tela de registro (Sign Up)
- [x] Implementar validação de email e senha
- [x] Refatorar tela de login para usuários existentes
- [x] Criar sistema de armazenamento de usuários com AsyncStorage
- [x] Adicionar navegação entre login e registro
- [x] Implementar logout com limpeza de dados

## Testes e Correção de Bugs
- [x] Testar fluxo de registro
- [x] Testar fluxo de login
- [x] Validar execução de todos os comandos
- [x] Corrigir bugs de conexão dos comandos
- [x] Testar persistência de sessão
- [x] Validar feedback visual de comandos
