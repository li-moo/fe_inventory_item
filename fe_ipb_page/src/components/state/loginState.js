import { atom } from 'recoil';
import { recoilPersist} from 'recoil-persist';

const { persistAtom } = recoilPersist();
export const logInState = atom({
  key: 'logInState',
  default: {
    isLogIn: false,
    id: '',
    login_id: '',
    name: '',
    pwd: '',
    store_id: '',
  },
  effects_UNSTABLE: [persistAtom]
});