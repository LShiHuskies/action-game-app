import UpImage from './UpMode.png';
import RightImage from './RightMode.png';
import LeftImage from './LeftMode.jpg';
import DownImage from './DownMode.png';
import RedTarget from './Red-Target.png';
import PistolBullet from './PistolBullet.png';
import BulletAmmoIcon from './BulletAmmoIcon.png';
import ShotTarget from './Shot-Target.png';

export default {
    UpImage: { src: UpImage, style: { width: '40px', height: '70px' }, direction: 'UP', PistolBullet: { style: {  transform: 'rotate(270deg)' } }, attackBullet: [] },
    RightImage: { src: RightImage, style: { width: '40px', height: '70px' }, direction: 'RIGHT', PistolBullet: { style: {  } }, attackBullet: [] },
    LeftImage: { src: LeftImage, style: { width: '40px', height: '70px' }, direction: 'LEFT', PistolBullet: { style: {  transform: 'rotate(180deg)' } }, attackBullet: [] },
    DownImage: { src: DownImage, style: { width: '40px', height: '70px' }, direction: 'DOWN', PistolBullet: { style: {  transform: 'rotate(90deg)' } }, attackBullet: [] },
    RedTarget: { src: RedTarget, style: { width: '20px', height: '20px' } },
    PistolBullet: { src: PistolBullet, style: { width: '20px', height: '20px' } },
    BulletAmmoIcon: { src: BulletAmmoIcon, style: { width: '20px', height: '20px' }, AmmoLeft: 140, AmmoRound: 8 },
    ShotTarget: { src: ShotTarget, style: { style: '20px', height: '20px' } },
    UP: { src: UpImage, style: { width: '40px', height: '70px' }, direction: 'UP', PistolBullet: { style: {  transform: 'rotate(270deg)' } }, attackBullet: [] },
    RIGHT: { src: RightImage, style: { width: '40px', height: '70px' }, direction: 'RIGHT', PistolBullet: { style: {  } }, attackBullet: [] },
    LEFT: { src: LeftImage, style: { width: '40px', height: '70px' }, direction: 'LEFT', PistolBullet: { style: {  transform: 'rotate(180deg)' } }, attackBullet: [] },
    DOWN: { src: DownImage, style: { width: '40px', height: '70px' }, direction: 'DOWN', PistolBullet: { style: {  transform: 'rotate(90deg)' } }, attackBullet: [] },
}
