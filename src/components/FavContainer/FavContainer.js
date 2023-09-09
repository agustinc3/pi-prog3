import React, {Component} from 'react'
import PeliculaFav from '../PeliculaFav/PelicualFav'
import { options } from "../../utils/constants"

class FavContainer extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      favoritos:[]

    }
  }

  render(){
    return (
      <>
      <div className='characters-container'>
        {
          this.props.favoritos.length === 0 ?
          <h1>Trayendo personajes</h1> :
          this.props.favoritos.map((favoritos)=> 
          <PeliculaFav 
            id={favoritos.id} 
            nombre={favoritos.name} 
            imagen={favoritos.image} 
            descripcion={favoritos.status}
            actualizarState={this.props.actualizarState ? (id) =>  this.props.actualizarState(id) : false}
          />)
        }
      </ div>
      </>
    )
  }
}

export default FavContainer