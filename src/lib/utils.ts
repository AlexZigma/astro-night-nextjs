export function numberToRating(rating: number) {
  return rating.toFixed(1).toString().replace(".", ",");
}

export const imgToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      resolve(base64);
    };
    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return "An unexpected error occurred";
};
