export function render(page) {
  const app = document.getElementById("app");
  app.innerHTML = page();
  
}
