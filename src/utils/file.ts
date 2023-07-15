import fs from 'fs';

export const deleteFile = async (filename: string) => {
  try {
    // verifica se o arquivo existe
    await fs.promises.stat(filename);
  } catch {
    return;
  }
  // se existe remove o arquivo
  await fs.promises.unlink(filename);
};
