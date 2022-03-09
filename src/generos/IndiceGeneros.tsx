import IndiceEntidad from "utils/IndiceEntidad";
import { generoDTO } from "./generos.model";
import { urlGeneros } from "utils/endpoints";

export default function IndiceGeneros() {

    return (
        <>

                <IndiceEntidad<generoDTO> 
                url={urlGeneros}
                urlCrear="generos/crear"
                titulo="Generos"
                nombreEntidad="Genero">

                    {(generos, botones) => 
                        <>
                            <thead>
                            <th></th>
                            <th>Nombre</th>
                        </thead>
                        <tbody>
                            {generos?.map(genero => 
                                <tr key={genero.id}>
                                    <td>
                                       {botones(`generos/editar/${genero.id}`, genero.id)} 
                                    </td>
                                    <td>
                                        {genero.nombre}
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