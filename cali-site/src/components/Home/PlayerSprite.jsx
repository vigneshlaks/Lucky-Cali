import { useSprite } from 'react-sprite-animator';

const PlayerSprite = () => {
    const styles = useSprite({
        sprite: '/src/components/home/sprite.png',
        width: 55,
        height: 70,
        frameCount: 12,
        wrapAfter: 3,
      });
    
      return <div style={styles} />;
}

export default PlayerSprite
