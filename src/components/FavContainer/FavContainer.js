import React, {Component} from 'react'
import PeliculaFav from '../PeliculaFav/PeliculaFav'
import './styles.css'

class FavContainer extends Component {
  constructor(props){
    super(props)

  }


  
  render(){
    return (
      <>
      <div className='movies-container'>
        {
          this.props.peliculas.length === 0 ?
          <h2>Agrega tus peliculas favoritas desde el detalle o desde home</h2> :
          this.props.peliculas.map((Pelicula)=> 
          <PeliculaFav 
          id={Pelicula.id} nombre={Pelicula.title} imagen={Pelicula.poster_path} descripcion={Pelicula.overview}
            actualizarState={this.props.actualizarState ? (id) =>  this.props.actualizarState(id) : false}
          />)
        }
      </ div>
      </>
    )
  }
}

export default FavContainer