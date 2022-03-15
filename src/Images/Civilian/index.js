import NativeAmericanNurse from './NativeAmericanNurse.png';
import CarlJohnson from './CarlJohnson.png';
import IndianNurse from './IndianNurse.jpg';
import JusticeRobin from './JusticeRobin.jpg';
import SouthAsianFemale from './SouthAsianFemale.jpg';
import SouthAsianMale from './SouthAsianMale.png';
import WonderWoman from './WonderWoman.png';


const topIndexes = Array.from({ length: 70 }, (x, i) => i + 20).reverse();
const secondTopIndexes = Array.from({ length: 75 }, (x, i) => i + 5);
const leftIndexes = Array.from({ length: 70 }, (x, i) => i + 20).reverse();
const secondLeftIndexes = Array.from({ length: 75 }, (x, i) => i + 4).reverse();




export default {
    NativeAmericanNurse: { src: NativeAmericanNurse, style: { width: '40px', height: '70px', position: 'absolute', top: topIndexes, left: leftIndexes }, alive: true },
    CarlJohnson: { src: CarlJohnson, style: { width: '40px', height: '70px', position: 'absolute', top: secondTopIndexes, left: secondLeftIndexes }, alive: true },
};