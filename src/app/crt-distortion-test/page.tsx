"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./page.module.css";

const DISTORTION_SCALE = 20;

export default function CrtDistortionTest() {
  const [enabled, setEnabled] = useState(true);
  const [clicks, setClicks] = useState(0);
  const [value, setValue] = useState("");
  const [sampling, setSampling] = useState(1);
  const wrapperRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const updateHeight = () => {
      if (wrapper.parentElement) {
        wrapper.parentElement.style.height = `${wrapper.offsetHeight / sampling}px`;
      }
    };
    const observer = new ResizeObserver(updateHeight);
    observer.observe(wrapper);
    updateHeight();
    return () => observer.disconnect();
  }, [sampling]);

  return (
    <main className={styles.page}>
      <h1>DOM CRT distortion test</h1>
      <label className={styles.toggle}>
        <input
          type="checkbox"
          checked={enabled}
          onChange={(event) => setEnabled(event.target.checked)}
        />
        启用扭曲（scale {DISTORTION_SCALE}），关闭可比较原始 DOM
      </label>
      <label className={styles.samplingControl}>
        渲染倍率
        <select value={sampling} onChange={(event) => setSampling(Number(event.target.value))}>
          <option value={1}>1× 原始</option>
          <option value={2}>2× 放大后缩小</option>
          <option value={3}>3× 放大后缩小</option>
        </select>
      </label>
      <p>显示强度固定 {DISTORTION_SCALE}，滤镜内部 scale = {DISTORTION_SCALE * sampling}。</p>
      <p>
        点击计数：{clicks} · 输入内容：{value || "（空）"}
      </p>

      <svg
        width="0"
        height="0"
        className={styles.filterDefinition}
        aria-hidden="true"
      >
        <defs>
          <filter
            id="crt-dom-distortion"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feImage
              href="/crt-distortion-test/displacement.png"
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
              result="radial-map"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="radial-map"
              scale={DISTORTION_SCALE * sampling}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div
        className={styles.samplingFrame}
        style={{ "--sampling": sampling } as CSSProperties}
      >
        <section
          ref={wrapperRef}
          className={styles.wrapper}
          style={{ filter: enabled ? "url(#crt-dom-distortion)" : "none" }}
          aria-label="扭曲测试聊天区域"
        >
          <div className={styles.viewport} tabIndex={0} aria-label="可滚动消息">
            <div className={styles.messages}>
              <p className={styles.bubble}>
                这是一条真实 DOM 消息，观察气泡边缘和文字。
              </p>
              <p className={`${styles.bubble} ${styles.user}`}>
                This text stays selectable. 0123456789 — 中文光标测试。
              </p>
              <p className={styles.bubble}>
                弱扭曲应当只轻微弯曲边缘。请拖选文字，再滚动到下方。
              </p>
              <p className={styles.text}>
                普通段落：比较开启和关闭后的字形、行间距与边缘直线。
                这段内容位于滚动区域底部，保持原生 DOM 滚动和选择行为。
              </p>
            </div>
          </div>
          <label className={styles.inputLabel}>
            输入测试
            <input
              type="text"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="输入中文，移动光标或拖选文字"
            />
          </label>
          <button type="button" onClick={() => setClicks((count) => count + 1)}>
            点击测试
          </button>
        </section>
      </div>
    </main>
  );
}
