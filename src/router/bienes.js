const { Router } = require('express');
const router = Router();
const _ = require('underscore');

const bienes = require('../data.json');


router.get('/', (req, res) => {
  console.log(req.query);

  let prm_advancedQuery = req.query.advanced || false;
  let prm_ciudad = req.query.ciudad || '';
  let prm_tipo = req.query.tipo || '';
  let prm_pMin = req.query.pMin || '';
  let prm_pMax = req.query.pMax || '';

  console.log(`adv: ${prm_advancedQuery} -- cd: '${prm_ciudad}' -- Tipo: '${prm_tipo}' -- Min: ${prm_pMin} -- Max: ${prm_pMax}`);


  if(!prm_advancedQuery) {
    res.json(bienes);
  } else {
    //búsqueda avanzada
    let filtrado = [];
    let agregar = true;

    _.each(bienes, (item, i) => {
        agregar = true;


        if ((prm_ciudad && item.Ciudad != prm_ciudad)
            || (prm_tipo && item.Tipo != prm_tipo)
            || (Number(item.Precio.replace(/[^0-9.-]+/g,"")) < prm_pMin)
            || (Number(item.Precio.replace(/[^0-9.-]+/g,"")) > prm_pMax)) {
          agregar = false;
        }

        if(agregar){
          filtrado.push(item);
        }
      });

    res.json(filtrado);
  }
});


router.get('/ciudades', (req, res) => {
  let listado = [];

  for(var k in bienes) {
    if (!listado.some(item => item.Ciudad === bienes[k].Ciudad)) {
      let newCiudad = {"Ciudad": bienes[k].Ciudad};
      listado.push(newCiudad);
    }
  }
  res.json(listado);
});


router.get('/tipos', (req, res) => {
  let listado = [];

  for(var k in bienes) {
    if (!listado.some(item => item.Tipo === bienes[k].Tipo)) {
      let newTipo = {"Tipo": bienes[k].Tipo};
      listado.push(newTipo);
    }
  }
  res.json(listado);
});

module.exports = router;
