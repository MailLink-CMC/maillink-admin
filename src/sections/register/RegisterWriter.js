import React from 'react';
// material
import { Card } from '@mui/material';
// components
import Page from '../../components/Page';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DoneIcon from '@mui/icons-material/Done';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

import Iconify from 'src/components/Iconify';
import { useNavigate } from 'react-router-dom';
// ----------------------------------------------------------------------
const rows = [
  { id: 1, status: 'Hello', name: 'World', email: 'gpfqpsxj75@naver.com' },
  { id: 2, status: 'DataGridPro', name: 'is Awesome', email: 'gpfqpsxj75@naver.com' },
  { id: 3, status: 'MUI', name: 'is Amazing', email: 'gpfqpsxj75@naver.com' },
];
const columns = [
  { field: 'status', headerName: '상태', width: 100 },
  { field: 'name', headerName: '이름', width: 150 },
  { field: 'email', headerName: '이메일', width: 300 },
];
export default function RegisterWriter() {
  const navigate = useNavigate();

  const onEnterClick = (row) => {
    navigate('/dashboard/register/detail', { replace: true, state: { data: row } });
  };

  const onApproveClick = (e) => {
    if (window.confirm('승인하시겠습니까?')) {
      console.log(e);
    }
  };
  const onRejectClick = (e) => {
    if (window.confirm('정말로 거절하시겠습니까?')) {
      console.log(e);
    }
  };

  return (
    <Card sx={{ width: '100%', height: '100%', marginTop: 4 }}>
      <DataGrid
        rows={rows}
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
                <GridActionsCellItem
                  icon={<DoneIcon />}
                  onClick={() => onApproveClick(params.row)}
                  label="승인"
                  showInMenu
                />,
                <GridActionsCellItem
                  icon={<ThumbDownOffAltIcon />}
                  onClick={() => onRejectClick(params.row)}
                  label="거절"
                  showInMenu
                />,
              ];
            },
          },
        ]}
      />
    </Card>
  );
}
