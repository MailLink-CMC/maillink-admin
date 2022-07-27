import React from 'react';
// components
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

import Iconify from 'src/components/Iconify';
import { useNavigate } from 'react-router-dom';
import Category from 'src/utils/categorys';
// ----------------------------------------------------------------------
const rows = [
  {
    id: 1,
    status: '처리전',
    name: '산들',
    who: '군대리아',
    category: ['commercial', 'ero', 'etc'],
    content: '얘 당장 밴하셈',
    countes: 9,
  },
  {
    id: 2,
    status: '처리전',
    name: '산들',
    who: '군대리아',
    category: ['commercial', 'ero', 'etc'],
    content: '얘 당장 밴하셈',
    countes: 9,
  },
  {
    id: 3,
    status: '처리끝',
    name: '산들',
    who: '군대리아',
    category: ['commercial', 'ero', 'etc'],
    content: '얘 당장 밴하셈',
    countes: 9,
  },
];
const columns = [
  { field: 'status', headerName: '상태', width: 100 },
  { field: 'name', headerName: '신고자', width: 100 },
  { field: 'who', headerName: '피신고자', width: 100 },
  {
    field: 'category',
    headerName: '종류',
    width: 300,
    valueGetter: ({ value }) => {
      return value.map((item) => Category.reportShortCategoryByName[item]).join(', ');
    },
  },
  { field: 'countes', headerName: '횟수', width: 100 },
];
export default function ReportList() {
  const navigate = useNavigate();

  const onEnterClick = (row) => {
    navigate('/dashboard/report/detail', { state: { data: row } });
  };

  return (
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
            ];
          },
        },
      ]}
    />
  );
}
