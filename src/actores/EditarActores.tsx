import EditarEntidad from 'utils/EditarEntidad';
import { urlActores } from 'utils/endpoints';
import { convertirActorAFormData } from 'utils/FormDataUtils';
import { actorCreacionDTO, actorDTO } from './actores.model';
import FormularioActores from './FormularioActores'

export default function EditarActores() {


    const transformar = (actor: actorDTO)  => {
        return{
            nombre: actor.nombre,
            fotoUrl: actor.foto,
            biografia: actor.biografia,
            fechaNacimiento: new Date(actor.fechaNacimiento)
        }
    }
  
    return (
        <>
            <EditarEntidad<actorCreacionDTO, actorDTO>
                url={urlActores} 
                urlIndice="/Actores" 
                nombreEntidad="Actores" 
                transformar={transformar}
                transformarFormData={convertirActorAFormData}
            >
                {(entidad, editar) => 
                    <FormularioActores
                    modelo={entidad}
                    onSubmit={async valores =>  await editar(valores)}
                />    }
            </EditarEntidad>
        </>

    )
}