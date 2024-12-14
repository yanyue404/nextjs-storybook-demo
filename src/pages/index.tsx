import Segment from '@/components/common/Segment/Segment.tsx';
import Header from '@/components/header/header.tsx';
export const metadata = {
  title: '具体页面标题',
  description: '具体页面描述',
};

const props = {
  data: {
    headImageUrl: 'aaa',
  },
};

const Home = () => {
  return (
    <>
      <Header {...props} />
      <Segment></Segment>
    </>
  );
};
export default Home;
