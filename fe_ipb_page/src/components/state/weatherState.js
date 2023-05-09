import { atom } from 'recoil';
import { recoilPersist} from 'recoil-persist';

const { persistAtom } = recoilPersist();
export const weatherState = atom({
  key: 'weatherState',
  // default: "날씨정보없음",
  default: {
    presentWeather: '',

  },
  effects_UNSTABLE: [persistAtom]
});