import * as App from '@firebase/app'
import { getAuth } from '@firebase/auth'

import { firebaseAuthConfigs } from 'src/configs'

const app = App.initializeApp(firebaseAuthConfigs)
const auth = getAuth(app)
export { app, auth }
