export function downloadBlob(blob: Blob, filename: string) {
  if (typeof window !== "undefined" && "msSaveOrOpenBlob" in navigator) {
    (navigator as Navigator & { msSaveOrOpenBlob?: (file: Blob, defaultName?: string) => boolean }).msSaveOrOpenBlob?.(
      blob,
      filename,
    );
    return;
  }

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noopener";
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));

  window.setTimeout(() => {
    anchor.remove();
    URL.revokeObjectURL(url);
  }, 1000);
}
