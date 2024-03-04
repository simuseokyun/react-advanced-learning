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
`;
const Box = styled(motion.div)`
    width: 300px;
    height: 300px;
    background-color: white;
`;
const boxVars = {
    initial: {
        opacity: 0,
        scale: 0,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 360,
    },
    leaving: {
        y: 50,
        opacity: 0,
    },
};
function App2() {
    const [show, setShow] = useState(false);
    const onClick = () => {
        setShow((prev) => !prev);
    };
    return (
        <Wrapper>
            <AnimatePresence>
                {show ? (
                    <Box
                        variants={boxVars}
                        initial="initial"
                        animate="visible"
                        exit="leaving"
                        transition={{ duration: 0.3 }}
                    ></Box>
                ) : null}
            </AnimatePresence>
            <button onClick={onClick}>click</button>
        </Wrapper>
    );
}

export default App2;
