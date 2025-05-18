'use client';

import { colors, CssBaseline, GlobalStyles } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { rem } from '../utils';

export const elevation0 = `0px 0px 1px rgba(0, 0, 0, 0.1), 
				0px 5px 2px rgba(0, 0, 0, 0.01), 
				0px 8px 2px rgba(0, 0, 0, 0)`;

export const elevation0Active = `0px 0px 0px 2px rgba(176, 222, 255, 1),
	0px 0px 1px rgba(0, 0, 0, 0.1), 
  0px 1px 1px rgba(0, 0, 0, 0.09), 
  0px 3px 2px rgba(0, 0, 0, 0.05), 
  0px 5px 2px rgba(0, 0, 0, 0.01), 
  0px 8px 2px rgba(0, 0, 0, 0)`;

export const elevation1 = `0px 0px 1px rgba(0, 0, 0, 0.1), 
  0px 1px 1px rgba(0, 0, 0, 0.09), 
  0px 3px 2px rgba(0, 0, 0, 0.05), 
  0px 5px 2px rgba(0, 0, 0, 0.01), 
  0px 8px 2px rgba(0, 0, 0, 0)`;

export const elevation2 = `0px 1px 2px rgba(0, 0, 0, 0.1), 
  0px 3px 3px rgba(0, 0, 0, 0.09), 
  0px 7px 4px rgba(0, 0, 0, 0.05), 
  0px 13px 5px rgba(0, 0, 0, 0.01), 
  0px 20px 6px rgba(0, 0, 0, 0)`;

export const elevation3 = `1px 3px 6px rgba(29, 29, 27, 0.1), 
  3px 10px 11px rgba(29, 29, 27, 0.09), 
  8px 23px 14px rgba(29, 29, 27, 0.05), 
  14px 41px 17px rgba(29, 29, 27, 0.01), 
  21px 63px 19px rgba(29, 29, 27, 0.01)`;

type Props = {
	children: ReactNode;
};

declare module '@mui/material/Button' {
	interface ButtonPropsVariantOverrides {
		primary: true;
		secondary: true;
		tertiary: true;
		quarterary: true;
		error: true;
		nav: true;
		icon: true;
	}
}
declare module '@mui/material/Chip' {
	interface ChipPropsVariantOverrides {
		default: true;
		error: true;
		warning: true;
		success: true;
		info: true;
		primary: true;
	}
}

declare module '@mui/material/styles' {
	interface TypographyVariants {
		h1: React.CSSProperties;
		h1Medium: React.CSSProperties;
		h1SemiBold: React.CSSProperties;
		h1Bold: React.CSSProperties;
		h1ExtraBold: React.CSSProperties;

		h2: React.CSSProperties;
		h2Medium: React.CSSProperties;
		h2SemiBold: React.CSSProperties;
		h2Bold: React.CSSProperties;
		h2ExtraBold: React.CSSProperties;

		h3: React.CSSProperties;
		h3Medium: React.CSSProperties;
		h3SemiBold: React.CSSProperties;
		h3Bold: React.CSSProperties;
		h3ExtraBold: React.CSSProperties;

		h4: React.CSSProperties;
		h4Medium: React.CSSProperties;
		h4SemiBold: React.CSSProperties;
		h4Bold: React.CSSProperties;
		h4ExtraBold: React.CSSProperties;

		h5: React.CSSProperties;
		h5Medium: React.CSSProperties;
		h5SemiBold: React.CSSProperties;
		h5Bold: React.CSSProperties;
		h5ExtraBold: React.CSSProperties;

		h6: React.CSSProperties;
		h6Medium: React.CSSProperties;
		h6SemiBold: React.CSSProperties;
		h6Bold: React.CSSProperties;
		h6ExtraBold: React.CSSProperties;

		body1: React.CSSProperties;
		body1Medium: React.CSSProperties;
		body1SemiBold: React.CSSProperties;
		body1Bold: React.CSSProperties;
		body1ExtraBold: React.CSSProperties;

		body2: React.CSSProperties;
		body2Medium: React.CSSProperties;
		body2SemiBold: React.CSSProperties;
		body2Bold: React.CSSProperties;
		body2ExtraBold: React.CSSProperties;

		caption1: React.CSSProperties;
		caption1Medium: React.CSSProperties;
		caption1SemiBold: React.CSSProperties;
		caption1Bold: React.CSSProperties;
		caption1ExtraBold: React.CSSProperties;

		caption2: React.CSSProperties;
		caption2Medium: React.CSSProperties;
		caption2SemiBold: React.CSSProperties;
		caption2Bold: React.CSSProperties;
		caption2ExtraBold: React.CSSProperties;

		caption3: React.CSSProperties;
		caption3Medium: React.CSSProperties;
		caption3SemiBold: React.CSSProperties;
		caption3Bold: React.CSSProperties;
		caption3ExtraBold: React.CSSProperties;
	}

	interface TypographyVariantsOptions {
		h1?: React.CSSProperties;
		h1Medium?: React.CSSProperties;
		h1SemiBold?: React.CSSProperties;
		h1Bold?: React.CSSProperties;
		h1ExtraBold?: React.CSSProperties;

		h2?: React.CSSProperties;
		h2Medium?: React.CSSProperties;
		h2SemiBold?: React.CSSProperties;
		h2Bold?: React.CSSProperties;
		h2ExtraBold?: React.CSSProperties;

		h3?: React.CSSProperties;
		h3Medium?: React.CSSProperties;
		h3SemiBold?: React.CSSProperties;
		h3Bold?: React.CSSProperties;
		h3ExtraBold?: React.CSSProperties;

		h4?: React.CSSProperties;
		h4Medium?: React.CSSProperties;
		h4SemiBold?: React.CSSProperties;
		h4Bold?: React.CSSProperties;
		h4ExtraBold?: React.CSSProperties;

		h5?: React.CSSProperties;
		h5Medium?: React.CSSProperties;
		h5SemiBold?: React.CSSProperties;
		h5Bold?: React.CSSProperties;
		h5ExtraBold?: React.CSSProperties;

		h6?: React.CSSProperties;
		h6Medium?: React.CSSProperties;
		h6SemiBold?: React.CSSProperties;
		h6Bold?: React.CSSProperties;
		h6ExtraBold?: React.CSSProperties;

		body1?: React.CSSProperties;
		body1Medium?: React.CSSProperties;
		body1SemiBold?: React.CSSProperties;
		body1Bold?: React.CSSProperties;
		body1ExtraBold?: React.CSSProperties;

		body2?: React.CSSProperties;
		body2Medium?: React.CSSProperties;
		body2SemiBold?: React.CSSProperties;
		body2Bold?: React.CSSProperties;
		body2ExtraBold?: React.CSSProperties;

		caption1?: React.CSSProperties;
		caption1Medium?: React.CSSProperties;
		caption1SemiBold?: React.CSSProperties;
		caption1Bold?: React.CSSProperties;
		caption1ExtraBold?: React.CSSProperties;

		caption2?: React.CSSProperties;
		caption2Medium?: React.CSSProperties;
		caption2SemiBold?: React.CSSProperties;
		caption2Bold?: React.CSSProperties;
		caption2ExtraBold?: React.CSSProperties;

		caption3?: React.CSSProperties;
		caption3Medium?: React.CSSProperties;
		caption3SemiBold?: React.CSSProperties;
		caption3Bold?: React.CSSProperties;
		caption3ExtraBold?: React.CSSProperties;
	}
}

declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		h1: true;
		h1Medium: true;
		h1SemiBold: true;
		h1Bold: true;
		h1ExtraBold: true;

		h2: true;
		h2Medium: true;
		h2SemiBold: true;
		h2Bold: true;
		h2ExtraBold: true;

		h3: true;
		h3Medium: true;
		h3SemiBold: true;
		h3Bold: true;
		h3ExtraBold: true;

		h4: true;
		h4Medium: true;
		h4SemiBold: true;
		h4Bold: true;
		h4ExtraBold: true;

		h5: true;
		h5Medium: true;
		h5SemiBold: true;
		h5Bold: true;
		h5ExtraBold: true;

		h6: true;
		h6Medium: true;
		h6SemiBold: true;
		h6Bold: true;
		h6ExtraBold: true;

		body1: true;
		body1Medium: true;
		body1SemiBold: true;
		body1Bold: true;
		body1ExtraBold: true;

		body2: true;
		body2Medium: true;
		body2SemiBold: true;
		body2Bold: true;
		body2ExtraBold: true;

		caption1: true;
		caption1Medium: true;
		caption1SemiBold: true;
		caption1Bold: true;
		caption1ExtraBold: true;

		caption2: true;
		caption2Medium: true;
		caption2SemiBold: true;
		caption2Bold: true;
		caption2ExtraBold: true;

		caption3: true;
		caption3Medium: true;
		caption3SemiBold: true;
		caption3Bold: true;
		caption3ExtraBold: true;
	}
}

const inter = Inter({ subsets: ['latin'] });
// const inter = Open_Sans({ subsets: ['latin'] });

export const globalTheme = createTheme({
	palette: {
		primary: {
			main: '#081D3F',
			light: '#424e8e',
			dark: '#1a214a'
		},
		secondary: {
			main: '#5aafda'
		}
	},
	typography: {
		fontFamily: inter.style.fontFamily,
		h1: {
			fontWeight: 400,
			fontStyle: 'normal',
			fontSize: rem(54),
			letterSpacing: rem(-3),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.1
		},
		h1Medium: {
			fontWeight: 500,
			fontStyle: 'normal',
			fontSize: rem(54),
			letterSpacing: rem(-3),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.1
		},
		h1SemiBold: {
			fontWeight: 600,
			fontStyle: 'normal',
			fontSize: rem(54),
			letterSpacing: rem(-3),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.1
		},
		h1Bold: {
			fontWeight: 700,
			fontStyle: 'normal',
			fontSize: rem(54),
			letterSpacing: rem(-3),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.1
		},
		h1ExtraBold: {
			fontWeight: 800,
			fontStyle: 'normal',
			fontSize: rem(54),
			letterSpacing: '-0.25rem',
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.1
		},
		h2: {
			fontWeight: 400,
			fontStyle: 'normal',
			fontSize: rem(45),
			letterSpacing: rem(-2.8),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.1
		},
		h2Medium: {
			fontWeight: 500,
			fontStyle: 'normal',
			fontSize: rem(45),
			letterSpacing: rem(-2.8),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.1
		},
		h2SemiBold: {
			fontWeight: 600,
			fontStyle: 'normal',
			fontSize: rem(45),
			letterSpacing: rem(-2.8),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.1
		},
		h2Bold: {
			fontWeight: 700,
			fontStyle: 'normal',
			fontSize: rem(45),
			letterSpacing: rem(-2.8),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.1
		},
		h2ExtraBold: {
			fontWeight: 800,
			fontStyle: 'normal',
			fontSize: rem(45),
			letterSpacing: rem(-2.8),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.1
		},
		h3: {
			fontWeight: 400,
			fontStyle: 'normal',
			fontSize: rem(37),
			letterSpacing: rem(-2.4),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.1
		},
		h3Medium: {
			fontWeight: 500,
			fontStyle: 'normal',
			fontSize: rem(37),
			letterSpacing: rem(-2.4),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.1
		},
		h3SemiBold: {
			fontWeight: 600,
			fontStyle: 'normal',
			fontSize: rem(37),
			letterSpacing: rem(-2.4),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.1
		},
		h3Bold: {
			fontWeight: 700,
			fontStyle: 'normal',
			fontSize: rem(37),
			letterSpacing: rem(-2.4),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.1
		},
		h3ExtraBold: {
			fontWeight: 800,
			fontStyle: 'normal',
			fontSize: rem(37),
			letterSpacing: rem(-2.4),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.1
		},
		h4: {
			fontWeight: 400,
			fontStyle: 'normal',
			fontSize: rem(31),
			letterSpacing: rem(-1.6),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1
		},
		h4Medium: {
			fontWeight: 500,
			fontStyle: 'normal',
			fontSize: rem(31),
			letterSpacing: rem(-1.6),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1
		},
		h4SemiBold: {
			fontWeight: 600,
			fontStyle: 'normal',
			fontSize: rem(31),
			letterSpacing: rem(-1.6),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1
		},
		h4Bold: {
			fontWeight: 700,
			fontStyle: 'normal',
			fontSize: rem(31),
			letterSpacing: rem(-1.6),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1
		},
		h4ExtraBold: {
			fontWeight: 800,
			fontStyle: 'normal',
			fontSize: rem(31),
			letterSpacing: rem(-1.6),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1
		},
		h5: {
			fontWeight: 400,
			fontStyle: 'normal',
			fontSize: rem(26),
			letterSpacing: rem(-1.4),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.15
		},
		h5Medium: {
			fontWeight: 500,
			fontStyle: 'normal',
			fontSize: rem(26),
			letterSpacing: rem(-1.4),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.15
		},
		h5SemiBold: {
			fontWeight: 600,
			fontStyle: 'normal',
			fontSize: rem(26),
			letterSpacing: rem(-1.4),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.15
		},
		h5Bold: {
			fontWeight: 700,
			fontStyle: 'normal',
			fontSize: rem(26),
			letterSpacing: rem(-1.4),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.15
		},
		h5ExtraBold: {
			fontWeight: 800,
			fontStyle: 'normal',
			fontSize: rem(26),
			letterSpacing: rem(-1.4),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.15
		},
		h6: {
			fontWeight: 400,
			fontStyle: 'normal',
			fontSize: rem(22),
			letterSpacing: rem(-1),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.15
		},
		h6Medium: {
			fontWeight: 500,
			fontStyle: 'normal',
			fontSize: rem(22),
			letterSpacing: rem(-1),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.15
		},
		h6SemiBold: {
			fontWeight: 600,
			fontStyle: 'normal',
			fontSize: rem(22),
			letterSpacing: rem(-1),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.15
		},
		h6Bold: {
			fontWeight: 700,
			fontStyle: 'normal',
			fontSize: rem(22),
			letterSpacing: rem(-1),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.15
		},
		h6ExtraBold: {
			fontWeight: 800,
			fontStyle: 'normal',
			fontSize: rem(22),
			letterSpacing: rem(-1),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.15
		},
		body1: {
			fontWeight: 400,
			fontStyle: 'normal',
			fontSize: rem(18),
			letterSpacing: rem(-0.8),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.2
		},
		body1Medium: {
			fontWeight: 500,
			fontStyle: 'normal',
			fontSize: rem(18),
			letterSpacing: rem(-0.8),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.2
		},
		body1SemiBold: {
			fontWeight: 600,
			fontStyle: 'normal',
			fontSize: rem(18),
			letterSpacing: rem(-0.8),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.2
		},
		body1Bold: {
			fontWeight: 700,
			fontStyle: 'normal',
			fontSize: rem(18),
			letterSpacing: rem(-0.8),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.2
		},
		body1ExtraBold: {
			fontWeight: 800,
			fontStyle: 'normal',
			fontSize: rem(18),
			letterSpacing: rem(-0.8),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.2
		},
		body2: {
			fontWeight: 400,
			fontStyle: 'normal',
			fontSize: rem(16),
			letterSpacing: rem(-0.8),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.2
		},
		body2Medium: {
			fontWeight: 500,
			fontStyle: 'normal',
			fontSize: rem(16),
			letterSpacing: rem(-0.8),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.2
		},
		body2SemiBold: {
			fontWeight: 600,
			fontStyle: 'normal',
			fontSize: rem(16),
			letterSpacing: rem(-0.8),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.2
		},
		body2Bold: {
			fontWeight: 700,
			fontStyle: 'normal',
			fontSize: rem(16),
			letterSpacing: rem(-0.8),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.2
		},
		body2ExtraBold: {
			fontWeight: 800,
			fontStyle: 'normal',
			fontSize: rem(16),
			letterSpacing: rem(-0.8),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.2
		},
		caption1: {
			fontWeight: 400,
			fontStyle: 'normal',
			fontSize: rem(14),
			letterSpacing: rem(-0.2),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.25
		},
		caption1Medium: {
			fontWeight: 500,
			fontStyle: 'normal',
			fontSize: rem(14),
			letterSpacing: rem(-0.2),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.25
		},
		caption1SemiBold: {
			fontWeight: 600,
			fontStyle: 'normal',
			fontSize: rem(14),
			letterSpacing: rem(-0.2),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.25
		},
		caption1Bold: {
			fontWeight: 700,
			fontStyle: 'normal',
			fontSize: rem(14),
			letterSpacing: rem(-0.2),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.25
		},
		caption1ExtraBold: {
			fontWeight: 800,
			fontStyle: 'normal',
			fontSize: rem(14),
			letterSpacing: rem(-0.2),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.25
		},
		caption2: {
			fontWeight: 400,
			fontStyle: 'normal',
			fontSize: rem(12),
			letterSpacing: rem(-0.2),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.25
		},
		caption2Medium: {
			fontWeight: 500,
			fontStyle: 'normal',
			fontSize: rem(12),
			letterSpacing: rem(-0.2),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.25
		},
		caption2SemiBold: {
			fontWeight: 600,
			fontStyle: 'normal',
			fontSize: rem(12),
			letterSpacing: rem(-0.2),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.25
		},
		caption2Bold: {
			fontWeight: 700,
			fontStyle: 'normal',
			fontSize: rem(12),
			letterSpacing: rem(-0.2),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.25
		},
		caption2ExtraBold: {
			fontWeight: 800,
			fontStyle: 'normal',
			fontSize: rem(12),
			letterSpacing: rem(-0.2),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.25
		},
		caption3: {
			fontWeight: 400,
			fontStyle: 'normal',
			fontSize: rem(8),
			letterSpacing: rem(-0.2),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.25
		},
		caption3Medium: {
			fontWeight: 500,
			fontStyle: 'normal',
			fontSize: rem(8),
			letterSpacing: rem(-0.2),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.25
		},
		caption3SemiBold: {
			fontWeight: 600,
			fontStyle: 'normal',
			fontSize: rem(8),
			letterSpacing: rem(-0.2),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.25
		},
		caption3Bold: {
			fontWeight: 700,
			fontStyle: 'normal',
			fontSize: rem(8),
			letterSpacing: rem(-0.2),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.25
		},
		caption3ExtraBold: {
			fontWeight: 800,
			fontStyle: 'normal',
			fontSize: rem(8),
			letterSpacing: rem(-0.2),
			fontFamily: inter.style.fontFamily,
			lineHeight: 1.25
		}
	},
	components: {
		MuiTypography: {
			styleOverrides: {
				root: {
					'&::first-letter': { textTransform: 'capitalize' },
					wordBreak: 'break-word',
					color: 'black'
				}
			}
		},
		MuiTextField: {
			defaultProps: {
				spellCheck: false
			},
			styleOverrides: {
				root: {}
			}
		},
		MuiTabs: {
			styleOverrides: {
				root: {
					height: '48px',
					'.MuiTab-icon': { width: rem(20), height: rem(20) }
				}
			}
		},
		MuiTab: {
			defaultProps: {
				disableRipple: true
			},
			styleOverrides: {
				root: {
					height: '48px',
					minHeight: '48px',
					textTransform: 'none',
					fontWeight: 500,
					fontSize: '16px',
					letterSpacing: '-1px',
					fontFamily: inter.style.fontFamily,
					lineHeight: 1,
					fontStyle: 'normal',
					color: colors.grey[500],
					'&.Mui-selected': {
						color: colors.grey[900]
					},
					'& .MuiTabs-indicatorSpan': {
						backgroundColor: colors.grey[900]
					}
				}
			}
		},
		MuiRadio: {
			defaultProps: {
				disableRipple: true,
				disableTouchRipple: true
			}
		},
		MuiIconButton: {
			defaultProps: {
				disableRipple: true
			},
			styleOverrides: {
				root: {
					'&:hover': {
						backgroundColor: 'transparent'
					}
				}
			}
		},
		MuiListItemButton: {
			defaultProps: {
				disableRipple: true
			},
			styleOverrides: {
				root: {
					'&:hover': {
						backgroundColor: 'transparent'
					}
				}
			}
		},

		MuiButton: {
			defaultProps: {
				disableRipple: true,
				disableElevation: true
			},
			variants: [
				{
					props: { variant: 'primary' },
					style: {
						backgroundColor: colors.blue[300],
						color: colors.grey[900],
						border: `1px solid ${colors.grey[900]}10`,
						// ...elevation0,
						'&:active': {
							backgroundColor: colors.blue[300]
						}
					}
				},
				{
					props: { variant: 'secondary' },
					style: {
						backgroundColor: '#fff',
						color: colors.grey[900],
						border: `1px solid ${colors.grey[900]}10`,
						// ...elevation0,
						'&:hover': {
							backgroundColor: colors.blue[300]
						},
						'&:active': {
							backgroundColor: colors.blue[300],
							border: `1px solid ${colors.blue[300]}10`
						}
					}
				},
				{
					props: { variant: 'tertiary' },
					style: {
						backgroundColor: colors.blue[300],
						color: colors.grey[900],
						border: `1px solid ${colors.grey[900]}10`,
						'&:hover': {
							backgroundColor: colors.blue[300]
						},
						'&:active': {
							backgroundColor: colors.blue[300],
							border: `1px solid ${colors.blue[300]}10`
						}
					}
				},
				{
					props: { variant: 'quarterary' },
					style: {
						backgroundColor: 'transparent',
						color: colors.grey[900],
						border: `none`,
						'&:hover': {
							backgroundColor: colors.blue[300]
						},
						'&:active': {
							backgroundColor: colors.blue[300]
						},
						'&:disabled': {
							backgroundColor: 'transparent'
						}
					}
				},
				{
					props: { variant: 'error' },
					style: {
						backgroundColor: colors.red[300],
						color: colors.blue[300],
						border: `1px solid ${colors.grey[900]}10`,
						// ...elevation0,

						'&:active': {
							backgroundColor: colors.red[300]
						},
						'&:disabled': {
							backgroundColor: colors.blue[300]
						}
					}
				},
				{
					props: { variant: 'nav' },
					style: {
						backgroundColor: 'transparent',
						color: colors.grey[900],
						'&:hover': {
							backgroundColor: colors.blue[300]
						},
						'&:active': {
							backgroundColor: colors.blue[300],
							border: `1px solid ${colors.grey[900]}10`
						}
					}
				},
				{
					props: { variant: 'icon' },
					style: {
						backgroundColor: 'transparent',
						color: colors.grey[900],
						'&:hover': {
							backgroundColor: 'transparent'
						},
						'&:active': {
							backgroundColor: 'transparent',
							border: `none`
						},
						'&:disabled': {
							backgroundColor: 'transparent',
							border: `none`
						}
					}
				}
			],
			styleOverrides: {
				root: ({}) => ({
					textTransform: 'none',
					transition: 'box-shadow 0.2s ease-in-out',
					'&:disabled': {
						backgroundColor: colors.blue[300],
						color: colors.blue[300],
						border: `1px solid ${colors.blue[300]}`
					}
				})
			}
		}
	}
});

export const MuiContainer = ({ children }: Props) => {
	return (
		<>
			<AppRouterCacheProvider>
				<CssBaseline />
				<GlobalStyles
					styles={{
						body: {
							display: 'flex',
							flexDirection: 'column',
							height: '100vh',
							backgroundColor: colors.blue[300]
						},
						'*': {
							scrollbarWidth: 'thin', // for Firefox
							scrollbarColor: 'lightgrey #f1f1f1' // for Firefox
						},
						'*::-webkit-scrollbar': {
							width: '0.4em'
						},
						'*::-webkit-scrollbar-track': {
							background: '#f1f1f1'
						},
						'*::-webkit-scrollbar-thumb': {
							background: 'lightgrey',
							borderRadius: '10px'
						}
						// '*::-webkit-scrollbar-thumb:hover': {
						// 	background: '#555'
						// }
					}}
				/>
				<ThemeProvider theme={globalTheme}>
					{/* <LocalizationProvider dateAdapter={AdapterMoment}>{children}</LocalizationProvider> */}
					{children}
				</ThemeProvider>
			</AppRouterCacheProvider>
		</>
	);
};
