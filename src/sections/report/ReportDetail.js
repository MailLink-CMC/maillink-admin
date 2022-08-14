import React, { useState } from 'react';
// material
import { Button, Chip, Divider, Paper, Snackbar, Stack, Typography } from '@mui/material';
// components
import { useLocation, useNavigate } from 'react-router-dom';
import Category from 'src/utils/categorys';

import { useEffect } from 'react';
import { getReportedCountByUserId, putMailReport, putMessageReport } from '../../api/report';
// ----------------------------------------------------------------------

const sectionStyle = {
  width: '100%',
  padding: '0.5rem 1rem',
};

const DividerComponent = () => <Divider orientation="horizontal" flexItem />;

export default function ReportDetail() {
  const { state } = useLocation();
  const [data, setData] = useState();
  const [repotedCounts, setReportedCounts] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const getReportedCount = async (id) => {
      try {
        const res = await getReportedCountByUserId(id);
        setReportedCounts(res);
      } catch (e) {
        setSnackbarOpen(true);
        setSnackbarMessage('신고 횟수 조회에 실패했습니다.');
      }
    };
    if (state === undefined || state === null || state.data === undefined || state.data === null) {
      navigate('/dashboard/report');
    } else {
      setData(state.data);
      getReportedCount(state.data.targetId);
    }
  }, [state]);

  const onClickStatusChange = async (status) => {
    try {
      if (data?.platform === 'MAIL') {
        await putMailReport(data?.id, status);
      } else if (data?.plarform === 'MESSAGE') {
        await putMessageReport(data?.id, status);
      }
    } catch (e) {
      setSnackbarOpen(true);
      setSnackbarMessage('신고 상태 변경에 실패했습니다.');
    }
  };

  return (
    <Paper elevation={3} sx={{ width: '100%', height: '100%', marginTop: 2 }}>
      <Stack spacing={2} divider={<DividerComponent />}>
        <Stack spacing={2} sx={sectionStyle}>
          <Typography variant="h5">1. 신고자</Typography>
          <Typography variant="span">{data?.name}</Typography>
        </Stack>

        <Stack spacing={2} sx={sectionStyle}>
          <Typography variant="h5">2. 피신고자(신고 된 횟수:{repotedCounts})</Typography>
          <Typography variant="span">{data?.who}</Typography>
        </Stack>

        <Stack spacing={2} sx={sectionStyle}>
          <Typography variant="h5">3. {data && Category.reportPlatform[data?.platform]} 신고 사유</Typography>
          <Stack spacing={2}>
            {data?.category?.map((item) => {
              const category = Category.reportCategoryByName[item];
              return <Chip key={category} label={category} />;
            })}
          </Stack>
        </Stack>
        <Stack spacing={2} sx={sectionStyle}>
          <Typography variant="h5">4. 신고 내용</Typography>
          <Typography variant="span">{data?.othersDetail}</Typography>
        </Stack>
        <Stack spacing={2} sx={sectionStyle}>
          <Typography variant="h5">5. 신고 상태 변경 (현재 : {data && Category.reportStatus[data?.status]})</Typography>
          <Stack direction="row" spacing={4}>
            {['WAIT', 'PROCESS', 'COMPLETE'].map((item) => {
              if (item !== data?.status) {
                return (
                  <Button
                    key={item}
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => onClickStatusChange(item)}
                  >
                    {Category.reportStatus[item]}
                  </Button>
                );
              } else {
                return <></>;
              }
            })}
          </Stack>
        </Stack>
      </Stack>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={7000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Paper>
  );
}
