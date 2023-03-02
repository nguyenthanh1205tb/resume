import * as App from '@firebase/app'
import { getAuth } from '@firebase/auth'
import { firebaseAuthConfigs, firebaseConfig } from 'src/configs'

const app = App.initializeApp(firebaseConfig)
const auth = getAuth(app)
export { app, auth }
