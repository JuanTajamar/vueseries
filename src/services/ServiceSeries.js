import Global from "@/Global";
import axios from "axios";

export default class ServiceSeries {

    createPersonaje(personaje){
    return new Promise(function(resolve) {
        let request = "api/personajes";
        let url = Global.urlSeries + request
        axios.post(url, personaje).then(response => {
            resolve(response)
        })
    })
    }

    findPersonaje(idPersonaje) {
        let request = "api/personajes/" + idPersonaje
        let url = Global.urlSeries + request
        return fetch(url)
        .then(response => {
            if(!response.ok) {
                throw new Error("Error en el response")
            }
            return response.json()
        })
        .then(personaje => {
            return personaje
        })
        .catch(error => {
            console.log("Error al buscar personaje: ", error)
            throw error
        })
    }

        findSerie(idSerie) {
        let request = "api/series/" + idSerie
        let url = Global.urlSeries + request
        return fetch(url)
        .then(response => {
            if(!response.ok) {
                throw new Error("Error en el response")
            }
            return response.json()
        })
        .then(serie => {
            return serie
        })
        .catch(error => {
            console.log("Error al buscar personaje: ", error)
            throw error
        })
    }

    updatePersonajes(personaje) {
        let request = "api/personajes/" + personaje.idPersonaje + "/" + personaje.idSerie
        let url = Global.urlSeries + request
        return fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(personaje)
        })
        .then(response => {
            if(!response.ok) {
                throw new Error("Error en el response")
            }

            return;
        })
        .catch(error => {
            console.log("Error al actualizar personaje: ", error)
            throw error;
        })
    }
}