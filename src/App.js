import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header"
import Home from "./screens/Home"
import Footer from "./components/Footer/Footer"
import NotFound from "./screens/NotFound"
import Detalle from "./screens/Detalle/index"
import Populares from "./screens/Populares";
import Favoritos from "./screens/Favoritos"
import TopRated from './screens/TopRated'



function App() {

  return(
<>
    <Header/>
    <Switch>
    <Route path={'/'} exact={true} component={Home} />
    <Route path={'/detalle/id/:id'} component={Detalle} />
    <Route path = {'/favoritos'}  component = {Favoritos}/>
    <Route path = {'/populares'}  component = {Populares}/>
    <Route path = {'/top-rated'}  component = {TopRated}/>

    <Route component={NotFound}/> 
    </Switch>
    <Footer/>
    </>
  )

}

export default App;
