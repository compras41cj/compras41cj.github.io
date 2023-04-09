import {
    getAuth,
    getFirestore
  } from "../import/base.js";
  import {
    getString,
    muestraError
  } from "../import/util.js";
  import {
    muestraCompras
  } from "./navegacion.js";
  import {
    tieneRol
  } from "./seguridad.js";
  
  const daoCompra =
    getFirestore().
      collection("Compra");
  /** @type {HTMLFormElement} */
  const forma = document["forma"];
  getAuth().onAuthStateChanged(
    protege, muestraError);
  
  /** @param {import(
      "../lib/tiposFire.js").User}
      usuario */
  async function protege(usuario) {
    if (tieneRol(usuario,
      ["Administrador"])) {
      forma.addEventListener(
        "submit", guarda);
    }
  }
  
  /** @param {Event} evt */
  async function guarda(evt) {
    try {
      evt.preventDefault();
      const formData =
        new FormData(forma);
      const codigo = getString(
          formData, "codigo").trim();  
      const nombre = getString(formData, "nombre").trim();
      const precio = getString(formData, "precio").trim();
      const categoria = getString(formData, "categoria").trim();
      const fecha = getString(formData, "fecha").trim();
      /**
       * @type {
          import("./tipos.js").
                  Compra} */
      const modelo = {
        codigo,
        nombre,
        precio,
        categoria,
        fecha 
      };
      await daoCompra.
        add(modelo);
      muestraCompras();
    } catch (e) {
      muestraError(e);
    }
  }
  
  