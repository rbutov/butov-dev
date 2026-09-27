'use client';

import {
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

type CrewState = 'idle' | 'out' | 'back';

const HOVER_LINE = '// 4 agents object';
const DENY_LINES = [
  '// objection sustained',
  '// nice try',
  '// consensus: stay',
  '// ok fine, try ⌘W',
];

// Logo paths from Lobe Icons (MIT), https://github.com/lobehub/lobe-icons
const GEMINI_PATH =
  'M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z';

const AGENTS: { id: string; icon: ReactNode }[] = [
  {
    id: 'gpt',
    icon: (
      <path
        fill="currentColor"
        d="M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z"
      />
    ),
  },
  {
    id: 'claude',
    icon: (
      <path
        fill="#D97757"
        d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z"
      />
    ),
  },
  {
    id: 'grok',
    icon: (
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M9.27 15.29l7.978-5.897c.391-.29.95-.177 1.137.272.98 2.369.542 5.215-1.41 7.169-1.951 1.954-4.667 2.382-7.149 1.406l-2.711 1.257c3.889 2.661 8.611 2.003 11.562-.953 2.341-2.344 3.066-5.539 2.388-8.42l.006.007c-.983-4.232.242-5.924 2.75-9.383.06-.082.12-.164.179-.248l-3.301 3.305v-.01L9.267 15.292M7.623 16.723c-2.792-2.67-2.31-6.801.071-9.184 1.761-1.763 4.647-2.483 7.166-1.425l2.705-1.25a7.808 7.808 0 00-1.829-1A8.975 8.975 0 005.984 5.83c-2.533 2.536-3.33 6.436-1.962 9.764 1.022 2.487-.653 4.246-2.34 6.022-.599.63-1.199 1.259-1.682 1.925l7.62-6.815"
      />
    ),
  },
  {
    id: 'gemini',
    icon: (
      <>
        <defs>
          <linearGradient
            id="gemini-green"
            gradientUnits="userSpaceOnUse"
            x1="7"
            x2="11"
            y1="15.5"
            y2="12"
          >
            <stop stopColor="#08B962" />
            <stop offset="1" stopColor="#08B962" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="gemini-red"
            gradientUnits="userSpaceOnUse"
            x1="8"
            x2="11.5"
            y1="5.5"
            y2="11"
          >
            <stop stopColor="#F94543" />
            <stop offset="1" stopColor="#F94543" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="gemini-yellow"
            gradientUnits="userSpaceOnUse"
            x1="3.5"
            x2="17.5"
            y1="13.5"
            y2="12"
          >
            <stop stopColor="#FABC12" />
            <stop offset=".46" stopColor="#FABC12" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path fill="#3186FF" d={GEMINI_PATH} />
        <path fill="url(#gemini-green)" d={GEMINI_PATH} />
        <path fill="url(#gemini-red)" d={GEMINI_PATH} />
        <path fill="url(#gemini-yellow)" d={GEMINI_PATH} />
      </>
    ),
  },
];

export default function WindowControls() {
  const rootRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<number>();
  const pointerType = useRef('mouse');
  const opening = useRef(false);

  const [state, setState] = useState<CrewState>('idle');
  const [caption, setCaption] = useState(HOVER_LINE);
  const [denials, setDenials] = useState(0);
  const [line, setLine] = useState(HOVER_LINE);
  const [count, setCount] = useState(0);

  const target = state === 'out' ? caption : '';

  // Typewriter: delete the current line, then type the target one.
  useEffect(() => {
    if (count === 0 && line !== target) {
      if (target) setLine(target);
      return;
    }
    const goal = line === target ? line.length : 0;
    if (count === goal) return;
    const typing = count < goal;
    const wait = !typing ? 14 : count === 0 && opening.current ? 650 : 45;
    const id = window.setTimeout(() => {
      opening.current = false;
      setCount((c) => c + (typing ? 1 : -1));
    }, wait);
    return () => window.clearTimeout(id);
  }, [count, line, target]);

  useEffect(() => () => window.clearTimeout(hideTimer.current), []);

  function show() {
    window.clearTimeout(hideTimer.current);
    if (state !== 'out') {
      opening.current = true;
      setCaption(HOVER_LINE);
      setState('out');
    }
  }

  function hide(delay = 120) {
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      setState((s) => (s === 'out' ? 'back' : s));
    }, delay);
  }

  function deny() {
    setCaption(DENY_LINES[denials % DENY_LINES.length]!);
    setDenials((n) => n + 1);

    const root = rootRef.current;
    if (!root || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    root.closest('.editor-window')?.animate(
      [0, -7, 6, -4, 2, 0].map((x) => ({ transform: `translateX(${x}px)` })),
      { duration: 450, easing: 'ease-out' }
    );
    root.querySelectorAll('.ai-hop').forEach((el, i) => {
      const timing = { duration: 560, delay: i * 70 };
      el.animate(
        [
          { transform: 'none' },
          { transform: 'translateY(-9px)', offset: 0.4 },
          { transform: 'none', offset: 0.75 },
          { transform: 'scale(1.2, 0.8)', offset: 0.87 },
          { transform: 'none' },
        ],
        { ...timing, easing: 'ease-in-out' }
      );
      el.querySelector('svg')?.animate(
        [{ transform: 'rotate(0)' }, { transform: 'rotate(360deg)' }],
        { ...timing, easing: 'cubic-bezier(.3, .7, .4, 1)' }
      );
    });
  }

  function onPointerEnter(e: PointerEvent) {
    if (e.pointerType === 'mouse') show();
  }

  function onPointerLeave(e: PointerEvent) {
    if (e.pointerType === 'mouse') hide();
  }

  function onClick() {
    if (state === 'out') deny();
    else show();
    // Touch has no hover-out, so tuck the crew away after a while.
    if (pointerType.current !== 'mouse') hide(5000);
  }

  return (
    <div
      ref={rootRef}
      className="window-controls flex min-w-0 flex-1 items-center"
      data-state={state}
    >
      <div className="flex gap-2">
        <button
          type="button"
          aria-label="Close window"
          className="window-dot window-dot-close h-3 w-3 rounded-full"
          onPointerDown={(e) => (pointerType.current = e.pointerType)}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          onFocus={show}
          onBlur={() => hide(0)}
          onClick={onClick}
        >
          <svg aria-hidden="true" viewBox="0 0 12 12" width="12" height="12">
            <path
              d="M4 4l4 4M8 4l-4 4"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <span
          aria-hidden="true"
          className="window-dot window-dot-minimize h-3 w-3 rounded-full"
        />
        <span
          aria-hidden="true"
          className="window-dot window-dot-zoom h-3 w-3 rounded-full"
        />
      </div>
      <div aria-hidden="true" className="ai-crew">
        {AGENTS.map(({ id, icon }, i) => (
          <span
            key={id}
            className="ai-agent"
            style={{ '--i': i } as CSSProperties}
          >
            <span className="ai-hop">
              <span className={`ai-icon ai-icon-${id}`}>
                <svg viewBox="0 0 24 24" width="14" height="14">
                  {icon}
                </svg>
              </span>
            </span>
          </span>
        ))}
      </div>
      <span aria-hidden="true" className="ai-caption">
        {line.slice(0, count)}
      </span>
      <span className="sr-only" aria-live="polite">
        {target}
      </span>
    </div>
  );
}
