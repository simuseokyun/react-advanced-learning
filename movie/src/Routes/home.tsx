import styled from 'styled-components';
import { useQuery } from 'react-query';
import { IGetMoviesResult, getMovies } from '../api';
import { makeImagePath } from '../utilities';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { useState } from 'react';
import { useFormAction, useNavigate, useMatch } from 'react-router-dom';
import { click } from '@testing-library/user-event/dist/click';

const Wrapper = styled.div`
    background: black;
`;

const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Banner = styled.div<{ bgPhoto: string }>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1)), url(${(props) => props.bgPhoto});
    background-size: cover;
`;
const Title = styled.h2`
    font-size: 70px;
    margin-bottom: 20px;
`;
const Overview = styled.div`
    font-size: 36px;
    width: 50%;
`;
const Slider = styled.div`
    position: relative;
    top: -100px;
`;
const Row = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 5px;
    position: absolute;
    width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
    background-color: white;
    background-image: url(${(props) => props.bgPhoto});
    background-size: cover;
    background-position: center;

    height: 200px;
    &:first-child {
        transform-origin: center left;
    }
    &:last-child {
        transform-origin: center right;
    }
`;
const Info = styled(motion.div)`
    padding: 20px;
    background-color: ${(props) => props.theme.black.lighter};
    opacity: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
`;
const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    opacity: 0;
`;
const BigMovie = styled(motion.div)`
    position: absolute;
    width: 40vw;
    height: 80vh;
    border-radius: 15px;
    overflow: hidden;
    right: 0;
    left: 0;
    margin: 0 auto;
    background-color: ${(props) => props.theme.black.lighter};
`;
const BigCover = styled.div`
    width: 100%;
    background-size: cover;
    background-position: center;
    height: 400px;
`;
const BigTitle = styled.h3`
    color: ${(props) => props.theme.white};

    font-size: 46px;
    position: relative;
    top: -80px;
    padding: 20px;
`;
const BigOverview = styled.p`
    padding: 20px;
    position: relative;
    top: -80px;
    color: ${(props) => props.theme.white.lighter};
`;
const rowVarians = {
    hidden: {
        x: window.innerWidth + 10, // window.innerWidth 란 현재 사용자의 화면 x넓이
    },
    visible: {
        x: 0,
    },
    exit: { x: -window.innerWidth - 10 },
};

const boxVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.3,
        y: -50,
        transition: { delay: 0.5 },
        zIndex: 99,
    },
};
const infoVariants = {
    hover: {
        opacity: 1,
        transition: { delay: 0.5 },
    },
};

const offset = 6;

export const Home = () => {
    const navigate = useNavigate();
    const bigMovieMatch = useMatch('/movies/:movieId');
    const { scrollY } = useScroll();
    const { data, isLoading } = useQuery<IGetMoviesResult>(['movies,nowPlaying'], getMovies);
    console.log(data, isLoading);
    const [index, setIndex] = useState(0);
    const increaseIndex = () => {
        if (data) {
            if (leaving) return;
            setLeaving(true);
            const totalMovies = data?.results.length;
            const maxIndex = Math.ceil(totalMovies / offset - 1);
            setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
        }
    };
    const [leaving, setLeaving] = useState(false);
    const toggleLeaving = () => setLeaving((prev) => !prev);
    const onBoxClicked = (movieId: number) => {
        navigate(`/movies/${movieId}`);
    };
    const onOverlayClick = () => navigate('/');
    const clickMovie =
        bigMovieMatch?.params.movieId && data?.results.find((movie) => movie.id + '' == bigMovieMatch.params.movieId);
    console.log(clickMovie);
    return (
        <Wrapper>
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <Banner onClick={increaseIndex} bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}>
                        <Title>{data?.results[0].title}</Title>
                        <Overview>{data?.results[0].overview}</Overview>
                    </Banner>
                    <Slider>
                        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                            <Row
                                variants={rowVarians}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ type: 'tween', duration: 1 }}
                                key={index}
                            >
                                {data?.results
                                    .slice(1)
                                    .slice(offset * index, offset * index + offset)
                                    .map((movie) => (
                                        <Box
                                            layoutId={movie.id + ''}
                                            variants={boxVariants}
                                            initial="normal"
                                            whileHover="hover"
                                            key={movie.id}
                                            bgPhoto={makeImagePath(movie.backdrop_path)}
                                            onClick={() => onBoxClicked(movie.id)}
                                        >
                                            <Info variants={infoVariants}>
                                                <h4>{movie.title}</h4>
                                            </Info>
                                        </Box>
                                    ))}
                            </Row>
                        </AnimatePresence>
                    </Slider>
                    <AnimatePresence>
                        {bigMovieMatch && (
                            <>
                                <Overlay
                                    onClick={onOverlayClick}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                ></Overlay>
                                <BigMovie style={{ top: scrollY.get() + 100 }} layoutId={bigMovieMatch.params.movieId}>
                                    {clickMovie && (
                                        <>
                                            <BigCover
                                                style={{
                                                    backgroundImage: `url(${makeImagePath(clickMovie.backdrop_path)})`,
                                                }}
                                            />
                                            <BigTitle>{clickMovie.title}</BigTitle>
                                            <BigOverview>{clickMovie.overview}</BigOverview>
                                        </>
                                    )}
                                </BigMovie>
                            </>
                        )}
                    </AnimatePresence>
                </>
            )}
        </Wrapper>
    );
};
