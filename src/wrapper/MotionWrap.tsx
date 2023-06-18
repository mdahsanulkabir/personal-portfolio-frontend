import { motion } from 'framer-motion';

export interface MotionWrapProps {
    Component : React.ComponentType
    classNames?: string[]
}

const MotionWrap = ({Component, classNames} : MotionWrapProps) => function HOC() {
    return (
        <motion.div
            whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
            transition={{ duration: 0.5 }}
            className={`${classNames} app__flex`}
        >
            <Component />
        </motion.div>
    );
};

export default MotionWrap;