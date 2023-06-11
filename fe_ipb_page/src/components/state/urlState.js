import { atom } from 'recoil';
import { recoilPersist} from 'recoil-persist';

const { persistAtom } = recoilPersist();
export const urlState = atom({
  key: 'urlState',
  default: {
    local: 'http://localhost:8080',
    aws: 'http://43.202.9.215:8080',
  },
  effects_UNSTABLE: [persistAtom]
});