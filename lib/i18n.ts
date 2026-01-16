export type Language = 'pt' | 'en' | 'es';

export const translations = {
  pt: {
    // Login Screen
    login: {
      title: 'TERMINAL HACKER',
      subtitle: 'v1.0.0 - ACESSO SEGURO REQUERIDO',
      username: 'usuário',
      password: 'senha',
      button: 'ACESSO CONCEDIDO',
      authenticating: 'AUTENTICANDO...',
      credentialsRequired: 'CREDENCIAIS OBRIGATÓRIAS',
      invalidCredentials: 'ACESSO NEGADO: CREDENCIAIS INVÁLIDAS',
      newToNetwork: 'NOVO NA REDE?',
      createAccount: 'CRIAR CONTA',
      unauthorized: 'ACESSO NÃO AUTORIZADO É PROIBIDO',
      monitored: 'TODAS AS ATIVIDADES SÃO MONITORADAS',
    },
    // Sign Up Screen
    signup: {
      title: 'CRIAR CONTA',
      subtitle: 'JUNTE-SE À REDE',
      username: 'usuário',
      email: 'email@dominio.com',
      password: 'senha',
      confirmPassword: 'confirmar senha',
      button: 'CRIAR CONTA',
      creating: 'CRIANDO...',
      allFieldsRequired: 'TODOS OS CAMPOS SÃO OBRIGATÓRIOS',
      passwordsMismatch: 'AS SENHAS NÃO CORRESPONDEM',
      accountCreated: 'CONTA CRIADA COM SUCESSO',
      alreadyHaveAccount: 'JÁ TEM UMA CONTA?',
      loginHere: 'ENTRAR AQUI',
    },
    // Terminal Screen
    terminal: {
      logout: 'SAIR',
      availableCommands: 'COMANDOS DISPONÍVEIS',
      consoleOutput: 'SAÍDA DO CONSOLE',
      systemInitialized: '> Sistema inicializado...',
      welcome: '> Bem-vindo ao Terminal Hacker v1.0.0',
      typeCommand: '> Digite um comando para começar',
      executing: '> Executando',
      commands: {
        scan: {
          title: 'ESCANEAR REDE',
          description: 'Descobrir dispositivos na rede local',
        },
        decrypt: {
          title: 'DECRIPTAR ARQUIVOS',
          description: 'Decriptar dados criptografados',
        },
        firewall: {
          title: 'QUEBRAR FIREWALL',
          description: 'Penetrar firewall de segurança',
        },
        database: {
          title: 'ACESSAR BANCO DE DADOS',
          description: 'Consultar banco de dados remoto',
        },
        trace: {
          title: 'RASTREAR IP',
          description: 'Localizar endereço IP',
        },
        sysinfo: {
          title: 'INFORMAÇÕES DO SISTEMA',
          description: 'Exibir informações do sistema',
        },
      },
    },
    // Settings
    settings: {
      title: 'CONFIGURAÇÕES',
      language: 'IDIOMA',
      theme: 'TEMA',
      portuguese: 'Português',
      english: 'English',
      spanish: 'Español',
      themeGreen: 'Verde Neon',
      themeCyan: 'Ciano',
      themePurple: 'Roxo',
      themeRed: 'Vermelho',
      save: 'SALVAR',
    },
    // Status
    status: {
      ready: 'PRONTO',
      running: 'EXECUTANDO...',
      complete: 'COMPLETO',
      online: 'ONLINE',
      offline: 'OFFLINE',
      connecting: 'CONECTANDO',
    },
  },
  en: {
    // Login Screen
    login: {
      title: 'HACKER TERMINAL',
      subtitle: 'v1.0.0 - SECURE ACCESS REQUIRED',
      username: 'username',
      password: 'password',
      button: 'ACCESS GRANTED',
      authenticating: 'AUTHENTICATING...',
      credentialsRequired: 'CREDENTIALS REQUIRED',
      invalidCredentials: 'ACCESS DENIED: INVALID CREDENTIALS',
      newToNetwork: 'NEW TO THE NETWORK?',
      createAccount: 'CREATE ACCOUNT',
      unauthorized: 'UNAUTHORIZED ACCESS IS PROHIBITED',
      monitored: 'ALL ACTIVITIES ARE MONITORED',
    },
    // Sign Up Screen
    signup: {
      title: 'CREATE ACCOUNT',
      subtitle: 'JOIN THE NETWORK',
      username: 'username',
      email: 'email@domain.com',
      password: 'password',
      confirmPassword: 'confirm password',
      button: 'CREATE ACCOUNT',
      creating: 'CREATING...',
      allFieldsRequired: 'ALL FIELDS ARE REQUIRED',
      passwordsMismatch: 'PASSWORDS DO NOT MATCH',
      accountCreated: 'ACCOUNT CREATED SUCCESSFULLY',
      alreadyHaveAccount: 'ALREADY HAVE AN ACCOUNT?',
      loginHere: 'LOGIN HERE',
    },
    // Terminal Screen
    terminal: {
      logout: 'LOGOUT',
      availableCommands: 'AVAILABLE COMMANDS',
      consoleOutput: 'CONSOLE OUTPUT',
      systemInitialized: '> System initialized...',
      welcome: '> Welcome to Hacker Terminal v1.0.0',
      typeCommand: '> Type a command to begin',
      executing: '> Executing',
      commands: {
        scan: {
          title: 'SCAN NETWORK',
          description: 'Discover devices on local network',
        },
        decrypt: {
          title: 'DECRYPT FILES',
          description: 'Decrypt encrypted data files',
        },
        firewall: {
          title: 'BREACH FIREWALL',
          description: 'Penetrate security firewall',
        },
        database: {
          title: 'ACCESS DATABASE',
          description: 'Query remote database',
        },
        trace: {
          title: 'TRACE IP',
          description: 'Geolocate IP address',
        },
        sysinfo: {
          title: 'SYSTEM INFO',
          description: 'Display system information',
        },
      },
    },
    // Settings
    settings: {
      title: 'SETTINGS',
      language: 'LANGUAGE',
      theme: 'THEME',
      portuguese: 'Português',
      english: 'English',
      spanish: 'Español',
      themeGreen: 'Neon Green',
      themeCyan: 'Cyan',
      themePurple: 'Purple',
      themeRed: 'Red',
      save: 'SAVE',
    },
    // Status
    status: {
      ready: 'READY',
      running: 'RUNNING...',
      complete: 'COMPLETE',
      online: 'ONLINE',
      offline: 'OFFLINE',
      connecting: 'CONNECTING',
    },
  },
  es: {
    // Login Screen
    login: {
      title: 'TERMINAL HACKER',
      subtitle: 'v1.0.0 - ACCESO SEGURO REQUERIDO',
      username: 'usuario',
      password: 'contraseña',
      button: 'ACCESO CONCEDIDO',
      authenticating: 'AUTENTICANDO...',
      credentialsRequired: 'CREDENCIALES REQUERIDAS',
      invalidCredentials: 'ACCESO DENEGADO: CREDENCIALES INVÁLIDAS',
      newToNetwork: '¿NUEVO EN LA RED?',
      createAccount: 'CREAR CUENTA',
      unauthorized: 'EL ACCESO NO AUTORIZADO ESTÁ PROHIBIDO',
      monitored: 'TODAS LAS ACTIVIDADES SON MONITOREADAS',
    },
    // Sign Up Screen
    signup: {
      title: 'CREAR CUENTA',
      subtitle: 'ÚNETE A LA RED',
      username: 'usuario',
      email: 'email@dominio.com',
      password: 'contraseña',
      confirmPassword: 'confirmar contraseña',
      button: 'CREAR CUENTA',
      creating: 'CREANDO...',
      allFieldsRequired: 'TODOS LOS CAMPOS SON REQUERIDOS',
      passwordsMismatch: 'LAS CONTRASEÑAS NO COINCIDEN',
      accountCreated: 'CUENTA CREADA EXITOSAMENTE',
      alreadyHaveAccount: '¿YA TIENES UNA CUENTA?',
      loginHere: 'INICIA SESIÓN AQUÍ',
    },
    // Terminal Screen
    terminal: {
      logout: 'CERRAR SESIÓN',
      availableCommands: 'COMANDOS DISPONIBLES',
      consoleOutput: 'SALIDA DE CONSOLA',
      systemInitialized: '> Sistema inicializado...',
      welcome: '> Bienvenido a Terminal Hacker v1.0.0',
      typeCommand: '> Escribe un comando para comenzar',
      executing: '> Ejecutando',
      commands: {
        scan: {
          title: 'ESCANEAR RED',
          description: 'Descubrir dispositivos en la red local',
        },
        decrypt: {
          title: 'DESENCRIPTAR ARCHIVOS',
          description: 'Desencriptar datos encriptados',
        },
        firewall: {
          title: 'ROMPER FIREWALL',
          description: 'Penetrar firewall de seguridad',
        },
        database: {
          title: 'ACCEDER A BASE DE DATOS',
          description: 'Consultar base de datos remota',
        },
        trace: {
          title: 'RASTREAR IP',
          description: 'Geolocalizar dirección IP',
        },
        sysinfo: {
          title: 'INFORMACIÓN DEL SISTEMA',
          description: 'Mostrar información del sistema',
        },
      },
    },
    // Settings
    settings: {
      title: 'CONFIGURACIÓN',
      language: 'IDIOMA',
      theme: 'TEMA',
      portuguese: 'Português',
      english: 'English',
      spanish: 'Español',
      themeGreen: 'Verde Neón',
      themeCyan: 'Cian',
      themePurple: 'Púrpura',
      themeRed: 'Rojo',
      save: 'GUARDAR',
    },
    // Status
    status: {
      ready: 'LISTO',
      running: 'EJECUTANDO...',
      complete: 'COMPLETADO',
      online: 'EN LÍNEA',
      offline: 'DESCONECTADO',
      connecting: 'CONECTANDO',
    },
  },
};

export function getTranslation(language: Language) {
  return translations[language] || translations.pt;
}
