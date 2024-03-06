import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';

const Wrapper = styled(motion.div)`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, rgb(238, 0, 153), rgb(255, 255, 255));
    position: relative;
`;
const Box = styled(motion.div)`
    height: 200px;
    border-radius: 40px;
    background-color: white;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 50vw;
    gap: 10px;
    div:first-child,
    div:last-child {
        grid-column: span 2;
    }
`;
const Overlay = styled(motion.div)`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
`;
function Layout() {
    const [clicked, setClicked] = useState(false);
    const toggle = () => setClicked((prev) => !prev);
    return (
        <Wrapper onClick={toggle}>
            <Grid>
                <Box layoutId="hello" />
                <Box />
                <Box />
                <Box />
            </Grid>
            <AnimatePresence>
                {' '}
                {clicked ? (
                    <Overlay
                        initial={{
                            opacity: 0,
                        }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <Box layoutId="hello" style={{ width: 400, height: 200 }} />
                    </Overlay>
                ) : null}
            </AnimatePresence>
        </Wrapper>
    );
}

export default Layout;
