"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";

const FULL_TEXT = `はじめまして！
ここは、AI開発が専門のエンジニ屋、Ink6xのポートフォリオサイトです！
私が手掛けた制作物、身に着けたスキルを皆さんに知っていただけるよう、丁寧にまとめました。是非お茶でも飲みながらゆっくりとこのサイトを散策していってください

etc. 右下のボタンを押すと、ターミナルライクな画面でAIに僕のことを質問できます！つかってみてネ`;

function nextDelay(char: string): number {
  const r = Math.random();
  if (r < 0.07) return 160 + Math.random() * 290;  // 思考ポーズ
  if (r < 0.22) return 12  + Math.random() * 16;   // バースト（連打）
  if (char === "\n")           return 220 + Math.random() * 130; // 改行後の溜め
  if ("。！？".includes(char)) return 90  + Math.random() * 110; // 句点後の溜め
  if ("、".includes(char))     return 40  + Math.random() * 40;  // 読点後の溜め
  return 42 + Math.random() * 78; // 通常
}

export function TypewriterSection() {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone]           = useState(false);
  const sectionRef  = useRef<HTMLElement>(null);
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idxRef      = useRef(0);
  const startedRef  = useRef(false);

  const startTyping = () => {
    if (startedRef.current) return;
    startedRef.current = true;

    const tick = () => {
      const i = idxRef.current;
      if (i >= FULL_TEXT.length) {
        setDone(true);
        return;
      }
      const char = FULL_TEXT[i];
      setDisplayed(FULL_TEXT.slice(0, i + 1));
      idxRef.current = i + 1;
      timerRef.current = setTimeout(tick, nextDelay(char));
    };

    timerRef.current = setTimeout(tick, 250); // 最初の溜め
  };

  // セクションがビューポートに入ったらタイピング開始
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startTyping();
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // アンマウント時にタイマーをクリーンアップ
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="intro"
      style={{ padding: "5rem 0 4rem" }}
    >
      <Container>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            lineHeight: 2.1,
            color: "var(--color-text-muted)",
            maxWidth: "620px",
            whiteSpace: "pre-wrap",
            letterSpacing: "0.025em",
          }}
        >
          {displayed}
          {!done && (
            <span
              className="terminal-cursor"
              style={{ minWidth: "0.4em", height: "1em", verticalAlign: "text-bottom" }}
            />
          )}
        </p>
      </Container>
    </section>
  );
}
