import React, { useState } from 'react';
// material
import { Box, Button, Card, Chip, Divider, Paper, Stack, Typography } from '@mui/material';
// components
import { useLocation, useNavigate } from 'react-router-dom';
import Category from 'src/utils/categorys';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkIcon from '@mui/icons-material/Link';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { getRegisterPost, postRegisterResult } from 'src/api/register';
import { reactQueryKeys } from 'src/utils/constants';
// ----------------------------------------------------------------------

const sectionStyle = {
  width: '100%',
  padding: '0.5rem 1rem',
};

const DividerComponent = () => <Divider orientation="horizontal" flexItem />;

export default function RegisterWriterDetail() {
  const { state } = useLocation();
  const [data, setData] = useState();
  const [pageNum, setPageNum] = useState(0);
  const { data: registerPosts, isLoading } = useQuery(
    [reactQueryKeys.GET_REGISTER_POST, state?.data?.id],
    () => getRegisterPost(state?.data?.id),
    {
      enabled: state?.data?.id !== undefined,
    }
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (state === undefined || state === null || state.data === undefined || state.data === null) {
      navigate('/dashboard/register');
    } else {
      setData(state.data);
    }
  }, [state]);

  const onClickPageChange = (to) => {
    setPageNum(to);
  };

  const onClickApprove = async () => {
    if (window.confirm('허가하시겠습니까?')) {
      try {
        await postRegisterResult(data?.id, true);
        window.alert('허가되었습니다.');
        navigate(-1);
      } catch (e) {
        window.alert('허가가 실패했습니다. 계속될 시 관리자에게 문의하세요');
      }
    }
  };
  const onClickReject = async () => {
    if (window.confirm('정말로 거절하시겠습니까?')) {
      try {
        await postRegisterResult(data?.id, false);
        window.alert('거절되었습니다.');
        navigate(-1);
      } catch (e) {
        window.alert('거절이 실패했습니다. 계속될 시 관리자에게 문의하세요');
      }
    }
  };

  return (
    <Paper elevation={3} sx={{ width: '100%', height: '100%', marginTop: 2 }}>
      {pageNum === 0 ? (
        <Stack spacing={2} divider={<DividerComponent />}>
          <Stack spacing={2} sx={sectionStyle}>
            <Typography variant="h5">1. 작가이름</Typography>
            <Typography variant="span">{data?.nickName}</Typography>
          </Stack>

          <Stack spacing={2} sx={sectionStyle}>
            <Typography variant="h5">2. 작가소개</Typography>
            <Typography variant="span">{data?.introduce}</Typography>
          </Stack>

          <Stack spacing={2} sx={sectionStyle}>
            <Typography variant="h5">3. 글관심사</Typography>
            <Stack spacing={2} direction="row" alignItems="center">
              <Typography variant="span">갈래</Typography>
              {data?.branch
                ?.filter((item) => item !== null)
                .map((item) => {
                  const category = Category.branchCategoryByName[item];
                  return (
                    <Chip
                      key={category}
                      label={category}
                      sx={{
                        backgroundColor: Category.colorCategory[category]?.back,
                        color: Category.colorCategory[category]?.font,
                      }}
                    />
                  );
                })}
            </Stack>
            <Stack spacing={2} direction="row" alignItems="center">
              <Typography variant="span">분위기</Typography>
              {data?.vive
                ?.filter((item) => item !== null)
                .map((item) => {
                  const category = Category.viveCategoryByName[item];
                  return (
                    <Chip
                      key={category}
                      label={category}
                      sx={{
                        backgroundColor: Category.colorCategory[category]?.back,
                        color: Category.colorCategory[category]?.font,
                      }}
                    />
                  );
                })}
            </Stack>
          </Stack>

          <Stack spacing={2} sx={sectionStyle}>
            <Typography variant="h5">4. 웹사이트</Typography>
            <Stack spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
              <Stack spacing={2} direction="row">
                <FacebookIcon />
                <Box display="flex">
                  <Typography variant="span">facebook.com/</Typography>
                  <Typography variant="span">{data?.websites?.facebook}</Typography>
                </Box>
              </Stack>
              <Stack spacing={2} direction="row">
                <TwitterIcon />
                <Box display="flex">
                  <Typography variant="span">twitter.com/</Typography>
                  <Typography variant="span">{data?.websites?.twitter}</Typography>
                </Box>
              </Stack>
              <Stack spacing={2} direction="row">
                <InstagramIcon />
                <Box display="flex">
                  <Typography variant="span">instagram.com/</Typography>
                  <Typography variant="span">{data?.websites?.instagram}</Typography>
                </Box>
              </Stack>
              <Stack spacing={2} direction="row">
                <LinkIcon />
                <Box display="flex">
                  <Typography variant="span">{data?.websites?.etc}</Typography>
                </Box>
              </Stack>
            </Stack>
          </Stack>

          <Stack spacing={2} sx={sectionStyle}>
            <Typography variant="h5">5. 이메일</Typography>
            <Typography variant="span">{data?.receiveMail}</Typography>
          </Stack>

          <Stack spacing={2} direction="row" sx={sectionStyle} justifyContent="flex-end">
            <Button variant="contained" onClick={() => onClickPageChange(1)}>
              다음
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Stack spacing={2} divider={<DividerComponent />}>
          <Stack spacing={2} sx={sectionStyle} divider={<DividerComponent />}>
            {registerPosts?.map((item, idx) => {
              return (
                <Stack key={item.title + idx} spacing={2}>
                  <Typography variant="h6">{item.title ? item.title : '제목없음'}</Typography>
                  <Typography variant="span">{item.content ? item.content : '내용없음'}</Typography>
                </Stack>
              );
            })}
          </Stack>
          <Stack spacing={2} direction="row" sx={sectionStyle} justifyContent="space-between">
            <Button variant="contained" onClick={() => onClickPageChange(0)}>
              이전
            </Button>
            <Stack spacing={2} direction="row">
              <Button variant="outlined" onClick={onClickApprove}>
                허가하기
              </Button>
              <Button variant="outlined" color="error" onClick={onClickReject}>
                거절하기
              </Button>
            </Stack>
          </Stack>
        </Stack>
      )}
    </Paper>
  );
}
