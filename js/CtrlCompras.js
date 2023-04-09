import {
    getAuth,
    getFirestore
  } from "../import/base.js";
  import {
    cod,
    muestraError
  } from "../import/util.js";
  import {
    tieneRol
  } from "./seguridad.js";
  
  /** @type {HTMLUListElement} */
  const lista = document.
    querySelector("#lista");
  const daoCompra =
    getFirestore().
      collection("Compra");
  
  getAuth().
    onAuthStateChanged(
      protege, muestraError);
  
  /** @param {import(
      "../lib/tiposFire.js").User}
      usuario */
  async function protege(usuario) {
    if (tieneRol(usuario,
      ["Administrador"])) {
      consulta();
    }
  }
  
  function consulta() {
    daoCompra.
      orderBy("nombre")
      .onSnapshot(
        htmlLista, errConsulta);
  }
  
  /**
   * @param {import(
      "../lib/tiposFire.js").
      QuerySnapshot} snap */
  function htmlLista(snap) {
    let html = "";
    if (snap.size > 0) {
      snap.forEach(doc =>
        html += htmlFila(doc));
    } else {
      html += /* html */
        `<li class="vacio">
          -- No hay compras
          registradas. --
        </li>`;
    }
    lista.innerHTML = html;
  }
  
  /**
   * @param {import(
      "../lib/tiposFire.js").
      DocumentSnapshot} doc */
  function htmlFila(doc) {
    /**
     * @type {import("./tipos.js").
                    Compra} */
    const data = doc.data();
    const codigo = cod(data.codigo);
    const nombre = cod(data.nombre);
    var fsf= cod(data.fecha);
    var fecha = new Date(fsf);
    var espacio="[   -   ]";
    var dformat = [fecha.getDate()+1, fecha.getMonth()+1, fecha.getFullYear()].join('/');
    const parámetros =
      new URLSearchParams();
    parámetros.append("id", doc.id);
    return ( /* html */
      `<li>
        <a class="fila" href=
    "compra.html?${parámetros}">
          <strong class="primario">
            ${codigo} ${nombre} ${dformat}
          </strong>
        </a>
       
      </li>`);
  }
  
  /** @param {Error} e */
  function errConsulta(e) {
    muestraError(e);
    consulta();
  }
  
  