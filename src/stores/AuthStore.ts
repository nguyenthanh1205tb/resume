import { action, computed, makeAutoObservable, observable, toJS } from 'mobx'
import { OAuthCredential, User, UserInfo } from '@firebase/auth'
import jscookie from 'js-cookie'

class AuthStore {
  @observable private _user: UserInfo | null = null
  @observable private _credentials: OAuthCredential | null = null

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

  @action setCredential = (cre: OAuthCredential) => {
    this._credentials = cre
    jscookie.set('token', JSON.stringify(cre.accessToken))
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
