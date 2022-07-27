import React, { useState } from 'react';
// material
import { Chip, Divider, Paper, Stack, Typography } from '@mui/material';
// components
import { useLocation, useNavigate } from 'react-router-dom';
import Category from 'src/utils/categorys';

import { useEffect } from 'react';
// ----------------------------------------------------------------------

const sectionStyle = {
  width: '100%',
  padding: '0.5rem 1rem',
};

const DividerComponent = () => <Divider orientation="horizontal" flexItem />;

export default function ReportDetail() {
  const { state } = useLocation();
  const [data, setData] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (state === undefined || state === null || state.data === undefined || state.data === null) {
      navigate('/dashboard/report');
    } else {
      setData(state.data);
    }
  }, [state]);

  return (
    <Paper elevation={3} sx={{ width: '100%', height: '100%', marginTop: 2 }}>
      <Stack spacing={2} divider={<DividerComponent />}>
        <Stack spacing={2} sx={sectionStyle}>
          <Typography variant="h5">1. 신고자</Typography>
          <Typography variant="span">{data?.name}</Typography>
        </Stack>

        <Stack spacing={2} sx={sectionStyle}>
          <Typography variant="h5">2. 피신고자</Typography>
          <Typography variant="span">
            {data?.who}(신고횟수:{data?.countes})
          </Typography>
        </Stack>

        <Stack spacing={2} sx={sectionStyle}>
          <Typography variant="h5">3. 신고 종류</Typography>
          <Stack spacing={2}>
            {data?.category?.map((item) => {
              const category = Category.reportCategoryByName[item];
              return <Chip key={category} label={category} />;
            })}
          </Stack>
        </Stack>
        <Stack spacing={2} sx={sectionStyle}>
          <Typography variant="h5">4. 신고 내용</Typography>
          <Typography variant="span">{data?.content}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
