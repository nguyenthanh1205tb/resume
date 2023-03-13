import { action, computed, makeAutoObservable, observable, toJS } from 'mobx'

class CommonStore {
  @observable private _loadingPage = false

  constructor() {
    makeAutoObservable(this)
  }

  @computed get loadingPage() {
    return toJS(this._loadingPage)
  }

  @action setLoadingPage = (l: boolean) => {
    this._loadingPage = l
  }
}

export default new CommonStore()
