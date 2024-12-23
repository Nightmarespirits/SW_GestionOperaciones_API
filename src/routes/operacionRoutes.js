import express from 'express';
import { generateOperationsReport } from '../utils/excelGenerator.js';
import OperacionModel from '../operacion/model/OperacionModel.js';

const router = express.Router();

// ...existing code...

router.get('/reporte-operaciones', async (req, res) => {
    const { companyId, startDate, endDate } = req.query;

    if (!companyId || !startDate || !endDate) {
        return res.status(400).send('companyId, startDate, and endDate are required');
    }

    try {
        const workbook = await generateOperationsReport(companyId, new Date(startDate), new Date(endDate));
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=Reporte_Operaciones.xlsx');

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).send('Error generating report');
    }
});

export default router;
