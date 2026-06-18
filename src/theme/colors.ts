export const colors = {
  primary: '#F5C542',
  primaryDark: '#C89200',
  primaryLight: '#FFF3C4',
  accent: '#FF7B4D',
  background: '#F7F7F9',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  border: '#E6E6EC',
  textPrimary: '#1F1F1F',
  textSecondary: '#8E93A1',
  textDisabled: '#B9BDC9',
  textInverse: '#FFFFFF',
  success: '#39B86A',
  warning: '#FFD27A',
  error: '#E5534B',
  info: '#8E94FF',
  shadowColor: '#000000',
} as const;

export type Colors = typeof colors;
