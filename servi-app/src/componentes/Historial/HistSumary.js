import React, { useState } from 'react'
import firebase from '../../config/fbConfig'
import { createPost } from '../../Store/Actions/PostActions';
import { DeletePost } from '../../Store/Actions/PostActions';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const HistSummary = ({historial}) => {
  const [state,setState] = useState({showInfo:false,showCalification:false})
  var db = firebase.firestore(); 
    return (
      <div className="as1">
        <div className="as1">
        <table class="table">
          <thead>
            <tr>
            </tr>
          </thead>
          <tbody>
            <tr className="float-center">
              <th scope="row">{historial.calificacionProv}</th>
              <td>{historial.tipoServicio}</td>
              <td>{historial.nombreProv}</td>
              <td>{historial.correoProv}</td>
              <td><button className="btn btn-secondary" onClick={() => {
                if(state.showInfo){
                  setState({...state,showInfo:false})
                }else {
                  setState({...state,showInfo:true})
                }
              }}>Ver</button></td>
              <td>{historial.estado=="ACTIVO" ? <button className="btn btn-secondary" onClick ={
              () => setState({...state,showCalification:true})
              }>Finalizar</button>:null }</td>
            </tr>
          </tbody>
        </table>
            {/* <h6>{historial.calificacionProv}</h6>
            <p>{historial.tipoServicio}</p>
            <p>{historial.ciudadProv}</p>
            <p>{historial.correoClient}</p>
            <p>{historial.correoProv}</p> */}
            {
            state.showInfo==true ? 
              <div>
              <p>{historial.descripcionServicio}</p>
              <p>{historial.detalles}</p>
              <p>{historial.telefonoProv}</p>
              <p>{historial.id}</p>
              <p>{historial.creationDate.toDate().toDateString()}</p> 
              </div>
              : null 
            }        
            {/* <button className="btn btn-secondary" onClick={() => {
                if(state.showInfo){
                  setState({...state,showInfo:false})
                }else {
                  setState({...state,showInfo:true})
                }
            }}>Ver</button>  */}
            {/* {historial.estado=="ACTIVO" ? <button onClick ={
              () => setState({...state,showCalification:true})
            }>Finalizar</button>:null } */}
            {
            state.showCalification == true ?
            <div>
              <input type='text' placeholder='Calificación' id='ca'></input> 
              <button onClick ={() => 
              {const califiacionueva = document.getElementById('ca').value
                const post = {
                  calificacion: (parseInt(califiacionueva)+parseInt(historial.calificacionProv))/2,
                  ciudad: historial.ciudadProv,
                  correo: historial.correoProv,
                  descripcion: historial.descripcionServicio,
                  servicio: historial.tipoServicio,
                  telefono: historial.telefonoProv,
                  usuario: historial.nombreProv
                }
                db.collection("post").add({
                  ...post,
                })
                .then(function(docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
                db.collection("post").doc(historial.idPostProv).delete().then(function() {
                    console.log("Document successfully deleted!");
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
                const historialnuevo = {
                  calificacionProv: post.calificacion,
                  ciudadProv: historial.ciudadProv,
                  correoProv: historial.correoProv,
                  descripcionServicio: historial.descripcionServicio,
                  tipoServicio: historial.tipoServicio,
                  telefonoProv: historial.telefonoProv,
                  nombreProv: historial.nombreProv,
                  nombreClient: historial.nombreClient,
                  correoClient: historial.correoClient,
                  detalles:historial.detalles,
                  estado:"INACTIVO", 
                  creationDate: historial.creationDate
                }
                db.collection("Contratos").add({
                  ...historialnuevo,
                })
                .then(function(docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
                db.collection("Contratos").doc(historial.id).delete().then(function() {
                    console.log("Document successfully deleted!");
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
                }
              }>Enviar</button>
            </div>
            : null 
            }
        </div>
      </div>
    );
}
 const mapDispatchToProps = (dispatch) => {
   return {
     DeletePost: (post,id) => dispatch(DeletePost(post,id)),
     createPost: (post) => dispatch(createPost(post))
   };
 };
 export default compose(
   connect(null, mapDispatchToProps),
   firestoreConnect([
       { collection: 'post' }
   ])
 )(HistSummary);