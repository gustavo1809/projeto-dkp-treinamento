const { Router } = require("express");
const mysql = require('mysql2');

const router = Router();

const conn = mysql.createConnection({
    host: 'localhost',
    database: 'dkp-treinamento',
    user: 'root',
    password: 'parique30'
});

router.get('/listar', function (req, res) {

    try {

        conn.execute( `SELECT
                 car.id,
                 car.nome "Carro",
                 mar.nome AS "NomeMarca",
                 car.id_marca AS "idMarca"
            FROM
                tbl_carros AS car
            LEFT JOIN
                tbl_marcas AS mar ON mar.id = car.id_marca;`, function (err, response, fields) {

            if (err) throw err;

            res.status(200).json({
                msg: 'Sucesso na listagem de carros!',
                data: response
            });
        });

    } catch (error) {

        res.status(200).json({
            msg: 'Erro ao listar carros!',
            data: error
        });
    }
});


router.post('/cadastrar', function (req, res) {

    try {

        conn.execute('INSERT INTO tbl_carros (nome,id_marca) VALUES (?,?);', [req.body.nome,req.body.id_marca], function (err, response, fields) {

            if (err) throw err;

            res.status(200).json({
                msg: 'Carro cadastrado com sucesso!',
                data: response
            });
        });

    } catch (error) {

        res.status(500).json({
            msg: 'Erro ao cadastrar carro!',
            data: error
        });
    }
});

router.put('/alterar/:id', function (req, res) {

    try {

        conn.execute('UPDATE tbl_carros SET id_marca = ? , nome = ? WHERE id = ?;', [req.body.id_marca,req.body.nome, req.params.id], function (err, response, fields) {

            if (err) throw err;

            res.status(200).json({
                msg: 'Carro atualizado com sucesso!',
                data: response
            });
        });

    } catch (error) {

        res.status(500).json({
            msg: 'Erro ao atualizar carro!',
            data: error
        });
    }
});

router.delete('/excluir/:id', function (req, res) {

    try {

        conn.execute('DELETE FROM tbl_carros WHERE id = ?;', [req.params.id], function (err, response, fields) {

            if (err) throw err;

            res.status(200).json({
                msg: 'Carro excluído com sucesso!',
                data: response
            });
        });

    } catch (error) {

        res.status(500).json({
            msg: 'Erro ao excluir carro!',
            data: error
        });
    }
});


module.exports = router;
