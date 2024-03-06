import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

export const Search = () => {
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get('keyword');
    console.log(location);
    return null;
};
