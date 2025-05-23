import type { AppProps } from 'next/app';
import './globals.scss';
// 导入 antd-mobile 样式
import 'antd-mobile/es/global';

import { NextPageWithLayout } from './page';
export const metadata = {
  title: '具体页面标题',
  description: '具体页面描述',
};

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available

  const getLayout = Component.getLayout || ((page) => page);

  return <Component {...pageProps} />;
}

export default MyApp;
