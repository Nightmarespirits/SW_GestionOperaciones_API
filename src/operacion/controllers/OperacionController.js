import OperacionService from '../services/OperacionService.js';

class OperacionController {
    async createOperacion(req, res) {
        try {
            const { companyId, sucursalId } = req.params;
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
            const { companyId, sucursalId, id } = req.params;
            const operacion = await OperacionService.getOperacionById(companyId, sucursalId, id);
            res.status(200).json({
                success: true,
                data: operacion
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async getAllOperaciones(req, res) {
        try {
            const { companyId, sucursalId } = req.params;
            const { page, limit, ...query } = req.query;
            const operaciones = await OperacionService.getAllOperaciones(companyId, sucursalId, query, page, limit);
            res.status(200).json({
                success: true,
                data: operaciones
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async updateOperacion(req, res) {
        try {
            const { companyId, sucursalId, id } = req.params;
            const operacion = await OperacionService.updateOperacion(companyId, sucursalId, id, req.body);
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
            const { companyId, sucursalId, id } = req.params;
            const operacion = await OperacionService.deleteOperacion(companyId, sucursalId, id);
            res.status(200).json({
                success: true,
                message: 'Operación eliminada exitosamente',
                data: operacion
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async addProcesoToOperacion(req, res) {
        try {
            const { companyId, sucursalId, operacionId } = req.params;
            const proceso = await OperacionService.addProcesoToOperacion(companyId, sucursalId, operacionId, req.body);
            res.status(201).json({
                success: true,
                message: 'Proceso agregado exitosamente',
                data: proceso
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
            const { companyId, sucursalId, id } = req.params;
            const operacion = await OperacionService.updateCurrentStage(companyId, sucursalId, id, req.body.currentStage);
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
            const { companyId, sucursalId, operacionId, procesoId } = req.params;
            const proceso = await OperacionService.updateProceso(companyId, sucursalId, operacionId, procesoId, req.body);
            res.status(200).json({
                success: true,
                message: 'Proceso actualizado exitosamente',
                data: proceso
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
            const { companyId, sucursalId } = req.params;
            const { page, limit, ...query } = req.query;
            const procesos = await OperacionService.getProcesosByFilters(companyId, sucursalId, query, page, limit);
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
            const { companyId, sucursalId } = req.params;
            const procesos = await OperacionService.filterProcesosByNumOrden(companyId, sucursalId, req.query.numOrden);
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
