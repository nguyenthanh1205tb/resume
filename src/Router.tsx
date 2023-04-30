import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import PrivateAuth from 'src/components/Auth/PrivateAuth'
import PublicAuth from 'src/components/Auth/PublicAuth'
import PublicLayout from 'src/layouts/Public'
import ToolsLayout from 'src/layouts/Tools'
import Landing from 'src/pages/Landing'
import Privacy from 'src/pages/Privacy'
import Profile from 'src/pages/Profile'
import SignIn from 'src/pages/SignIn'
import FileConvert from 'src/pages/Tools/FileConvert'

import Ocr from './pages/Tools/Ocr'
import PdfTool from './pages/Tools/Pdf'

function Router() {
  return (
    <Switch>
      <Route
        exact
        path="/sign-in"
        render={props => (
          <PublicAuth {...props}>
            <SignIn />
          </PublicAuth>
        )}
      />
      <Route
        path="/"
        render={() => (
          <PublicLayout>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/file-convert" component={FileConvert} />
              <Route exact path="/ocr" component={Ocr} />
              <Route
                exact
                path="/pdf-tools"
                render={props => (
                  <ToolsLayout>
                    <PdfTool {...props} />
                  </ToolsLayout>
                )}
              />
              <Route
                exact
                path="/profile"
                render={props => (
                  <PrivateAuth {...props}>
                    <Profile />
                  </PrivateAuth>
                )}
              />
              <Route exact path="/privacy" component={Privacy} />
              <Route path="*" render={() => <Redirect to="/" />} />
            </Switch>
          </PublicLayout>
        )}
      />
      <Route path="*" render={() => <Redirect to="/" />} />
    </Switch>
  )
}
export default Router
