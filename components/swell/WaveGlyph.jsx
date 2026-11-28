/** Small wave squiggle used in the wave counter and scroll cue. Decorative. */
export default function WaveGlyph({ className }) {
  return (
    <svg className={className} viewBox="0 0 22 10" aria-hidden="true" focusable="false">
      <path d="M1 6c3-5 5-5 7 0s5 5 7 0 5-5 6-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
