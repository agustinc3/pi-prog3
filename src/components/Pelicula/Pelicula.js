import { Component } from "react"
import { Link } from "react-router-dom"

class Pelicula extends Component{
    constructor(props){
        super(props)
        this.state={descripcion:null}
    }

    mostrarMas(){this.setState({descripcion:this.props.descripcion})}

    render(){
        return(
        <div className="movie-card">
              {/*<Link to={`/detalle/id/${this.props.id}`}>*/}
                <img src={`https://image.tmdb.org/t/p/w500${this.props.imagen}`} alt={this.props.nombre} />
              {/*</Link>*/}
              <h4>{this.props.nombre}</h4>
              <p>{this.state.descripcion}</p>
              {<button onClick={() => this.mostrarMas()}>ver mas</button>}
          </div>
        )
    }
}

export default Pelicula