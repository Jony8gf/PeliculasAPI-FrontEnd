import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { urlCines } from "utils/endpoints";
import { cineCreacionDTO } from "./cines.model";
import FormularioCines from "./FormularioCines";

export default function CrearCines() {

    const history = useHistory();
    const [errores, setErrores] = useState<string[]>([]);

    async function crearCine(cine: cineCreacionDTO) {
        try{
            await axios.post(urlCines, cine);
            history.push('/cines');
        }
        catch (error){
            setErrores(error.response.data)
        }
    }

    return (
        <>
            <h3>Crear cine</h3>
            <FormularioCines
                modelo={{nombre: ''}}
                onSubmit={async valores => {
                    await crearCine(valores);
                 }}
            />
        </>

    )
}