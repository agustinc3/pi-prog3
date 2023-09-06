import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import NotFound from "./screens/NotFound"



function App() {

  return(
<>
    <Header/>
    <Switch>
      {/*aca van las demas rutas*/}
      <Route component={NotFound}/> 
    </Switch>
    <Footer/>
    </>
  )

}

export default App;
