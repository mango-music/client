/* eslint-disable indent */
const usePageTitle = (pathname, nickname) => {
  const isMain = pathname.includes(nickname);
  if (isMain) {
    const endpoint = pathname.replace(nickname, '').slice(2);
    switch (endpoint) {
      case '':
        return '오늘의 망고';
      case '/explore':
        return '음악 찾기';
      case '/library':
        return '라이브러리';
      case '/rating':
        return '평가하기';
      case '/profile':
        return '내 계정';
      default:
        return null;
    }
  }
  switch (pathname) {
    case '/signin':
      return '로그인';
    case '/signup':
      return '가입하기';
    default:
      return null;
  }
};

export default usePageTitle;
