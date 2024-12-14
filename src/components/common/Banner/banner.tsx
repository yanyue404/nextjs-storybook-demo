import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
const Banner = (props) => {
  const {
    itemWidth = '100%',
    itemSpace = '0',
    bannerHeight = '4.22rem',
    data = [],
    videoFullScreen = false,
    iconTop = '0.25rem',
    iconRight = '0rem',
    onHiddenBtn,
  } = props;

  const [bannerData, setBannerData] = useState({
    activeIndex: 0,
    moving: false,
    translate: 0,
    renderData: [],
    currentTime: '',
    startPos: null,
    state: null,
    startTranslate: 0,
    itemPos: [],
  });

  const itemsRef = useRef();
  const videoRefs = useRef([]);
  const [scrollHandler, setScrollHandler] = useState(null);

  useEffect(() => {
    const formattedData = data.map((item) => {
      if (item.videoSrc) {
        item.play = false;
        item.load = false;
      }
      return item;
    });
    setBannerData((prevData) => ({
      ...prevData,
      renderData: formattedData,
    }));
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {};
    if (data.some((item) => item.videoSrc)) {
      window.addEventListener('scroll', handleScroll, { passive: false });
      setScrollHandler(handleScroll);
    } else {
      window.removeEventListener('scroll', scrollHandler);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [data, scrollHandler]);

  const handleTouchStart = (e) => {
    if (bannerData.renderData.length <= 1) return;

    // Get initial position and set state
    bannerData.startPos = getPos(e);
    bannerData.state = 'start';
    bannerData.itemPos = Array.from(itemsRef.current.children).map((item) => ({
      left: item.offsetLeft,
      width: item.offsetWidth,
    }));
    bannerData.startTranslate = bannerData.translate;
  };

  // Define other event handlers below...

  const getPos = (e) => {
    e = (e.touches && e.touches[0]) || e;
    return { x: e.screenX, y: e.screenY, timeStamp: e.timeStamp };
  };

  // Assume click handler to play/pause videos etc.
  const videoPlay = (index) => {
    onHiddenBtn(true);
    setItemPlay(index, true);
  };

  const renderItems = () => {
    return bannerData.renderData.map((item, index) => (
      <div
        key={index}
        className="c-banner-item"
        style={{
          width: itemWidth,
          marginRight: index < bannerData.renderData.length - 1 ? itemSpace : 0,
        }}
      >
        <div
          style={{
            borderRadius: item.radius || '0',
            height: videoFullScreen ? bannerHeight : '',
          }}
        >
          <Image
            src={item.src}
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
            alt=""
            onDragStart={(e) => e.preventDefault()}
          />
          {item.videoSrc && (
            <video
              className={videoFullScreen ? '' : 'video'}
              ref={(el) => (videoRefs.current[index] = el)}
              style={{ display: item.load ? 'block' : 'none' }}
              playsInline
              src={item.videoSrc}
              onPlay={() => videoPlay(index)}
              onPause={() => setItemPlay(index, false)}
              onTimeUpdate={() => updateTime(index)}
            ></video>
          )}
          {!item.play && item.videoSrc && (
            <div
              className="btn flex-c-c"
              onClick={() => setItemPlay(index, !item.play)}
            >
              <svg width="100" height="100" viewBox="0 0 100 100">
                <polygon
                  className="triangle"
                  strokeLinejoin="round"
                  points="30 20,30 80,80 50"
                />
              </svg>
            </div>
          )}
          {!item.play && item.load && (
            <i
              onClick={(e) => {
                e.stopPropagation();
                clossVideo(item, index);
              }}
              style={{
                top: videoFullScreen ? iconTop : '',
                right: videoFullScreen ? iconRight : '',
              }}
              className={
                videoFullScreen ? 'icon-right-top' : 'icon-center-bottom'
              }
            ></i>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div
      className="banner-wrap"
      onMouseDown={handleTouchStart}
      onTouchStart={handleTouchStart}
    >
      <div
        className={`banner-items ${bannerData.moving ? 'moving' : ''}`}
        ref={itemsRef}
        style={{ transform: `translateX(${bannerData.translate}px)` }}
      >
        {renderItems()}
      </div>
    </div>
  );
};

export default Banner;
