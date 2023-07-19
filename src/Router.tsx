import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import PublicAuth from 'src/components/Auth/PublicAuth'

function Router() {
  return (
    <Switch>
      <Route exact path="/sign-in" render={props => <PublicAuth {...props}></PublicAuth>} />
      <Route
        path="/"
        render={() => (
          <div></div>
          // <PublicLayout>
          //   <Switch>
          //     {/* <Route exact path="/" component={Landing} />
          //     <Route exact path="/file-convert" component={FileConvert} />
          //     <Route exact path="/ocr" component={Ocr} /> */}
          //     <Route exact path="/pdf-tools" render={props => <ToolsLayout></ToolsLayout>} />
          //     <Route
          //       exact
          //       path="/profile"
          //       render={props => (
          //         <PrivateAuth {...props}>
          //           <Profile />
          //         </PrivateAuth>
          //       )}
          //     />
          //     <Route exact path="/privacy" component={Privacy} />
          //     <Route path="*" render={() => <Redirect to="/" />} />
          //   </Switch>
          // </PublicLayout>
        )}
      />
      <Route path="*" render={() => <Redirect to="/" />} />
    </Switch>
  )
}
export default Router
