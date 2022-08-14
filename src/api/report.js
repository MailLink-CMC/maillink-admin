import axios from 'axios';
import { Address } from './constants';

export async function getEveryMessageReport() {
  const res = await axios.get(`${Address}/api/v1/report/messages`);
  return res.data.data;
}

export async function putMessageReport(id, status) {
  const res = await axios.put(`${Address}/api/v1/report/messages`, {
    id: id,
    status: status,
  });
  return res.data.data;
}

export async function getEveryMailReport() {
  const res = await axios.get(`${Address}/api/v1/report/mails`);
  return res.data.data;
}

export async function putMailReport(id, status) {
  const res = await axios.put(`${Address}/api/v1/report/mails`, {
    id: id,
    status: status,
  });
  return res.data.data;
}

export async function getReportedCountByUserId(id) {
  const res = await axios.get(`${Address}/api/v1/report/users/${id}`);
  return res.data.data;
}
