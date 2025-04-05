import { api } from '@src/lib/axios';

import * as DTO from './dto';

// Upload de foto
export async function uploadPhoto(photoFile: FormData) {
  try {
    const { data } = await api.post('/photos/upload', photoFile, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  } catch (error) {
    console.error('Erro ao fazer upload da foto:', error);
    throw error;
  }
}

// Atualizar foto
export async function updatePhoto(photoId: number, photoFile: File) {
  try {
    const formData = new FormData();
    formData.append('photoFile', photoFile);

    const { data } = await api.put(`/photos/${photoId}/update`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  } catch (error) {
    console.error(`Erro ao atualizar a foto com ID ${photoId}:`, error);
    throw error;
  }
}

// Deletar foto
export async function deletePhoto(photoId: number) {
  try {
    await api.delete(`/photos/${photoId}/delete`);
  } catch (error) {
    console.error(`Erro ao deletar a foto com ID ${photoId}:`, error);
    throw error;
  }
}

// Obter foto por ID
export async function getPhotoById(photoId: number) {
  try {
    const { data } = await api.get(`/photos/${photoId}`);
    return data;
  } catch (error) {
    console.error(`Erro ao obter a foto com ID ${photoId}:`, error);
    throw error;
  }
}

// Listar fotos
export async function listPhotos() {
  try {
    const { data } = await api.get('/listPhotos');
    return data;
  } catch (error) {
    console.error('Erro ao listar fotos:', error);
    throw error;
  }
}

// Obter URL da foto por ID
export async function getPhotoByIdUrl(photoId: number) {
  try {
    const { data } = await api.get(`/photosUrl/${photoId}`);
    return data;
  } catch (error) {
    console.error(`Erro ao obter URL da foto com ID ${photoId}:`, error);
    throw error;
  }
}

// Servir foto por ID
export async function servePhotoById(photoId: number) {
  try {
    const { data } = await api.get(`/photos/serve/${photoId}`);
    return data;
  } catch (error) {
    console.error(`Erro ao servir a foto com ID ${photoId}:`, error);
    throw error;
  }
}
