import OperacionService from '../services/OperacionService.js';

class OperacionController {
    async createOperacion(req, res) {
        try {
            const companyId = req.params.companyId
            const sucursalId = req.params.sucursalId
            const operacion = await OperacionService.createOperacion(req.body, companyId, sucursalId);
            res.status(201).json({
                success: true,
                message: 'Operación creada exitosamente',
                data: operacion
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async getOperacionById(req, res) {
        try {
            const operacion = await OperacionService.getOperacionById(req.params.id);
            res.status(200).json({
                success: true,
                data: operacion
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    async getAllOperaciones(req, res) {
        try {
            const { 
                page = 1, 
                limit = 10, 
                company, 
                sucursal, 
                currentStage,
                estadoOperacion 
            } = req.query;

            // Construir filtro de búsqueda
            const query = {};
            if (company) query.company = company;
            if (sucursal) query.sucursal = sucursal;
            if (currentStage) query.currentStage = currentStage;
            if (estadoOperacion !== undefined) {
                query.estadoOperacion = estadoOperacion === 'true';
            }

            const operaciones = await OperacionService.getAllOperaciones(
                query, 
                parseInt(page), 
                parseInt(limit)
            );

            res.status(200).json({
                success: true,
                ...operaciones
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async updateOperacion(req, res) {
        try {
            const operacion = await OperacionService.updateOperacion(
                req.params.id, 
                req.body
            );
            res.status(200).json({
                success: true,
                message: 'Operación actualizada exitosamente',
                data: operacion
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async deleteOperacion(req, res) {
        try {
            await OperacionService.deleteOperacion(req.params.id);
            res.status(200).json({
                success: true,
                message: 'Operación eliminada exitosamente'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async addProceso(req, res) {
        try {
            const operacion = await OperacionService.addProcesoToOperacion(
                req.params.id, 
                req.body
            );
            res.status(200).json({
                success: true,
                message: 'Proceso agregado exitosamente',
                data: operacion
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async updateCurrentStage(req, res) {
        try {
            const { newStage } = req.body;
            const operacion = await OperacionService.updateCurrentStage(
                req.params.id, 
                newStage
            );
            res.status(200).json({
                success: true,
                message: 'Etapa actualizada exitosamente',
                data: operacion
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async updateProceso(req, res) {
        try {
            const { operacionId, procesoId } = req.params;
            const operacion = await OperacionService.updateProceso(
                operacionId,
                procesoId,
                req.body
            );
            
            res.status(200).json({
                success: true,
                message: 'Proceso actualizado exitosamente',
                data: operacion
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async getProcesosByFilters(req, res) {
        try {
            const procesos = await OperacionService.getProcesosByFilters(req.query);
            res.status(200).json({
                success: true,
                data: procesos
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async filterProcesosByNumOrden(req, res) {
        try {
            const { numOrden } = req.query;
            const procesos = await OperacionService.filterProcesosByNumOrden(numOrden);
            res.status(200).json({
                success: true,
                data: procesos
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default new OperacionController();
