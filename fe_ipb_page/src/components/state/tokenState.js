import { atom } from 'recoil';
import { recoilPersist} from 'recoil-persist';

const { persistAtom } = recoilPersist();
export const tokenState = atom({
  key: 'tokenState',
  default: {
    token: ''
  },
  effects_UNSTABLE: [persistAtom]
});