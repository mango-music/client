const usePageTitle = (pathname, nickname) => {
  let title;
  switch (pathname) {
    case '/signin':
      title = '로그인';
      break;
    case '/signup':
      title = '가입하기';
      break;
    default:
      title = null;
      break;
  }
  return title;
};

export default usePageTitle;
