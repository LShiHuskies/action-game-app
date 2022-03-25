import LeftImage from './LeftAssaultRifle.png';
import RightImage from './RightAssaultRifle.png';
import UpImage from './UpMode.png';
import DownImage from './DownMode.png';
import RedTarget from './Red-Target.png';
import AssaultRifleBullet from './AssaultRifleBullet.png';
import AssaultRifleIcon from './AssaultRifleIcon.jpg';
import ShotTarget from './Shot-Target.png';



export default {
    UpImage: { src: UpImage, style: { width: '40px', height: '70px' }, direction: 'UP', PistolBullet: { style: {  transform: 'rotate(270deg)' } }, attackBullet: [] },
    RightImage: { src: RightImage, style: { width: '40px', height: '70px' }, direction: 'RIGHT', PistolBullet: { style: {  } }, attackBullet: [] },
    LeftImage: { src: LeftImage, style: { width: '40px', height: '70px' }, direction: 'LEFT', PistolBullet: { style: {  transform: 'rotate(180deg)' } }, attackBullet: [] },
    DownImage: { src: DownImage, style: { width: '40px', height: '70px' }, direction: 'DOWN', PistolBullet: { style: {  transform: 'rotate(90deg)' } }, attackBullet: [] },
    RedTarget: { src: RedTarget, style: { width: '20px', height: '20px' } },
    PistolBullet: { src: AssaultRifleBullet, style: { width: '20px', height: '20px' } },
    BulletAmmoIcon: { src: AssaultRifleIcon, style: { width: '20px', height: '20px' }, AmmoLeft: 140, AmmoRound: 16 },
    ShotTarget: { src: ShotTarget, style: { style: '20px', height: '20px' } }
}



