import express from 'express';
import { generateOperationsReport } from '../utils/reportGenerator.js';

const router = express.Router();

router.get('/operaciones/excel', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        
        if (!startDate || !endDate) {
            return res.status(400).json({ 
                message: 'Se requieren fechas de inicio y fin' 
            });
        }

        const workbook = await generateOperationsReport(startDate, endDate);
        
        res.setHeader(
            'Content-Type', 
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition', 
            `attachment; filename=reporte-operaciones-${startDate}-${endDate}.xlsx`
        );

        await workbook.xlsx.write(res);
        res.status(200).end();

    } catch (error) {
        console.error('Error generando reporte:', error);
        res.status(500).json({ 
            message: 'Error generando el reporte', 
            error: error.message 
        });
    }
});

export default router;