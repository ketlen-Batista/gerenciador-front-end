import { api } from '@src/lib/axios';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDate = ({
  dateTime,
  formatType = '',
  capitalize = false,
}: {
  dateTime: number;
  formatType?: string;
  capitalize?: boolean;
}) => {
  const value = format(new Date(dateTime), formatType, { locale: ptBR });

  if (!capitalize) return value;

  return value.charAt(0).toUpperCase() + value.slice(1);
};

// export function getImageUrlServer(idPhoto: number) {
//   return `${api.defaults.baseURL}/photos/serve/${idPhoto}`;
// }

export async function getImageUrlServer(idPhoto: number) {
  try {
    const { data } = await api.get(`/photosUrl/${idPhoto}`); // Buscar a URL do banco de dados
    console.log('URL-PHOTO-AGORA', data);
    if (data?.url) {
      return data.url; // Retornar a URL do Cloudflare R2
    }
  } catch (error) {
    console.error(`Erro ao obter URL da foto com IDssss ${idPhoto}:`, error);
  }
}

export async function getPdfUrlServer(idPhoto: number) {
  try {
    const { data } = await api.get(`/documents/get/url/id/${idPhoto}`); // Buscar a URL do banco de dados
    console.log('PDF-PHOTO-AGORA', data);
    if (data?.url) {
      return data.url; // Retornar a URL do Cloudflare R2
    }
  } catch (error) {
    console.error(`Erro ao obter URL da foto com IDssss ${idPhoto}:`, error);
  }
}

// export function getPdfUrlServer(idPdf: number) {
//   return `${api.defaults.baseURL}/documents/serve/${idPdf}`;
// }

export function formatDateToCustomString(date) {
  // Obtenha os componentes da data
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const dayName = dayNames[date.getDay()];
  const monthName = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const timeZone = date.toTimeString().split(' ')[1]; // Obtém o fuso horário, e.g., "GMT-0300"

  // Formate a data
  return `${dayName} ${monthName} ${day < 10 ? '0' + day : day} ${year} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds} ${timeZone}`;
}

export function addHoursToTime(time, hoursToAdd) {
  // Converte o tempo para um objeto Date usando uma referência qualquer (1970-01-01)
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date(1970, 0, 1, hours, minutes);

  // Soma as horas
  date.setHours(date.getHours() + hoursToAdd);

  // Formata o horário de volta para "HH:mm"
  return date.toTimeString().slice(0, 5);
}
