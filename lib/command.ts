export function openCommandMenu() {
  window.dispatchEvent(
    new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
    })
  );
}