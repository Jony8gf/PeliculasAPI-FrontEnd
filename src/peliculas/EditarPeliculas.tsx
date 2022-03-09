import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Cargando from "utils/Cargando";
import { urlPeliculas } from "utils/endpoints";
import { convertirPeliculaAFormData } from "utils/FormDataUtils";
import MostrarErrores from "utils/MostarErrores";
import FormularioPeliculas from "./FormularioPeliculas";
import { peliculaCreacionDTO, peliculasPutGetDTO } from "./peliculas.model";

export default function EditarPeliculas() {


    const [peliculas, setPeliculas] = useState<peliculaCreacionDTO>();
    const [peliculaPutGet, setPeliculaPutGet] = useState<peliculasPutGetDTO>();
    const {id}: any = useParams();

    const history = useHistory();
    const [errores, setErrores] = useState<string[]>([]);

    useEffect(() => {
        axios.get(`${urlPeliculas}/PutGet/${id}`)
        .then((respuesta: AxiosResponse<peliculasPutGetDTO>) => {
            const modelo: peliculaCreacionDTO = {
                titulo: respuesta.data.pelicula.titulo,
                enCines: respuesta.data.pelicula.enCines,
                trailer: respuesta.data.pelicula.trailer,
                posterURL: respuesta.data.pelicula.poster,
                resumen: respuesta.data.pelicula.resumen,
                fechaLanzamiento: new Date(respuesta.data.pelicula.fechaLanzamiento)
            };
            setPeliculas(modelo);
            setPeliculaPutGet(respuesta.data);
        })
    }, [id])

    async function editarPelicula(peliculaEditar:peliculaCreacionDTO) {
        try{
            const formData = convertirPeliculaAFormData(peliculaEditar);
            await axios({
                method: 'put',
                url: `${urlPeliculas}/${id}`,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            }).then((respuesta: AxiosResponse<number>) => {
                history.push(`/pelicula/${id}`);
            });
        }catch(error){
            setErrores(error.response.data);
        }
    }

    return (

        <>
            <h3>Editar Película</h3>
            <MostrarErrores errores={errores} />
            {peliculas && peliculaPutGet ? <FormularioPeliculas
            actoresSeleccionados={peliculaPutGet!.actores}
            cinesSeleccionados={peliculaPutGet!.cinesSeleccionados}
            cinesNoSeleccionados={peliculaPutGet!.cinesNoSeleccionados}
            generosNoSeleccionados={peliculaPutGet!.generosNoSeleccionados}
            generosSeleccionados={peliculaPutGet!.generosSeleccionados}
                modelo={peliculas}
                onSubmit={async valores => await editarPelicula(valores)}
            /> : <Cargando />}
        </>

    )
}