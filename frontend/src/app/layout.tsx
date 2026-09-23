import { type Metadata } from 'next';

import { Instrument_Sans } from 'next/font/google';

import {
  DEFAULT_THEME,
  THEME,
  THEME_QUERY_PARAM,
  THEME_STORAGE_KEY,
} from '@/src/constants';
import { ThemeProvider } from '@/src/providers/ThemeProvider';

import '../styles/globals.scss';

const instrumentSans = Instrument_Sans({
  variable: '--font-instrument-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vehicle Platform',
  description: 'Users and vehicles management UI',
};

const themeInitializationScript = `try{var q=new URLSearchParams(location.search).get(${JSON.stringify(THEME_QUERY_PARAM)});var t=q===${JSON.stringify(THEME.light)}||q===${JSON.stringify(THEME.dark)}?q:localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(t!==${JSON.stringify(THEME.light)}&&t!==${JSON.stringify(THEME.dark)})t=${JSON.stringify(DEFAULT_THEME)};document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme=${JSON.stringify(DEFAULT_THEME)}}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      className={instrumentSans.variable}
      suppressHydrationWarning
    >
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{ __html: themeInitializationScript }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
