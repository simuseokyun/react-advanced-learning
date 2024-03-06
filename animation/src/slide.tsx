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
    width: 400px;
    height: 200px;
    border-radius: 40px;
    background-color: white;
    position: absolute;
    top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const box = {
    invisible: (isBack: boolean) => ({
        x: isBack ? -500 : 500,
        opacity: 0,
        scale: 0,
    }),
    visible: {
        x: 0,
        opacity: 1,
        scale: 1,
    },

    exit: (isBack: boolean) => ({ x: isBack ? 500 : -500, opacity: 0, scale: 0, transition: { duration: 0.2 } }),
};
function App3() {
    const [visible, setVisible] = useState(1);
    const nextPlease = () => {
        setVisible((prev) => (prev === 10 ? 10 : prev + 1));
        setBack(false);
    };
    const prevPlease = () => {
        setVisible((prev) => (prev === 1 ? 1 : prev - 1));
        setBack(true);
    };
    const [back, setBack] = useState(false);
    return (
        <Wrapper>
            {/* 초기 코드 */}
            {/* <AnimatePresence>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
                    return i === visible ? (
                        <Box variants={box} initial="invisible" animate="visible" exit="exit" key={i}>
                            {i}
                        </Box>
                    ) : null;
                })}
            </AnimatePresence>
            <button onClick={prevPlease}>prev</button>
            <button onClick={nextPlease}>next</button> */}

            {/* 수정 코드 */}
            <AnimatePresence custom={back}>
                <Box variants={box} custom={back} initial="invisible" animate="visible" exit="exit" key={visible}>
                    {visible}
                    {/* key 는 고유한 값이기에 key 가 변경되면 컴포넌트가 리랜더링됨 / 리랜더링은 initial/animate/exit 모두포함 */}
                </Box>
            </AnimatePresence>
            <button onClick={prevPlease}>prev</button>
            <button onClick={nextPlease}>next</button>
        </Wrapper>
    );
}

export default App3;
