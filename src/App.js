import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header"
import Home from "./screens/Home"
import Footer from "./components/Footer/Footer"
import NotFound from "./screens/NotFound"
import Detalle from "./screens/Detalle/index"



function App() {

  return(
<>
    <Header/>
    <Switch>
    <Route path={'/'} exact={true} component={Home} />
    <Route path={'/detalle/id/:id'} component={Detalle} />
    <Route path = {'/peliculas'}  component = {VerTodas}/>
      <Route component={NotFound}/> 
    </Switch>
    <Footer/>
    </>
  )

}

export default App;
