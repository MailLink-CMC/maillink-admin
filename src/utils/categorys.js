const branch = [
  {
    name: 'Poetry',
    category: '시',
    select: true,
    back: '#E8EBFF',
    font: '#0021C6',
    num: '#4562F1',
  },
  {
    name: 'Novels',
    category: '소설',
    select: true,
    back: '#E8EBFF',
    font: '#0021C6',
    num: '#4562F1',
  },
  {
    name: 'Essays',
    category: '에세이',
    select: true,
    back: '#E8EBFF',
    font: '#0021C6',
    num: '#4562F1',
  },
];
const branchCategoryByName = {
  Poetry: '시',
  Novels: '소설',
  Essays: '에세이',
};

const vive = [
  {
    name: 'Comfortable',
    category: '편안',
    select: true,
    back: '#E2FAE2',
    font: '#00402D',
    num: '#7FCE7F',
  },
  {
    name: 'Clear',
    category: '맑은',
    select: true,
    back: '#DDF9FF',
    font: '#002C36',
    num: '#6BD0E6',
  },
  {
    name: 'Lyrical',
    category: '서정',
    select: true,
    back: '#E6DDFF',
    font: '#1E0072',
    num: '#AE92FF',
  },
  {
    name: 'Calm',
    category: '잔잔',
    select: true,
    back: '#C5F0E3',
    font: '#00573D',
    num: '#5ECEAC',
  },
  {
    name: 'Light',
    category: '명랑',
    select: true,
    back: '#FFF2AD',
    font: '#5D4300',
    num: '#FFC839',
  },
  {
    name: 'Cheerful',
    category: '유쾌',
    select: true,
    back: '#FFDDDD',
    font: '#370000',
    num: '#FF8E8E',
  },
  {
    name: 'Sweet',
    category: '달달',
    select: true,
    back: '#FFE8FB',
    font: '#3E0035',
    num: '#FFACDE',
  },
  {
    name: 'Kitsch',
    category: '키치',
    select: true,
    back: '#FFE6B7',
    font: '#432C00',
    num: '#FFAD62',
  },
];
const viveCategoryByName = {
  Comfortable: '편안',
  Clear: '맑은',
  Lyrical: '서정',
  Calm: '잔잔',
  Light: '명랑',
  Cheerful: '유쾌',
  Sweet: '달달',
  Kitsch: '키치',
};

const colorCategory = {
  편안: {
    name: 'Comfortable',
    back: '#E2FAE2',
    font: '#00402D',
    num: '#7FCE7F',
  },
  맑은: { name: 'Clear', back: '#DDF9FF', font: '#002C36', num: '#6BD0E6' },
  서정: { name: 'Lyrical', back: '#E6DDFF', font: '#1E0072', num: '#AE92FF' },
  잔잔: { name: 'Calm', back: '#C5F0E3', font: '#00573D', num: '#5ECEAC' },
  명랑: { name: 'Light', back: '#FFF2AD', font: '#5D4300', num: '#FFC839' },
  유쾌: { name: 'Cheerful', back: '#FFDDDD', font: '#370000', num: '#FF8E8E' },
  달달: { name: 'Sweet', back: '#FFE8FB', font: '#3E0035', num: '#FFACDE' },
  키치: { name: 'Kitsch', back: '#FFE6B7', font: '#432C00', num: '#FFAD62' },
  시: { name: 'Poetry', back: '#E8EBFF', font: '#0021C6', num: '#4562F1' },
  소설: { name: 'Novels', back: '#E8EBFF', font: '#0021C6', num: '#4562F1' },
  에세이: { name: 'Essays', back: '#E8EBFF', font: '#0021C6', num: '#4562F1' },
};

const reportShortCategoryByName = {
  ADVERTISEMENT: '영리',
  ero: '음란성',
  violence: '권리침해',
  duplicate: '도배',
  etc: '기타',
};
const reportCategoryByName = {
  ADVERTISEMENT: '영리 목적/홍보성 글',
  ero: '음란성/선정성',
  violence: '타인의 권리침해',
  duplicate: '같은 내용 반복(도배)',
  etc: '기타 사유',
};
const reportStatus = {
  WAIT: '대기중',
  PROCESS: '처리중',
  COMPLETE: '처리완료',
};
const reportPlatform = {
  MAIL: '메일',
  MESSAGE: '쪽지',
};
const Category = {
  branch,
  vive,
  colorCategory,
  branchCategoryByName,
  viveCategoryByName,
  reportShortCategoryByName,
  reportCategoryByName,
  reportStatus,
  reportPlatform,
};

export default Category;
