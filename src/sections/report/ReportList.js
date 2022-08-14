import React, { useEffect, useState } from 'react';
// components
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

import Iconify from 'src/components/Iconify';
import { useNavigate } from 'react-router-dom';
import Category from 'src/utils/categorys';
import { getEveryMailReport, getEveryMessageReport } from 'src/api/report';
import { Snackbar } from '@mui/material';
// ----------------------------------------------------------------------
const rows = [
  {
    id: 1,
    reporterId: 0,
    targetId: 3,
    platform: 'MAIL',
    status: 'WAIT',
    reporter: '산들',
    target: '군대리아',
    category: ['ADVERTISEMENT', 'ero', 'etc'],
    othersDetail: '얘 당장 밴하셈',
    date: '2020-01-01',
  },
  {
    id: 2,
    reporterId: 0,
    targetId: 4,
    platform: 'MAIL',
    status: 'PROCESS',
    reporter: '산들',
    target: '군대리아',
    category: ['ADVERTISEMENT', 'ero', 'etc'],
    othersDetail: '얘 당장 밴하셈',
    date: '2020-01-01',
  },
  {
    id: 3,
    reporterId: 0,
    targetId: 5,
    platform: 'MESSAGE',
    status: 'COMPLETE',
    reporter: '산들',
    target: '군대리아',
    category: ['ADVERTISEMENT', 'ero', 'etc'],
    othersDetail: '얘 당장 밴하셈',
    date: '2020-01-01',
  },
];
const columns = [
  { field: 'status', headerName: '상태', width: 100, valueGetter: ({ value }) => Category.reportStatus[value] },
  { field: 'reporter', headerName: '신고자', width: 100 },
  { field: 'target', headerName: '피신고자', width: 100 },
  { field: 'platform', headerName: '종류', width: 100, valueGetter: ({ value }) => Category.reportPlatform[value] },
  {
    field: 'category',
    headerName: '사유',
    width: 300,
    valueGetter: ({ value }) => {
      return value.map((item) => Category.reportShortCategoryByName[item]).join(', ');
    },
  },
  {
    field: 'date',
    headerName: '신고일',
    width: 100,
  },
];

export default function ReportList() {
  const navigate = useNavigate();
  const [reportDatas, setReportDatas] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const initReportDatas = async () => {
      let resMail = [],
        resMessage = [];
      try {
        resMail = await getEveryMailReport();
      } catch (e) {
        setSnackbarOpen(true);
        setSnackbarMessage('메일 신고 목록을 불러오는데 실패했습니다.');
      }
      try {
        resMessage = await getEveryMessageReport();
      } catch (e) {
        setSnackbarOpen(true);
        setSnackbarMessage('쪽지 신고 목록을 불러오는데 실패했습니다.');
      }
      resMailPromises = resMail?.map(async (item) => {
        // 유저 정보
        return { ...item, reporter: '산들', target: '군대리아' };
      });
      resMessagePromises = resMessage?.map(async (item) => {
        // 유저 정보
        return { ...item, reporter: '산들', target: '군대리아' };
      });
      const resMailDatas = await Promise.all(resMailPromises);
      const resMessageDatas = await Promise.all(resMessagePromises);
      setReportDatas([...resMailDatas, ...resMessageDatas].sort((a, b) => a.date - b.date));
    };
    initReportDatas();
  }, []);

  const onEnterClick = (row) => {
    navigate('/dashboard/report/detail', { state: { data: row } });
  };

  return (
    <>
      <DataGrid
        rows={reportDatas}
        columns={[
          ...columns,
          {
            field: 'actions',
            type: 'actions',
            width: 100,
            getActions: (params) => {
              return [
                <GridActionsCellItem
                  icon={<Iconify icon="eva:search-fill" />}
                  onClick={() => onEnterClick(params.row)}
                  label="보기"
                />,
              ];
            },
          },
        ]}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={7000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </>
  );
}
