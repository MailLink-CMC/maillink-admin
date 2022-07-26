// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: '홈',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: '오늘의 추천작가',
    path: '/dashboard/recommand',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: '작가 신청',
    path: '/dashboard/register',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: '신고 접수',
    path: '/dashboard/report',
    icon: getIcon('eva:file-text-fill'),
  },
];

export default navConfig;
