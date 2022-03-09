import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { urlActores } from 'utils/endpoints';
import { convertirActorAFormData } from 'utils/FormDataUtils';
import MostrarErrores from 'utils/MostarErrores';
import { actorCreacionDTO } from './actores.model';
import FormularioActores from './FormularioActores'
export default function CrearActores() {

    const history = useHistory();
    const [errores, setErrores] = useState<string[]>([]);

    async function crearActor(actor: actorCreacionDTO) {
        try{
            const formData = convertirActorAFormData(actor);
            await axios({
                method: 'post',
                url: urlActores,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            });
            history.push('/actores');
        }
        catch (error){
            setErrores(error.response.data)
        }
    }

    return (
        <>
            <h3>Crear Actores</h3>
            <MostrarErrores errores={errores} />
            <FormularioActores
                modelo={{nombre: '', fechaNacimiento: undefined}}
                onSubmit={async valores => await crearActor(valores)}
            />
        </>

    )
}