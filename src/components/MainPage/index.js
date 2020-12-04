import React, { useEffect } from 'react';

const MainPage = () => {
  useEffect(() => {
    console.log(3);
  }, []);
  return (
    <div>
      여기는 메인 페이지
    </div>
  );
};

export default MainPage;
