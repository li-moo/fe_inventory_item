import { atom } from 'recoil';
import { recoilPersist} from 'recoil-persist';

const { persistAtom } = recoilPersist();
export const alarmState = atom({
  key: 'alarmState',
  // default: "날씨정보없음",
  default: {
    unread: 0,

  },
  effects_UNSTABLE: [persistAtom]
});