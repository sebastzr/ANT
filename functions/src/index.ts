import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const json2csv = require("json2csv").parse;

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.jsonReport = functions.https.onRequest( (request, response) => {
    const db = admin.firestore();
    let data:any = [];
    db.collection('_forms').get()
        .then( (querySnapshot) => {
            querySnapshot.forEach( (doc) => {
                data.push(doc.data());
            });
            response.status(200).json(data);         
        }).catch( (error) => {
            console.log('Error gettin document: ', error);
            response.status(200).send('Error gettin document: ' + error);
        });
});

exports.cssJsonReport = functions.https.onRequest( (request, response) => {
    const db = admin.firestore();
    let data: any = [];
    let iterDoc: any;
    db.collection('_forms').get()
        .then( (querySnapshot) => {
            querySnapshot.forEach( (doc) => {
                iterDoc = doc.data();
                let iterFotos: any = [];
                if (iterDoc.fotos) {
                    iterDoc.fotos.forEach((element: { url: string; }) => {
                      iterFotos.push(element.url);
                    });     
                }
                let creadoEL :any = '';
                if(iterDoc.creadoEL) {
                    creadoEL = new Date(iterDoc.creadoEL.seconds * 1000);
                }                
                data.push({
                    'EDP': iterDoc.solicitudEDP,
                    '1.1. Departamento': iterDoc.capituloUno.departamento || '',
                    '1.2. Municipio': iterDoc.capituloUno.municipio || '',
                    '1.3. Tipo de Territorio': iterDoc.capituloUno.tipoTerritorio || '',
                    '1.3.1. Tipo de Territorio (Otro)': iterDoc.capituloUno.tipoTerritorioOtroCual || '',
                    '1.4. Zona de Manejo': iterDoc.capituloUno.zonaManejo || '',
                    '1.4.1. Zona de Manejo': iterDoc.capituloUno.zonaManejoOtraCual || '',
                    '1.5. Nombre de Territorio': iterDoc.capituloUno.nombreTerritorio || '',
                    '1.6. Nombre del Predio': iterDoc.capituloUno.nombrePredio || '',
                    '1.7.1. Latitud Predio': iterDoc.capituloUno.latitudPredio || '',
                    '1.7.2. Longitud Predio': iterDoc.capituloUno.longitudPredio || '',
                    '1.8.1. Localización(Latitud)': iterDoc.capituloUno.latitud || '',
                    '1.8.1. Localización(Longitud)': iterDoc.capituloUno.longitud || '',
                    '1.9. Observaciones Capitulo Uno': iterDoc.capituloUno.observacionesCapituloUno || '',
                    '2.1.1. Área del Predio': iterDoc.capituloDos.areaPredio || '',
                    '2.1.2. Medida': iterDoc.capituloDos.medida || '',
                    '2.2.1. Colindante: Norte': iterDoc.capituloDos.norte || '',
                    '2.2.2. Colindante: Sur': iterDoc.capituloDos.sur || '',
                    '2.2.3. Colindante: Este': iterDoc.capituloDos.este || '',
                    '2.2.4. Colindante: Oeste': iterDoc.capituloDos.oeste || '',
                    '2.3. Documento de Propiedad': iterDoc.capituloDos.documentoPropiedad || '',
                    '2.3.1. Numero Adjudicación Registrada': iterDoc.capituloDos.numeroAjudicacionRegistrada || iterDoc.capituloDos.numeroAjudicacionSinRegistrar || iterDoc.capituloDos.numeroAjudicacionRegistrada || iterDoc.capituloDos.resolucionAdjudicacionOtroCual || '',
                    '2.3.2. Fecha Adjudicación Registrada': iterDoc.capituloDos.fechaAdjudicacionRegistrada || iterDoc.capituloDos.fechaAjudicacionSinRegistrar || iterDoc.capituloDos.fechaAdjudicacionOtroCual || '',                    
                    '2.4. Entidad Adjudicada': iterDoc.capituloDos.entidadAdjudicada || '',
                    '2.5. Servicio o Actividad': iterDoc.capituloDos.servicioActividad || '',
                    '2.5.1. Fecha de Inicio': iterDoc.capituloDos.fechaInicialTiempoEstablecido || '',
                    '2.5.2. Fecha Final': iterDoc.capituloDos.fechaFinalTiempoEstablecido || '',
                    '2.6. Actividad Diferente': iterDoc.capituloDos.actividadDiferente || '',
                    '2.6.1. Actividad Diferente Otra': iterDoc.capituloDos.actividadDiferenteCual || '',
                    '2.6.2. Tiempo Actividad Diferente': iterDoc.capituloDos.actividadDiferenteTiempo || '',
                    '2.7. Personas Beneficiadas': iterDoc.capituloDos.personasBeneficiadas || '',
                    '2.8. Población Beneficiaria': iterDoc.capituloDos.poblacionBeneficiaria || '',
                    '2.9. Grupo Etario': iterDoc.capituloDos.grupoEtario || '',
                    '2.10. Estado de Abandono': iterDoc.capituloDos.estadoAbandono || '',
                    '2.10.1. Razón Estado de Abandono': iterDoc.capituloDos.estadoAbandonoRazon || '',
                    '2.10.1.1. Razón Estado de Abandono(Otro)': iterDoc.capituloDos.razonAbandonoOtroCual || '',
                    '2.10.2. Ocupante o Administrador del Predio': iterDoc.capituloDos.ocupacionAdministracion || '',
                    '2.11. Observaciones Capitulo Dos': iterDoc.capituloDos.observacionesCapituloDos || '',
                    '3.1. Infraestructura Instalada': iterDoc.capituloTres.infraestructuraInstalada || '',                     
                    '3.1.1. Descripción Infraestructura': iterDoc.capituloTres.tipoInfraestructuraDescripcion || '', 
                    '3.1.2. Baterias Sanitarias': iterDoc.capituloTres.bateriasSanitarias || '', 
                    '3.2. Estado General Infraestructura': iterDoc.capituloTres.estadoInfraestructura || '', 
                    '3.3. Existía la Infraestructura': iterDoc.capituloTres.tipoInfraestructura || '', 
                    '3.4. Inversión Infraestructura': iterDoc.capituloTres.inversionInfraestructura || '', 
                    '3.4.1. Valor Inversión Infraestructura': iterDoc.capituloTres.inversionInfraestructuraValor || '', 
                    '3.5. Energía Eléctrica': iterDoc.capituloTres.energiaElectrica || '', 
                    '3.6. Abastecimiento de Agua': iterDoc.capituloTres.abasteciomientoAgua || '', 
                    '3.6.1. Agua Potable': iterDoc.capituloTres.aguaPotable || '',  
                    '3.6.2. Tanques de Almacenamiento': iterDoc.capituloTres.tanquesAlmacenamiento || '',  
                    '3.7. Observaciones Capitulo Tres': iterDoc.capituloTres.observacionesCapituloTres || '', 
                    '4.1. Nombre del Encuestado': iterDoc.capituloTres.nombre || '', 
                    '4.2. Tipo de Doc. del Encuestado': iterDoc.capituloTres.tipoIdentificacion || '', 
                    '4.2.1. Tipo de Identificación(Otro)': iterDoc.capituloTres.tipoIdentificacionOtroCual || '', 
                    '4.2.2. Número de Identificación del Encuestado': iterDoc.capituloTres.numeroIdentificacion || '', 
                    '4.3. Número Celular del Encuestado': iterDoc.capituloTres.numeroCelular || '', 
                    '4.4. Tiene Email': iterDoc.capituloTres.tieneEmail || '', 
                    '4.4.1. Email': iterDoc.capituloTres.correoElectronico || '', 
                    '4.5. Institución': iterDoc.capituloTres.institucion || '', 
                    '4.5.1. Institución(Otro)': iterDoc.capituloTres.institucionOtroCual || '', 
                    '4.6. Cargo en la Institución': iterDoc.capituloTres.cargoInstitucion || '', 
                    '4.7. Actividad Adjudicada': iterDoc.capituloTres.actividadAdjudicada || '', 
                    '4.8. Estado Actual de la Infraestructura': iterDoc.capituloTres.estadoActual || '', 
                    '4.9. Calidad del Servicio': iterDoc.capituloTres.calidadServicioPrestado || '', 
                    '4.10. Inversión Actividades': iterDoc.capituloTres.inversionActividades || '', 
                    '4.10.1. Inversión Actividades Tiempo': iterDoc.capituloTres.inversionActividadesTiempo || '', 
                    '4.11. Observaciones Capitulo Cuatro': iterDoc.capituloTres.observacionesCapituloCuatro || '', 
                    'Fecha Ultima Modificación': new Date(iterDoc.formularioModificadoEl.seconds * 1000) || '',
                    'Fecha Creación': creadoEL,
                    'Usuario': iterDoc.user || '',
                    'URL Fotos': iterFotos,
                });
            });
            const csv = json2csv(data, {
                flatten: true,                
                delimiter: ';',
                includeEmptyRows: true,
            });  
            response.setHeader(
                'Content-disposition',
                'attachment; filename=report.csv'
            )
            response.set('Content-type', 'text/csv');
            response.set('Access-Control-Allow-Origin', '*');
            response.status(200).send(csv);                   
        }).catch( (error) => {
            console.log('Error gettin document: ', error);
            response.status(200).send('Error gettin document: ' + error);
        });    
});