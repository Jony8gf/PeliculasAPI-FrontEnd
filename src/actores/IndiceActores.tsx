import { Link } from "react-router-dom";
import { urlActores } from "utils/endpoints";
import IndiceEntidad from "utils/IndiceEntidad";
import { actorDTO } from "./actores.model";

export default function IndiceActores() {
    return (
        <>
            <IndiceEntidad<actorDTO> 
                url={urlActores}
                urlCrear="actores/crear"
                titulo="Actores"
                nombreEntidad="Actores">

                    {(actores, botones) => 
                        <>
                            <thead>
                            <th></th>
                            <th>Nombre</th>
                        </thead>
                        <tbody>
                            {actores?.map(actor => 
                                <tr key={actor.id}>
                                    <td>
                                       {botones(`actores/editar/${actor.id}`, actor.id)} 
                                    </td>
                                    <td>
                                        {actor.nombre}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        </>
                    }
                    
                </IndiceEntidad>
        </>

    )
}