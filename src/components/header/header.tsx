import HeadImg from '@/assets/images/head1.png';
import Head2Img from '@/assets/images/head2.png';
import Banner from '@/components/common/Banner/banner';
import FormInput from '@/components/common/FormInput/FormInput';
import FormRow from '@/components/common/FormRow/FormRow';
import Image from 'next/image';
import { memo, useRef } from 'react';
import styles from './header.module.scss';

export default memo(function Header() {
  const data = [
    {
      src: HeadImg,
    },
  ];
  const inputRef = useRef(null);
  function handleClick() {
    inputRef.current.focus();
  }

  const handlerChange = () => {};
  return (
    <>
      <Banner
        data={data}
        videoFullScreen="true"
        bannerHeight="3.43rem"
      ></Banner>
      <div className="insure-img">
        <Image
          src={Head2Img}
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
          alt="Picture of the author"
        />
      </div>
      <div className={`${styles['insure-info']}`}>
        <div className={`${styles['info']}`}>
          <div className={`${styles['message']}`}>
            探索精彩内容，填写手机号！
            <div className={`${styles['baground']}`}> </div>
          </div>
          <FormRow title="手机号" round={true} onAction={handleClick}>
            <FormInput
              ref={inputRef}
              placeholder="请输入手机号"
              onChange={(e) => handlerChange}
            />
          </FormRow>
          <div className={`${styles['apply-btn-wrap']}`}>
            <div className={`${styles['apply-btn']}`}>
              <span className={`${styles['left-g']}`}></span>
              立即提交
            </div>
            <span className={`${styles['right-g']}`}></span>
          </div>
        </div>
        <div className={`${styles['des']}`}>
          尊敬的用户，您好，无门槛最多优惠12元！
        </div>
      </div>
    </>
  );
});
