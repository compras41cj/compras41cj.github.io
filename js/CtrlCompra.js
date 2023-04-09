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
  const params =
    new URL(location.href).
      searchParams;
  const id = params.get("id");
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
      busca();
    }
  }
  
  /** Busca y muestra los datos que
   * corresponden al id recibido. */
  async function busca() {
    try {
      const doc =
        await daoCompra.
          doc(id).
          get();
      if (doc.exists) {
        /**
         * @type {
            import("./tipos.js").
                    Compra} */
        const data = doc.data();
        forma.codigo.value = data.codigo;
        forma.nombre.value = data.nombre || "";
        forma.precio.value = data.precio || "";
        forma.categoria.value = data.categoria || "";
        forma.fecha.value = data.fecha || "";
        forma.addEventListener(
          "submit", guarda);
        forma.eliminar.
          addEventListener(
            "click", elimina);
      } else {
        throw new Error(
          "No se encontró.");
      }
    } catch (e) {
      muestraError(e);
      muestraCompras();
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
                  Alumno} */
      const modelo = {
        codigo, 
        nombre,
        precio,
        categoria,
        fecha
      };
      await daoCompra.
        doc(id).
        set(modelo);
      muestraCompras();
    } catch (e) {
      muestraError(e);
    }
  }
  
  async function elimina() {
    try {
      if (confirm("Confirmar la " +
        "eliminación")) {
        await daoCompra.
          doc(id).
          delete();
        muestraCompras();
      }
    } catch (e) {
      muestraError(e);
    }
  }
  
  