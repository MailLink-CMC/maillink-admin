import React, { useMemo } from 'react';
// material
import { Card } from '@mui/material';
// components
import Page from '../../components/Page';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DoneIcon from '@mui/icons-material/Done';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

import Iconify from 'src/components/Iconify';
import { useNavigate } from 'react-router-dom';
import { reactQueryKeys } from 'src/utils/constants';
import { getRegisterList, postRegisterResult } from 'src/api/register';
import { useQuery } from 'react-query';
import Category from 'src/utils/categorys';
// ----------------------------------------------------------------------

const columns = [
  {
    field: 'status',
    headerName: '상태',
    width: 200,
    valueGetter: (item) => {
      return Category.registerStatus[item.value];
    },
  },
  { field: 'nickName', headerName: '이름', width: 200 },
  { field: 'receiveMail', headerName: '이메일', width: 300 },
];
export default function RegisterWriter() {
  const { data, isLoading } = useQuery(reactQueryKeys.GET_REGISTER_LIST, getRegisterList);
  const navigate = useNavigate();

  const registerList = useMemo(() => {
    return data?.map((item) => ({
      id: item.writerRegistrationEntity.id,
      uid: item.writerRegistrationEntity.uid,
      introduce: item.writerRegistrationEntity.introduce,
      nickName: item.nickName,
      status: item.writerRegistrationEntity.status,
      receiveMail: item.writerRegistrationEntity.receiveMail,
      vive: [
        item.writerRegistrationEntity?.mood1,
        item.writerRegistrationEntity?.mood2,
        item.writerRegistrationEntity?.mood3,
      ],
      branch: [
        item.writerRegistrationEntity?.genre1,
        item.writerRegistrationEntity?.genre2,
        item.writerRegistrationEntity?.genre3,
      ],
      websites: {
        facebook: item.writerRegistrationEntity.faceBook,
        twitter: item.writerRegistrationEntity.twitter,
        intagram: item.writerRegistrationEntity.intagram,
        etc: item.writerRegistrationEntity.etcLink,
      },
    }));
  }, [data]);

  const onEnterClick = (row) => {
    navigate('/dashboard/register/detail', { state: { data: row } });
  };

  const onApproveClick = async (e) => {
    if (window.confirm('허가하시겠습니까?')) {
      try {
        await postRegisterResult(e?.id, true);
        window.alert('허가되었습니다.');
      } catch (e) {
        window.alert('허가가 실패했습니다. 계속될 시 관리자에게 문의하세요');
      }
    }
  };
  const onRejectClick = async (e) => {
    if (window.confirm('정말로 거절하시겠습니까?')) {
      try {
        await postRegisterResult(e?.id, false);
        window.alert('거절되었습니다.');
      } catch (e) {
        window.alert('거절이 실패했습니다. 계속될 시 관리자에게 문의하세요');
      }
    }
  };

  return (
    <Card sx={{ width: '100%', height: '100%', marginTop: 4 }}>
      <DataGrid
        rows={registerList || []}
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
                  label="허가"
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
