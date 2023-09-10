import { Component } from "react"
import { Link } from "react-router-dom"
import './styles.css'

class Pelicula extends Component {
    constructor(props) {
        super(props)
        this.state = { descripcion: null }
    }


    mostrarMas() { this.setState({ descripcion: this.props.descripcion }) }
    mostrarMenos() { this.setState({ descripcion: null }) }

    render() {
        return (
            <div className="movie-card">
                <Link to={`/detalle/id/${this.props.id}`}>
                <img src={`https://image.tmdb.org/t/p/w500${this.props.imagen}`} alt={this.props.nombre} />
                </Link>
                <h4>{this.props.nombre}</h4>
                <p>{this.state.descripcion}</p>
                {this.state.descripcion === this.props.descripcion ? (
                    <button onClick={() => this.mostrarMenos()}>Ver menos</button>
                ) : (
                    <button onClick={() => this.mostrarMas()}>Ver más</button>
                )}


            </div>
        )
    }
}

export default Pelicula