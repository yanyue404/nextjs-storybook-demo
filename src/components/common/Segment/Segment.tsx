import { useMount, useThrottleFn } from 'ahooks';
import { Tabs } from 'antd-mobile';
import { useEffect, useState } from 'react';
import styles from './Segment.module.scss';

let navHeight: number | undefined,
  navOffsetTop = 0;

// 使用固定的文本内容而不是随机生成的内容
const tabItems = [
  {
    key: '1',
    title: '第一项',
    text: '这是第一项的固定内容。这是一段示例文字，用于展示选项卡内容。这段文字示例文字，用于展示选项卡内容。这段文字会示例文字，用于展示选项卡内容。这段文字会示例文字，用于展示选项卡内容。这段文字会示例文字，用于展示选项卡内容。这段文字会示例文字，用于展示选项卡内容。这段文字会示例文字，用于展示选项卡内容。这段文字会示例文字，用于展示选项卡内容。这段文字会示例文字，用于展示选项卡内容。这段文字会会在服务器端和客户端保持一致，避免水合错误。',
  },
  {
    key: '2',
    title: '第二项',
    text: '这是第二项的固定内容。这是另一段示例文字，用于展示选项卡内容。确保内容在服务器和客户端之间保持一致非常重要。',
  },
  {
    key: '3',
    title: '第三项',
    text: '这是第三项的固定内容。这段文字不会因为客户端与服务器端渲染而改变。使用固定内容可以避免水合不匹配的警告。',
  },
  {
    key: '4',
    title: '第四项',
    text: '这是第四项的固定内容。确保所有渲染内容在服务器和客户端之间保持一致，以避免React的水合警告。',
  },
];

const tabHeight = 50;

export default function Segment() {
  const [activeKey, setActiveKey] = useState('1');

  // 滚动回显
  const { run: handleScroll } = useThrottleFn(
    () => {
      let currentKey = tabItems[0].key;
      for (const item of tabItems) {
        const element = document.getElementById(`anchor-${item.key}`);
        if (!element) continue;
        const rect = element.getBoundingClientRect();

        if (rect.top <= tabHeight) {
          currentKey = item.key;
        } else {
          break;
        }
      }
      setActiveKey(currentKey);
    },
    {
      leading: true,
      trailing: true,
      wait: 100,
    }
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getOffetList = () => {
    const elements = document.querySelectorAll('[class^="slot-"]');
    return Array.from(elements).map((ele) => {
      return (ele as HTMLElement).offsetTop;
    });
  };

  useMount(() => {
    console.log('mounted');
    const tabListDom = document.querySelector('.adm-tabs-tab-list') as HTMLElement;
    navHeight = tabListDom.offsetHeight;
    navOffsetTop = tabListDom.offsetTop;
  });

  const clickTab = (index: string) => {
    console.log('click index', index);
    const offTopList = getOffetList();
    const numIndex = Number(index) - 1;
    const t = Math.min(
      navOffsetTop + offTopList[numIndex] - (navHeight || 0) + 1,
      (document.documentElement.scrollHeight || document.body.scrollHeight) - innerHeight
    );
    document.documentElement.scrollTop = t;
    document.body.scrollTop = t;
  };

  return (
    <>
      <div className={`${styles['tabsContainer']}`}>
        <Tabs activeKey={activeKey} onChange={(key) => clickTab(key)}>
          {tabItems.map((item) => (
            <Tabs.Tab title={item.title} key={item.key} />
          ))}
        </Tabs>
      </div>
      <div className="content">
        {tabItems.map((item) => (
          <div key={item.key} className={`${styles[`slot-${item.key}`]}`}>
            <h2 id={`anchor-${item.key}`}>{item.title}</h2>
            {item.text}
          </div>
        ))}
      </div>
    </>
  );
}
