export type ThemeName = 'green' | 'cyan' | 'purple' | 'red';

export interface Theme {
  name: ThemeName;
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  foreground: string;
  muted: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  tint: string;
}

export const themes: Record<ThemeName, Theme> = {
  green: {
    name: 'green',
    primary: '#00ff41',
    secondary: '#00d9ff',
    background: '#000000',
    surface: '#0a0e14',
    foreground: '#00ff41',
    muted: '#4a9d5f',
    border: '#00ff4133',
    success: '#00ff41',
    warning: '#ffaa00',
    error: '#ff0055',
    tint: '#00ff41',
  },
  cyan: {
    name: 'cyan',
    primary: '#00d9ff',
    secondary: '#00ff41',
    background: '#000000',
    surface: '#0a1a1f',
    foreground: '#00d9ff',
    muted: '#4a9daa',
    border: '#00d9ff33',
    success: '#00ff41',
    warning: '#ffaa00',
    error: '#ff0055',
    tint: '#00d9ff',
  },
  purple: {
    name: 'purple',
    primary: '#d946ef',
    secondary: '#a855f7',
    background: '#000000',
    surface: '#1a0a2e',
    foreground: '#d946ef',
    muted: '#9d4aaa',
    border: '#d946ef33',
    success: '#00ff41',
    warning: '#ffaa00',
    error: '#ff0055',
    tint: '#d946ef',
  },
  red: {
    name: 'red',
    primary: '#ff0055',
    secondary: '#ff6b9d',
    background: '#000000',
    surface: '#2a0a0a',
    foreground: '#ff0055',
    muted: '#aa4a6b',
    border: '#ff005533',
    success: '#00ff41',
    warning: '#ffaa00',
    error: '#ff0055',
    tint: '#ff0055',
  },
};

export function getTheme(themeName: ThemeName): Theme {
  return themes[themeName] || themes.green;
}
