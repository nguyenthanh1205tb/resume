import { action, computed, makeAutoObservable, observable, toJS } from 'mobx'
import { IdTokenResult, OAuthCredential, User, UserInfo } from '@firebase/auth'
import jscookie from 'js-cookie'

class AuthStore {
  @observable private _user: UserInfo | null = null
  @observable private _credentials: OAuthCredential | string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  @computed get user() {
    return toJS(this._user)
  }

  @computed get credentials() {
    return toJS(this._credentials)
  }

  @action setUser = (user: UserInfo) => {
    this._user = user
    localStorage.setItem('user', JSON.stringify(user))
  }

  @action setCredential = (cre: OAuthCredential | string) => {
    if (!cre) return
    this._credentials = cre
    if (typeof cre === 'string') {
      jscookie.set('token', JSON.stringify(cre))
    } else {
      jscookie.set('token', JSON.stringify(cre.idToken))
    }
  }

  @action logOut = () => {
    localStorage.removeItem('user')
    jscookie.remove('token')
    this._user = null
  }

  @action isLogin = () => {
    const token = jscookie.get('token')
    if (token) {
      return true
    }
    return false
  }
}

export default new AuthStore()
