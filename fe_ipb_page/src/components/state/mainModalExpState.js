import { atom } from 'recoil';
import { recoilPersist} from 'recoil-persist';

const { persistAtom } = recoilPersist();
export const mainModalExpState = atom({
  key: 'mainModalExpState',
  default: {
    isModalRead: false,

  },
  effects_UNSTABLE: [persistAtom]
});