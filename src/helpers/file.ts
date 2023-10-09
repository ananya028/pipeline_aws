export function readFile(onGetValue: (value: string | ArrayBuffer | null) => void, file: File) {
  const fr = new FileReader();
  fr.onload = () => {
    onGetValue(fr.result);
  };
  fr.readAsText(file);
}

export function createDownloadableFile(data: string, mimetype: string) {
  const downloadableFile = new Blob([data], { type: mimetype });
  const downloadUrl = URL.createObjectURL(downloadableFile);
  return downloadUrl;
}
