import UpImage from './UpMode.png';
import RightImage from './RightMode.png';
import LeftImage from './LeftMode.jpg';
import DownImage from './DownMode.png';
import RedTarget from './Red-Target.png';
import PistolBullet from './PistolBullet.png';

export default {
    UpImage: { src: UpImage, style: { width: '40px', height: '70px' }, direction: 'UP', attackBullet: [] },
    RightImage: { src: RightImage, style: { width: '40px', height: '70px' }, direction: 'RIGHT', attackBullet: [] },
    LeftImage: { src: LeftImage, style: { width: '40px', height: '70px' }, direction: 'LEFT', attackBullet: [] },
    DownImage: { src: DownImage, style: { width: '40px', height: '70px' }, direction: 'DOWN', attackBullet: [] },
    RedTarget: { src: RedTarget, style: { width: '20px', height: '20px' } },
    PistolBullet: { src: PistolBullet, style: { width: '20px', height: '20px' } },
}
