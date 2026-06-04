export type Category = 'retail' | 'office' | 'residence' | 'exercise';

export interface Project {
  name: string;
  folder: string;
  cover: string;
  images: string[];
  colSpan: 1 | 2;
  rowSpan: 1 | 2;
  category: Category;
}

export function imgSrc(folder: string, file: string) {
  return `/portpolio/${folder}/${file}`;
}

export const projects: Project[] = [
  {
    name: 'AGL',
    folder: 'AGL',
    cover: 'L7R00008.jpg',
    images: [
      'L7R00008.jpg','L7R00015.jpg','L7R00031.jpg','L7R00035.jpg',
      'L7R00040.jpg','L7R00043.jpg','L7R00046.jpg','L7R00051.jpg',
      'L7R00053.jpg','L7R00057.jpg','L7R00060.jpg','L7R00070.jpg','L7R00077.jpg',
    ],
    colSpan: 2, rowSpan: 1, category: 'retail',
  },
  {
    name: 'CMB 방송국',
    folder: 'CMB 방송국',
    cover: 'L7C07747.jpg',
    images: [
      'L7C07747.jpg','L7R07037.jpg','L7R07039.jpg','L7R07050.jpg',
      'L7R07056.jpg','L7R07063.jpg','L7R07067.jpg','L7R07078.jpg','L7R07084.jpg',
    ],
    colSpan: 1, rowSpan: 1, category: 'office',
  },
  {
    name: '골프존파크',
    folder: '골프존파크',
    cover: 'L7C09828.jpg',
    images: [
      'L7C09828.jpg','L7R02277.jpg','L7R02285.jpg','L7R02290.jpg',
      'L7R02304.jpg','L7R02305.jpg','L7R02306.jpg','L7R02309.jpg',
      'L7R02310.jpg','L7R02313.jpg','L7R02315.jpg','L7R02318.jpg',
      'L7R02324.jpg','L7R02326.jpg','L7R02327.jpg',
    ],
    colSpan: 1, rowSpan: 2, category: 'exercise',
  },
  {
    name: '노량진 스시101',
    folder: '노량진 스시101',
    cover: 'KakaoTalk_20260525_133310111.jpg',
    images: [
      'KakaoTalk_20260525_133310111.jpg',
      'KakaoTalk_20260525_133310111_01.jpg',
      'KakaoTalk_20260525_133310111_02.jpg',
    ],
    colSpan: 1, rowSpan: 1, category: 'retail',
  },
  {
    name: '노량진101',
    folder: '노량진101',
    cover: 'KakaoTalk_20260525_133124398.jpg',
    images: Array.from({ length: 22 }, (_, i) =>
      i === 0
        ? 'KakaoTalk_20260525_133124398.jpg'
        : `KakaoTalk_20260525_133124398_${String(i).padStart(2, '0')}.jpg`
    ),
    colSpan: 1, rowSpan: 1, category: 'retail',
  },
  {
    name: '대방동 카페 프로스퍼',
    folder: '대방동 카페 프로스퍼',
    cover: 'KakaoTalk_20260525_133416258.jpg',
    images: [
      'KakaoTalk_20260525_133416258.jpg',
      'KakaoTalk_20260525_133416258_01.jpg',
      'KakaoTalk_20260525_133416258_02.jpg',
      'KakaoTalk_20260525_133416258_03.jpg',
    ],
    colSpan: 2, rowSpan: 1, category: 'retail',
  },
  {
    name: '대방동 피자·파스타',
    folder: '대방동 피자,파스타',
    cover: 'KakaoTalk_20260525_132917437.jpg',
    images: [
      'KakaoTalk_20260525_132917437.jpg',
      'KakaoTalk_20260525_132917437_01.jpg',
      'KakaoTalk_20260525_132917437_02.jpg',
    ],
    colSpan: 1, rowSpan: 1, category: 'retail',
  },
  {
    name: '리핏피트니스',
    folder: '리핏피트니스',
    cover: 'L7R07328.JPG',
    images: [
      'L7R07328.JPG','L7R07329.JPG','L7R07330.JPG','L7R07332.JPG',
      'L7R07343.JPG','L7R07366.JPG','L7R07367.JPG','L7R07371.JPG',
      'L7R07372.JPG','L7R07390.JPG','L7R07398.JPG',
    ],
    colSpan: 1, rowSpan: 1, category: 'exercise',
  },
  {
    name: '서지넥스 사무실',
    folder: '서지넥스 사무실',
    cover: 'L7C03201.JPG',
    images: [
      'L7C03201.JPG','L7R07886.JPG','L7R07887.JPG','L7R07889.JPG',
      'L7R07895.JPG','L7R07896.JPG','L7R07898.JPG','L7R07899.JPG',
      'L7R07901.JPG','L7R07902.JPG','L7R07905.JPG','L7R07906.JPG',
      'L7R07907.JPG','L7R07908.JPG','L7R07909.JPG','L7R07914.JPG',
      'L7R07919.JPG','L7R07924.JPG','L7R07927.JPG','L7R07928.JPG',
      'L7R07930.JPG','L7R07931.JPG',
    ],
    colSpan: 2, rowSpan: 1, category: 'office',
  },
  {
    name: '아델린 필라테스',
    folder: '아델린 필라테스',
    cover: 'L7R08566.jpg',
    images: [
      'L7R08566.jpg','L7R08568.jpg','L7R08574.jpg','L7R08580.jpg',
      'L7R08593.jpg','L7R08595.jpg','L7R08602.jpg','L7R08606.jpg','L7R08633.jpg',
    ],
    colSpan: 1, rowSpan: 2, category: 'exercise',
  },
  {
    name: '주안 틈 아카데미',
    folder: '주안 틈 아카데미',
    cover: 'KakaoTalk_20260525_132829945.jpg',
    images: Array.from({ length: 16 }, (_, i) =>
      i === 0
        ? 'KakaoTalk_20260525_132829945.jpg'
        : `KakaoTalk_20260525_132829945_${String(i).padStart(2, '0')}.jpg`
    ),
    colSpan: 1, rowSpan: 1, category: 'exercise',
  },
  {
    name: '청라 미미다방',
    folder: '청라 미미다방',
    cover: 'KakaoTalk_20260525_132737258.jpg',
    images: Array.from({ length: 8 }, (_, i) =>
      i === 0
        ? 'KakaoTalk_20260525_132737258.jpg'
        : `KakaoTalk_20260525_132737258_${String(i).padStart(2, '0')}.jpg`
    ),
    colSpan: 1, rowSpan: 1, category: 'retail',
  },
  {
    name: '칸톤 홍보관',
    folder: '칸톤 홍보관',
    cover: 'L7R06032.JPG',
    images: [
      'L7R06032.JPG','L7R06033.JPG','L7R06036.JPG','L7R06037.JPG',
      'L7R06039.JPG','L7R06048.JPG','L7R06052.JPG','L7R06060.JPG',
      'L7R06063.JPG','L7R06064.JPG','L7R06066.JPG','L7R06067.JPG',
      'L7R06074.JPG','L7R06079.JPG','L7R06093.JPG','L7R06098.JPG',
      'L7R06101.JPG','L7R06108.JPG','L7R06111.JPG','L7R06115.JPG',
      'L7R06117.JPG','L7R06121.JPG',
    ],
    colSpan: 2, rowSpan: 1, category: 'retail',
  },
  {
    name: '콜렉션비',
    folder: '콜렉션비',
    cover: 'L7R04327.jpg',
    images: [
      'L7R04327.jpg','L7R04333.jpg','L7R04334.jpg','L7R04336.jpg',
      'L7R04369.jpg','L7R04386.jpg','L7R04408.jpg','L7R04410.jpg','L7R04412.jpg',
    ],
    colSpan: 1, rowSpan: 1, category: 'retail',
  },
  {
    name: '프라이빗룸',
    folder: '프라이빗룸',
    cover: 'KakaoTalk_20240709_122023485.jpg',
    images: [
      'KakaoTalk_20240709_122023485.jpg',
      'KakaoTalk_20240709_122023485_03.jpg',
      'KakaoTalk_20240709_122023485_04.jpg',
      'KakaoTalk_20240709_122023485_09.jpg',
      'KakaoTalk_20240709_122023485_11.jpg',
      'KakaoTalk_20240709_122023485_13.jpg',
      'KakaoTalk_20240709_122023485_17.jpg',
      'KakaoTalk_20240709_122023485_18.jpg',
      'KakaoTalk_20240709_122023485_19.jpg',
      'KakaoTalk_20240709_122023485_21.jpg',
      'KakaoTalk_20240709_122023485_22.jpg',
      'KakaoTalk_20240709_122023485_26.jpg',
    ],
    colSpan: 1, rowSpan: 2, category: 'residence',
  },
  {
    name: '홀리랜드호텔',
    folder: '홀리랜드호텔',
    cover: 'L7C09792.jpg',
    images: [
      'L7C09792.jpg','L7C09796.jpg','L7C09801.jpg','L7R02133.jpg',
      'L7R02136.jpg','L7R02141.jpg','L7R02146.jpg','L7R02150.jpg',
      'L7R02151.jpg','L7R02158.jpg','L7R02167.jpg','L7R02168.jpg',
      'L7R02169.jpg','L7R02177.jpg','L7R02190.jpg','L7R02193.jpg',
      'L7R02209.jpg','L7R02223.jpg','L7R02224.jpg',
    ],
    colSpan: 2, rowSpan: 1, category: 'residence',
  },
  {
    name: '힙 필라테스',
    folder: '힙 필라테스',
    cover: 'L7R08204.JPG',
    images: [
      'L7R08204.JPG','L7R08205.JPG','L7R08211.JPG','L7R08214.JPG',
      'L7R08215.JPG','L7R08217.JPG','L7R08218.JPG','L7R08220.JPG',
      'L7R08229.JPG','L7R08240.JPG','L7R08246.JPG','L7R08250.JPG',
      'L7R08252.JPG','L7R08258.JPG','L7R08262.JPG','L7R08263.JPG','L7R08266.JPG',
    ],
    colSpan: 1, rowSpan: 1, category: 'exercise',
  },
];
