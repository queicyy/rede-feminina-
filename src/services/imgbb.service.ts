const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
const IMGBB_UPLOAD_URL = "https://api.imgbb.com/1/upload";

const MAX_WIDTH = 1280;
const JPEG_QUALITY = 0.75;

function compressImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      const scale = Math.min(1, MAX_WIDTH / img.width);
      const targetWidth = img.width * scale;
      const targetHeight = img.height * scale;

      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Não foi possível processar a imagem"));
        return;
      }
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Falha ao comprimir imagem"));
        },
        "image/jpeg",
        JPEG_QUALITY
      );
    };

    img.onerror = () => reject(new Error("Falha ao carregar imagem"));
    reader.onerror = () => reject(new Error("Falha ao ler arquivo"));

    reader.readAsDataURL(file);
  });
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export const imgbbService = {
  uploadImage: async (file: File): Promise<string> => {
    if (!IMGBB_API_KEY) {
      throw new Error("Chave da API do ImgBB não configurada");
    }

    const compressedBlob = await compressImage(file);
    const base64Image = await blobToBase64(compressedBlob);

    const formData = new FormData();
    formData.append("key", IMGBB_API_KEY);
    formData.append("image", base64Image);

    const response = await fetch(IMGBB_UPLOAD_URL, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error("Falha ao enviar imagem para o ImgBB");
    }

    return result.data.url as string;
  },
};