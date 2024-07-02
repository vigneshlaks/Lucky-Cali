import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './SpriteAnimator.css';

const SpriteAnimator = ({ sprite, frameWidth, frameHeight, totalFrames, fps }) => {
  const containerRef = useRef(null);
  const frameDuration = 1000 / fps;

  useEffect(() => {
    if (containerRef.current) {
      const keyframes = `
        @keyframes spriteAnimation {
          0% { background-position: 0 0; }
          100% { background-position: -${frameWidth * (totalFrames - 1)}px 0; }
        }
      `;

      const styleSheet = document.styleSheets[0];
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

      containerRef.current.style.animation = `spriteAnimation ${totalFrames * frameDuration}ms steps(${totalFrames}) infinite`;
    }
  }, [frameWidth, frameHeight, totalFrames, frameDuration]);

  return (
    <div
      ref={containerRef}
      className="sprite-container"
      style={{
        width: `${frameWidth}px`,
        height: `${frameHeight}px`,
        backgroundImage: `url(${sprite})`,
        backgroundSize: `${totalFrames * frameWidth}px ${frameHeight}px`,
      }}
    />
  );
};

SpriteAnimator.propTypes = {
  sprite: PropTypes.string.isRequired,
  frameWidth: PropTypes.number.isRequired,
  frameHeight: PropTypes.number.isRequired,
  totalFrames: PropTypes.number.isRequired,
  fps: PropTypes.number.isRequired,
};
