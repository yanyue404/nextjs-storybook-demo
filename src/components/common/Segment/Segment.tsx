import { faker } from '@faker-js/faker';
import { useMount, useThrottleFn } from 'ahooks';
import { Tabs } from 'antd-mobile';
import { useEffect, useState } from 'react';
import styles from './Segment.module.scss';
const loremLength = 16;

let navHeight,
  navOffsetTop = 0;

const tabItems = [
  { key: 1, title: '第一项', text: faker.lorem.lines(loremLength) },
  { key: 2, title: '第二项', text: faker.lorem.lines(loremLength) },
  { key: 3, title: '第三项', text: faker.lorem.lines(loremLength) },
  { key: 4, title: '第四项', text: faker.lorem.lines(loremLength) },
];

const tabHeight = 50;

export default function Segment() {
  const [activeKey, setActiveKey] = useState(1);

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
    return Array.from(elements).map((ele: HTMLElement) => {
      return ele.offsetTop;
    });
  };

  useMount(() => {
    console.log('mounted');
    const tabListDom = document.querySelector(
      '.adm-tabs-tab-list'
    ) as HTMLElement;
    navHeight = tabListDom.offsetHeight;
    navOffsetTop = tabListDom.offsetTop;
  });

  const clickTab = (index = 1) => {
    console.log('click index', index);
    const offTopList = getOffetList();
    const t = Math.min(
      navOffsetTop + offTopList[index - 1] - navHeight + 1,
      (document.documentElement.scrollHeight || document.body.scrollHeight) -
        innerHeight
    );
    document.documentElement.scrollTop = t;
    document.body.scrollTop = t;
  };

  return (
    <>
      <div className={`${styles['tabsContainer']}`}>
        <Tabs activeKey={activeKey} onChange={(key) => clickTab(Number(key))}>
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
