const pool = require('../models/db');

const obtenerTodasApuestas = async (req,res,next)=> {
    try {
        const { id_anfitrion } = req.params;
        const result = await pool.query(
            `SELECT id,evento,liga,pais,monto,cast(fecha_apuesta as varchar)::varchar(10) as fecha_apuesta,apuesta_estado,apuesta_resultado
             FROM bet_apuesta 
             WHERE id_anfitrion = $1
             ORDER BY fecha_apuesta DESC`,[id_anfitrion]);
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error al obtener apuestas' });
    }
};

const obtenerApuesta = async (req,res,next)=> {
    try {
        //console.log(req.params);
        const { id } = req.params;
        //console.log(id);
        const result = await pool.query(
            `SELECT id,evento,liga,pais,monto,cast(fecha_apuesta as varchar)::varchar(10) as fecha_apuesta,apuesta_estado,apuesta_resultado 
            FROM bet_apuesta WHERE id = $1`, [id]);

        if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Apuesta no encontrada' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error al obtener la apuesta' });
    }
};

const crearApuesta = async (req,res,next)=> {
    try {
        const {
            id_anfitrion,
            evento,
            liga,
            pais,
            monto,
            apuesta_estado,
            fecha_apuesta
        } = req.body;

        const result = await pool.query(
        `INSERT INTO bet_apuesta 
            (id_anfitrion, evento, liga, pais, monto, apuesta_estado,fecha_apuesta) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING *`,
        [id_anfitrion, evento, liga,pais, monto, apuesta_estado, fecha_apuesta]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear la apuesta' });
    }
};

const eliminarApuesta = async (req,res,next)=> {
    try {
        const { id } = req.params;
        const result = await pool.query(`DELETE FROM bet_apuesta WHERE id = $1 RETURNING *`, [id]);

        if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Apuesta no encontrada' });
        }

        //res.json({ mensaje: 'Apuesta eliminada' });
        return res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar la apuesta' });
    }
};

const actualizarApuesta = async (req,res,next)=> {
    try {
        const { id } = req.params;
        const {
            monto,
            apuesta_estado
        } = req.body;

        const result = await pool.query(
        `UPDATE bet_apuesta SET 
            monto = COALESCE($1, monto),
            apuesta_estado = COALESCE($2, apuesta_estado)
        WHERE id = $3
        RETURNING *`,[monto, apuesta_estado, id]);

        if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Apuesta no encontrada' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar la apuesta' });
    }
};

module.exports = {
    obtenerTodasApuestas,
    obtenerApuesta,
    crearApuesta,
    eliminarApuesta,
    actualizarApuesta
 }; 