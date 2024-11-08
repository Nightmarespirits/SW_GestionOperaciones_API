// reportGenerator.js
import ExcelJS from 'exceljs';
import OperacionModel from './models/OperacionModel.js';
import EmpleadoModel from './models/EmpleadoModel.js';

export async function generateOperationsReport(startDate, endDate) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte de Operaciones');

    // Configurar encabezados
    worksheet.columns = [
        { header: 'Fecha Inicio', key: 'fecInicio', width: 15 },
        { header: 'Fecha Final', key: 'fecFinal', width: 15 },
        { header: 'Estado', key: 'estado', width: 10 },
        { header: 'Etapa Actual', key: 'etapa', width: 15 },
        { header: 'Número de Orden', key: 'numOrden', width: 15 },
        { header: 'Tipo Proceso', key: 'tipoProceso', width: 15 },
        { header: 'Responsable', key: 'responsable', width: 25 },
        { header: 'Cantidad', key: 'cantidad', width: 10 },
        { header: 'Observaciones', key: 'observaciones', width: 30 }
    ];

    // Consulta agregada para obtener los datos relacionados
    const operaciones = await OperacionModel.aggregate([
        {
            $match: {
                fecInicio: {
                    $gte: startDate,
                    $lte: endDate
                }
            }
        },
        {
            $lookup: {
                from: 'procesos',
                localField: 'procesos',
                foreignField: '_id',
                as: 'procesos'
            }
        }
    ]);

    // Procesar datos y agregar filas
    for (const operacion of operaciones) {
        for (const proceso of operacion.procesos) {
            // Obtener datos del empleado
            const empleado = await EmpleadoModel.findById(proceso.responsable);
            
            for (const detalle of proceso.detalles) {
                worksheet.addRow({
                    fecInicio: operacion.fecInicio,
                    fecFinal: operacion.fecFinal,
                    estado: operacion.estadoOperacion ? 'Completado' : 'En Proceso',
                    etapa: operacion.currentStage,
                    numOrden: detalle.numOrden,
                    tipoProceso: proceso.tipo,
                    responsable: empleado ? `${empleado.nombres} ${empleado.apellidos}` : 'No asignado',
                    cantidad: detalle.cantidad,
                    observaciones: detalle.obs || ''
                });
            }
        }
    }

    // Aplicar estilos
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE0E0E0' }
    };

    return workbook;
}

