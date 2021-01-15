import { Route, Redirect } from "react-router-dom";
import Actions from "./actions/Actions";
import Analytics from "./analytics/Analytics";
import Clients from "./clients/Clients";


export default function Container() {

  return (
    <div id="container">
      <Route exact path="/">
        <Redirect to="/clients" />
      </Route> 
      <Route exact path="/clients" render={() => <Clients />}/>
      <Route exact path="/actions" render={() => <Actions />}/>
      <Route exact path="/analytics" render={() => <Analytics />}/>
    </div>
  )
}