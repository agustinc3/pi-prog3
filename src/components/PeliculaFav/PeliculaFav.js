import { Component } from "react"
import { Link } from "react-router-dom"
import './styles.css'

class PeliculaFav extends Component{
    constructor(props){
        super(props)
        this.state = {
            esFavorito: false
        }
    }

    componentDidMount(){
        let storageFav =  localStorage.getItem('favoritos')
          let arrParseado = JSON.parse(storageFav)
  
          if(arrParseado !== null){
            let estaMiPelicula = arrParseado.includes(this.props.id)
  
            if(estaMiPelicula){
              this.setState({
                esFavorito: true
              })
            }
          }
    }

    agregarAFavoritos(idPelicula){
        let storageFav = localStorage.getItem('favoritos')
        if(storageFav === null){
          let arrIds = [idPelicula]
          let arrStringificado = JSON.stringify(arrIds)
          localStorage.setItem('favoritos', arrStringificado)
        } else {
          let arrParseado = JSON.parse(storageFav)
          arrParseado.push(idPelicula)
          let arrStringificado = JSON.stringify(arrParseado)
          localStorage.setItem('favoritos', arrStringificado)
        }
  
        this.setState({
          esFavorito: true
        })
      }
  
      sacarDeFavoritos(idPelicula){
        let storageFav = localStorage.getItem('favoritos')
        let arrParseado = JSON.parse(storageFav)
        let favsFiltrados = arrParseado.filter((id) => id !== idPelicula)
        let arrStringificado = JSON.stringify(favsFiltrados)
        localStorage.setItem('favoritos', arrStringificado)

        if(this.props.actualizarState !== false){
            this.props.actualizarState(idPelicula)
            return
        }

        this.setState({
          esFavorito: false
        })
        
      }
  

    render(){
        return(
          <div className="movie-card">
          <Link to={`/detalle/id/${this.props.id}`}>
          <img src={`https://image.tmdb.org/t/p/w500${this.props.imagen}`} alt={this.props.nombre} />
          </Link>
          <h4>{this.props.nombre}</h4>
          <p>{this.state.descripcion}</p>
              {
              this.state.esFavorito ?
              <button onClick={()=> this.sacarDeFavoritos(this.props.id)}>
                Sacar de favoritos
              </button>  
              :
              <button onClick={()=> this.agregarAFavoritos(this.props.id)}>
                Agregar a favoritos
              </button>
            }
          </div>
        )
    }
}

export default PeliculaFav