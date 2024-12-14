import { useRef, useEffect } from "react";

export default function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
    // 跳过不必要地重新运行 Effect
    // 指定 [isPlaying] 作为依赖数组会告诉 React：如果 isPlaying 与上次渲染时相同，就跳过重新运行 Effect。这样一来，输入框的输入不会触发 Effect 重新运行，只有按下播放/暂停按钮会触发。
  }, [isPlaying]);

  return <video style={{ width: "100%" }} ref={ref} src={src} loop playsInline />;
}
