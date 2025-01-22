import Operacion from '../model/OperacionModel.js';
import mongoose from 'mongoose';

class OperacionService {
    async createOperacion(operacionData, companyId, sucursalId) {
        try {
            const operacion = new Operacion({
                company: companyId,
                sucursal: sucursalId,
                ...operacionData,
            });
            return await operacion.save();
        } catch (error) {
            throw new Error(`Error creando operación: ${error.message}`);
        }
    }

    async getOperacionById(companyId, sucursalId, id) {
        try {
            const operacion = await Operacion.findOne({
                _id: id,
                company: companyId,
                sucursal: sucursalId
            })
                .populate('company')
                .populate('sucursal')
                .populate({
                    path: 'procesos.responsable',
                    select: 'nombre apellido'
                })
                .populate({
                    path: 'procesos.detalles.maquina',
                    select: 'nombre codigo'
                });
            
            if (!operacion) {
                throw new Error('Operación no encontrada');
            }
            
            return operacion;
        } catch (error) {
            throw new Error(`Error obteniendo operación: ${error.message}`);
        }
    }

    async getAllOperaciones(companyId, sucursalId, query = {}, page = 1, limit = 10) {
        try {
            const filter = { company: companyId, sucursal: sucursalId, ...query };
            const operaciones = await Operacion.find(filter)
                .populate('company', 'nombre')
                .populate('sucursal', 'nombre')
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit);

            const total = await Operacion.countDocuments(filter);

            return {
                operaciones,
                total,
                page,
                limit
            };
        } catch (error) {
            throw new Error(`Error listando operaciones: ${error.message}`);
        }
    }

    async updateOperacion(companyId, sucursalId, id, updateData) {
        try {
            const operacion = await Operacion.findOneAndUpdate(
                { _id: id, company: companyId, sucursal: sucursalId },
                updateData, 
                { 
                    new: true, 
                    runValidators: true 
                }
            );

            if (!operacion) {
                throw new Error('Operación no encontrada');
            }

            return operacion;
        } catch (error) {
            throw new Error(`Error actualizando operación: ${error.message}`);
        }
    }

    async deleteOperacion(companyId, sucursalId, id) {
        try {
            const operacion = await Operacion.findOneAndDelete({
                _id: id,
                company: companyId,
                sucursal: sucursalId
            });

            if (!operacion) {
                throw new Error('Operación no encontrada');
            }

            return operacion;
        } catch (error) {
            throw new Error(`Error eliminando operación: ${error.message}`);
        }
    }

    async addProcesoToOperacion(companyId, sucursalId, operacionId, procesoData) {
        try {
            const operacion = await Operacion.findOne({
                _id: operacionId,
                company: companyId,
                sucursal: sucursalId
            });

            if (!operacion) {
                throw new Error('Operación no encontrada');
            }

            operacion.procesos.push(procesoData);
            return await operacion.save();
        } catch (error) {
            throw new Error(`Error agregando proceso: ${error.message}`);
        }
    }

    async updateCurrentStage(companyId, sucursalId, operacionId, newStage) {
        try {
            const operacion = await Operacion.findOneAndUpdate(
                { _id: operacionId, company: companyId, sucursal: sucursalId },
                { currentStage: newStage },
                { new: true }
            );

            if (!operacion) {
                throw new Error('Operación no encontrada');
            }

            return operacion;
        } catch (error) {
            throw new Error(`Error actualizando etapa actual: ${error.message}`);
        }
    }

    async updateProceso(companyId, sucursalId, operacionId, procesoId, updateData) {
        try {
            const operacion = await Operacion.findOneAndUpdate(
                { 
                    _id: operacionId,
                    company: companyId,
                    sucursal: sucursalId,
                    'procesos._id': procesoId 
                },
                { 
                    $set: { 
                        'procesos.$.responsable': updateData.responsable,
                        'procesos.$.detalles': updateData.detalles,
                        'procesos.$.estado': updateData.estado,
                        'procesos.$.tipo': updateData.tipo,
                        'procesos.$.fechaInicio': updateData.fechaInicio,
                        'procesos.$.fechaFin': updateData.fechaFin
                    }
                },
                { new: true, runValidators: true }
            );

            if (!operacion) {
                throw new Error('Operación o proceso no encontrado');
            }

            return operacion;
        } catch (error) {
            throw new Error(`Error actualizando proceso: ${error.message}`);
        }
    } 

    async getProcesosByFilters(companyId, sucursalId, query = {}, page = 1, limit = 10) {
        try {
            const { responsable, estado, tipo, fechaInicio, fechaFin, fecha } = query;
    
            // Validar ObjectIds de company y sucursal
            if (!mongoose.Types.ObjectId.isValid(companyId) || !mongoose.Types.ObjectId.isValid(sucursalId)) {
                throw new Error("IDs de compañía o sucursal no válidos");
            }
    
            // Pipeline de agregación
            const pipeline = [
                // 1. Filtro inicial (documento padre)
                { 
                    $match: { 
                        company: new mongoose.Types.ObjectId(companyId),
                        sucursal: new mongoose.Types.ObjectId(sucursalId),
                        "procesos": { $exists: true, $not: { $size: 0 } } // Asegura que haya procesos
                    } 
                },
                // 2. Descomponer el array 'procesos'
                { $unwind: "$procesos" },
                // 3. Filtros a nivel de subdocumento (procesos individuales)
                { 
                    $match: { 
                        ...(responsable && mongoose.Types.ObjectId.isValid(responsable) && { 
                            "procesos.responsable": new mongoose.Types.ObjectId(responsable) 
                        }),
                        ...(estado !== undefined && { "procesos.estado": estado === 'true' }),
                        ...(tipo && { "procesos.tipo": tipo }),
                        // Manejo de fechas
                        ...(fecha && { 
                            "procesos.fecha": { 
                                $gte: new Date(new Date(fecha).setUTCHours(0, 0, 0, 0)),
                                $lt: new Date(new Date(fecha).setUTCHours(23, 59, 59, 999))
                            }
                        }),
                        ...(fechaInicio && fechaFin && {
                            "procesos.fecha": {
                                $gte: new Date(fechaInicio),
                                $lt: new Date(fechaFin)
                            }
                        })
                    } 
                },
                // 4. Reemplazar raíz por el subdocumento 'procesos'
                { $replaceRoot: { newRoot: "$procesos" } },
                // 5. Ordenar por fecha de creación (createdAt en el subdocumento)
                { $sort: { createdAt: -1 } },
                // 6. Paginación
                { $skip: (parseInt(page, 10) - 1) * parseInt(limit, 10) },
                { $limit: parseInt(limit, 10) }
            ];
    
            // Ejecutar agregación para obtener resultados
            const procesos = await Operacion.aggregate(pipeline);
    
            // Pipeline para contar el total (omite paginación)
            const totalPipeline = [
                ...pipeline.slice(0, -3), // Elimina $sort, $skip, $limit
                { $count: "total" }
            ];
            const totalResult = await Operacion.aggregate(totalPipeline);
    
            return {
                procesos,
                total: totalResult[0]?.total || 0,
                page: parseInt(page, 10),
                limit: parseInt(limit, 10),
                message: "Procesos obtenidos exitosamente"
            };
        } catch (error) {
            // Log detallado para depuración (opcional)
            console.error("Error en getProcesosByFilters:", error.message);
            throw new Error(`Error al filtrar procesos: ${error.message}`);
        }
    }

    async filterProcesosByNumOrden(companyId, sucursalId, numOrden) {
        try {
            const operaciones = await Operacion.aggregate([
                { $match: { company: new mongoose.Types.ObjectId(companyId),
                    sucursal: new mongoose.Types.ObjectId(sucursalId), } },
                { $unwind: '$procesos' },
                { $unwind: '$procesos.detalles' },
                { $match: { 'procesos.detalles.numOrden': numOrden } },
                { $replaceRoot: { newRoot: '$procesos' } }
            ]);

            return operaciones;
        } catch (error) {
            throw new Error(`Error filtrando por número de orden: ${error.message}`);
        }
    }
}
export default new OperacionService();