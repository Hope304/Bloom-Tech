import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ScrollToTopOnMount = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Nếu có một fragment (ví dụ: #about) trong URL, cuộn đến phần đó.
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Nếu không có fragment, cuộn đến đầu trang.
      window.scrollTo(0, 0);
    }
  }, [navigate, location]);

  return null; // Không cần render gì cả
};

export default ScrollToTopOnMount;
