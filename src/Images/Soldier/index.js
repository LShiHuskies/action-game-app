import CrawlingLeftSoldier from './CrawlingLeftSoldier.png';
import RightSoldier from './RightSoldier.png';


const CRAWLING_LEFT_SOLDIER_COORDINATES = [ { top: 6, left: 85 }, { top: 8, left: 88 }, { top: 10, left: 90 }, { top: 12, left: 92 },
                                            { top: 14, left: 95 }, { top: 18, left: 96 }, { top: 20, left: 96 }, { top: 22, left: 96 },
                                            { top: 25, left: 96 }, { top: 30, left: 96 }, { top: 33, left: 96 }, { top: 37, left: 96 },
                                            { top: 40, left: 94 }, { top: 43, left: 91 }, { top: 48, left: 88 }, { top: 51, left: 84 },
                                            { top: 55, left: 78 }, { top: 59, left: 83 }, { top: 63, left: 87 }, { top: 69, left: 87 },
                                            { top: 74, left: 87 }, { top: 77, left: 87 }, { top: 80, left: 90 }, { top: 86, left: 91 },
                                            { top: 90, left: 91 }, { top: 92, left: 91 }, { top: 94, left: 91 }, { top: 94, left: 90 } ];


const RIGHT_SOLDIER_COORDINATES = [ { top: 15, left: 10 }, { top: 16, left: 9 }, { top: 17, left: 8 }, { top: 17, left: 5 },
    { top: 17, left: 2 }, { top: 16, left: 1 }, { top: 18, left: 4 }, { top: 19, left: 7 },
    { top: 20, left: 8 }, { top: 21, left: 4 }, { top: 22, left: 3 }, { top: 23, left: 2 },
    { top: 24, left: 4 }, { top: 25, left: 4 }, { top: 26, left: 3 }, { top: 27, left: 3 },
    { top: 29, left: 3 }, { top: 30, left: 4 }, { top: 34, left: 6 }, { top: 35, left: 4 },
    { top: 37, left: 4 }, { top: 38, left: 5 }, { top: 39, left: 6 }, { top: 40, left: 5 },
    { top: 41, left: 4 }, { top: 43, left: 4 }, { top: 44, left: 3 }, { top: 45, left: 2 } ];



export default {
    CrawlingLeftSoldier: { name: "CrawlingLeftSoldier", src: CrawlingLeftSoldier, style: { height: '40px', width: '70px', position: 'absolute',
    top: 6, left: 85 }, coordinates: CRAWLING_LEFT_SOLDIER_COORDINATES },
    RightSoldier: { name: "RightSoldier", src: RightSoldier, style: { height: '40px', width: '70px', position: 'absolute' },
    coordinates: RIGHT_SOLDIER_COORDINATES }
}