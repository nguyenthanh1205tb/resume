import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Auth from 'src/components/Auth'
import ToolsLayout from 'src/layouts/Tools'
import PublicLayout from 'src/layouts/Public'
import Tools from 'src/pages/Tools'
import SignIn from 'src/pages/SignIn'
import SingUp from 'src/pages/SignUp'
import Landing from 'src/pages/Landing'
import FileConvert from './pages/Tools/FileConvert'

function Router() {
  return (
    <Switch>
      <Auth>
        <Switch>
          <Route exact strict path="/sign-in" component={SignIn} />
          <Route exact strict path="/sign-up" component={SingUp} />
          <PublicLayout>
            <Switch>
              <Route exact strict path="/" component={Landing} />
              <Route exact strict path="/file-convert" component={FileConvert} />
              <ToolsLayout>
                <Switch>
                  <Route exact strict path="/tools" component={Tools} />
                </Switch>
              </ToolsLayout>
            </Switch>
          </PublicLayout>
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Auth>
    </Switch>
  )
}
export default Router
