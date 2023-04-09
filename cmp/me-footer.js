class MiFooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
        &copy; 2023
        De La Cruz De Paul Carlo Josue.
      </p>`;
  }
}

customElements.define(
  "me-footer", MiFooter);
