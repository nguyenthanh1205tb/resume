import { action, computed, makeAutoObservable, observable, toJS } from 'mobx'
import jscookie from 'js-cookie'
import { Profile } from 'src/configs/Types'

class AuthStore {
  @observable private _profile: Profile | null = null
  @observable private _credentials: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  @computed get profile() {
    return toJS(this._profile)
  }

  @computed get credentials() {
    return toJS(this._credentials)
  }

  @action setProfile = (p: Profile) => {
    this._profile = p
    localStorage.setItem('p', JSON.stringify(p))
  }

  @action setCredential = (cre: string) => {
    if (!cre) return
    this._credentials = cre
    jscookie.set('token', JSON.stringify(cre))
  }

  @action removeCredentials = () => {
    localStorage.removeItem('p')
    jscookie.remove('token')
    this._profile = null
  }

  @action isLogin = () => {
    const token = jscookie.get('token')
    if (token && this._profile) {
      return true
    }
    return false
  }
}

export default new AuthStore()
