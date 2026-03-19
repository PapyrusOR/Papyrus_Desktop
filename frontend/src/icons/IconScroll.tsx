const IconScroll = () => (
  <svg width="1em" height="1em" viewBox="0 0 48 48" fill="currentColor">
    {/* 左侧矩形，右边开口，高度加大 */}
    <path d="M26 9 L6 9 Q4 9 4 11 L4 37 Q4 39 6 39 L26 39" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />

    {/* 圆柱左侧竖线 */}
    <line x1="32" y1="9" x2="32" y2="39" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    {/* 圆柱右侧竖线 */}
    <line x1="44" y1="9" x2="44" y2="39" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    {/* 圆柱顶部弧 */}
    <path d="M32 9 Q38 5 44 9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* 圆柱底部弧 */}
    <path d="M32 39 Q38 43 44 39" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

    {/* 顶部小啾啾套筒 */}
    <path d="M34 9 Q38 6 42 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M34 7 Q38 4.5 42 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default IconScroll;