// src/components/Products.js
// Lista unificada com id, descricao, image(require) e price

// IMPORTS DE IMAGEM (um lugar só, sem erro de nome)
import caderno from "./assets/cadernoRealMadrid.png";
import caderno2 from "./assets/cadernoDivertidamente.png";
import caderno3 from "./assets/cadernoMickey.png";
import caderno4 from "./assets/cadernoPets.png";
import caderno5 from "./assets/cadernoPooh.png";
import caderno6 from "./assets/cadernoLilas.png";
import caderno7 from "./assets/cadernoVerde.png";
import caderno8 from "./assets/cadernoSmartHelloComAromaDemorango.png";

import tidisco from "./assets/tilidisco10MatAcademie.png";
import tidisco2 from "./assets/tilidisco10MatSohoTilibra.jpg";
import tidisco3 from "./assets/tilidisco10matAbacute.jpg";
import tidisco4 from "./assets/tilidisco10matHappy.jpg";
import tidisco5 from "./assets/tilidisco10matLoveland.jpg";
import tidisco6 from "./assets/tilidiscoMatHappy.png";
import fichario from "./assets/ficharioRealMadrid.jpg";

import lapis from "./assets/lapisAcrilex12.png";
import lapis2 from "./assets/lapisAcrilex24.png";
import lapis3 from "./assets/lapisAcrilex36.png";
import lapis4 from "./assets/lapisDeCor12.png";
import lapis5 from "./assets/lapisDeCor24.png";
import lapis19 from "./assets/lapisDeCorTris36.png";
import lapis6 from "./assets/lapisDeCorCarbon12.png";
import lapis7 from "./assets/lapisDeCorCarbon50.png";
import lapis8 from "./assets/lapisDeCorFaber12.png";
import lapis9 from "./assets/lapisDeCorFaberSupersoft100.png";
import lapis10 from "./assets/lapisFaber12Supersoft.png";
import lapis11 from "./assets/lapisFaber12SupersoftNeonPastel.png";
import lapis12 from "./assets/lapisFaber24Cores.png";
import lapis13 from "./assets/lapisDeCorMulticolor12.png";
import lapis14 from "./assets/lapisDeCorMulticolor24.png";
import lapis15 from "./assets/lapisDeCorMulticolor36.png";
import lapis16 from "./assets/lapisDeCorNormal12.png";
import lapis17 from "./assets/lapisDeCorNormal36.png";
import lapis18 from "./assets/lapisDeCorNormalPremium15.png";

import caneta from "./assets/canetaVarinhaHarry.png";
import furadera from "./assets/furadera.png";

const PRODUCTS = [
  {
    id: 1,
    descricao: "Caderno smart DaC Real Madrid",
    image: caderno,
    price: 76.9,
  },
  {
    id: 2,
    descricao: "Caderno smart DaC Divertidamente",
    image: caderno2,
    price: 71.9,
  },
  {
    id: 3,
    descricao: "Caderno smart DaC Mickey",
    image: caderno3,
    price: 76.9,
  },
  {
    id: 4,
    descricao: "Caderno smart DaC Pets",
    image: caderno4,
    price: 65.9,
  },
  {
    id: 5,
    descricao: "Caderno smart DaC Pooh",
    image: caderno5,
    price: 65.9,
  },
  {
    id: 6,
    descricao: "Caderno Smart Breeze Lilás",
    image: caderno6,
    price: 58.9,
  },
  {
    id: 7,
    descricao: "Caderno Smart Breeze Verde",
    image: caderno7,
    price: 58.9,
  },
  {
    id: 8,
    descricao: "Caderno Smart Hello com aroma de morango",
    image: caderno8,
    price: 56.9,
  },
  {
    id: 10,
    descricao: "Tilidisco 10 matérias Academie",
    image: tidisco,
    price: 136.9,
  },
  {
    id: 11,
    descricao: "Tilidisco 10 matérias Soho Tilibra",
    image: tidisco2,
    price: 136.9,
  },
  {
    id: 12,
    descricao: "Tilidisco 10 matérias Abacute",
    image: tidisco3,
    price: 136.9,
  },
  {
    id: 13,
    descricao: "Tilidisco 10 matérias Happy",
    image: tidisco4,
    price: 136.9,
  },
  {
    id: 14,
    descricao: "Tilidisco 10 matérias Loveland",
    image: tidisco5,
    price: 139.9,
  },
  {
    id: 15,
    descricao: "Tilidisco 1 matéria Happy",
    image: tidisco6,
    price: 81.9,
  },
  {
    id: 16,
    descricao: "Fichário Zoper Real Madrid",
    image: fichario,
    price: 148.9,
  },
  {
    id: 17,
    descricao: "Lápis Acrilex 12 cores",
    image: lapis,
    price: 8.9,
  },
  {
    id: 18,
    descricao: "Lápis Acrilex 24 cores",
    image: lapis2,
    price: 16.9,
  },
  {
    id: 19,
    descricao: "Lápis Acrilex 36 cores",
    image: lapis3,
    price: 25.9,
  },
  {
    id: 20,
    descricao: "Lápis de cor Tris 12 cores",
    image: lapis4,
    price: 9.9,
  },
  {
    id: 21,
    descricao: "Lápis de cor Tris 24 cores",
    image: lapis5,
    price: 21.9,
  },
  {
    id: 22,
    descricao: "Lápis de cor Tris 36 cores",
    image: lapis19,
    price: 48.9,
  },
  {
    id: 23,
    descricao: "Lápis de cor Carbon 12 cores",
    image: lapis6,
    price: 18.9,
  },
  {
    id: 24,
    descricao: "Lápis de cor Carbon 50 cores",
    image: lapis7,
    price: 77.9,
  },
  {
    id: 25,
    descricao: "Lápis Faber Supersoft Neon + Pastel 12 cores",
    image: lapis11,
    price: 31.9,
  },
  {
    id: 26,
    descricao: "Lápis Faber Supersoft 12 cores",
    image: lapis10,
    price: 31.9,
  },
  {
    id: 27,
    descricao: "Lápis Faber Supersoft 100 cores",
    image: lapis9,
    price: 284.9,
  },
  {
    id: 28,
    descricao: "Lápis Faber 12 cores",
    image: lapis8,
    price: 19.9,
  },
  {
    id: 29,
    descricao: "Lápis Faber 24 cores",
    image: lapis12,
    price: 39.9,
  },
  {
    id: 30,
    descricao: "Lápis Multicolor 12 cores",
    image: lapis13,
    price: 8.9,
  },
  {
    id: 31,
    descricao: "Lápis Multicolor 24 cores",
    image: lapis14,
    price: 18.9,
  },
  {
    id: 32,
    descricao: "Lápis Multicolor 36 cores",
    image: lapis15,
    price: 28.9,
  },
  {
    id: 33,
    descricao: "Lápis Norma 12 cores",
    image: lapis16,
    price: 23.9,
  },
  {
    id: 34,
    descricao: "Lápis Norma Premium 15 cores",
    image: lapis18,
    price: 33.9,
  },
  {
    id: 35,
    descricao: "Lápis Norma 36 cores",
    image: lapis17,
    price: 45.9,
  },
  {
    id: 36,
    descricao: "Caneta varinha Harry Potter",
    image: caneta,
    price: 26.9,
  },
  {
    id: 38,
    descricao: "Aplicador Tag Yins Paper",
    image: furadera,
    price: 28.9,
  },
];

export default PRODUCTS;
