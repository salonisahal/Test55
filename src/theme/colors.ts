export const colors = {
  primary: '#2EB872',
  primaryDark: '#1F8A57',
  primaryLight: '#D7F5E6',
  accent: '#F56BAF',
  background: '#F6FFFA',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  border: '#E0F0E7',
  textPrimary: '#1F1F1F',
  textSecondary: '#6F7B74',
  textDisabled: '#B9BDC9',
  textInverse: '#FFFFFF',
  success: '#2FA36A',
  warning: '#FFD1E6',
  error: '#E5534B',
  info: '#FF99CF',
  shadowColor: '#000000',
} as const;

export type Colors = typeof colors;
