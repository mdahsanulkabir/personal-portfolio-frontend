import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Testimonial.scss'

interface BrandsProps {
    _id: string;
    imgUrl: string;
    name: string;
    year: string;
    works: {
        name: string;
        company: string;
        desc: string;
    }[];
}

interface TestimonialsProps {
    name: string;
    bgColor: string;
    icon: string;
    imgurl: string;
    feedback: string;
    company: string;
}

interface IndexProps {
    index : number;
}

const Testimonial = () => {
    const [testimonials, setTestimonials] = useState<TestimonialsProps[]>([]);
    const [brands, setBrands] = useState<BrandsProps[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleClick = (index : number) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        const query = '*[_type == "testimonials"]';
        const brandsQuery = '*[_type == "brands"]';
        
        client.fetch(query).then((data: TestimonialsProps[]) => {
            setTestimonials(data);
        });
        
        client.fetch(brandsQuery).then((data: BrandsProps[]) => {
            setBrands(data);
        });
    }, []);
    return (
        <>
            {
                testimonials.length && (
                    <>
                        <div className="app__testimonial-item app__flex">
                            <img src={urlFor(testimonials[currentIndex].imgurl)} alt={testimonials[currentIndex].name} />
                            <div className="app__testimonial-content">
                                <p className="p-text">{testimonials[currentIndex].feedback}</p>
                                <div>
                                    <h4 className="bold-text">{testimonials[currentIndex].name}</h4>
                                    <h5 className="p-text">{testimonials[currentIndex].company}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="app__testimonial-btns app__flex">
                            <div className="app__flex" onClick={() => handleClick(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}>
                                <HiChevronLeft />
                            </div>

                            <div className="app__flex" onClick={() => handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}>
                                <HiChevronRight />
                            </div>
                        </div>
                    </>
                )
            }
            <div className="app__testimonial-brands app__flex">
                {
                    brands.map((brand) => (
                        <motion.div
                            whileInView={{ opacity: [0, 1] }}
                            transition={{ duration: 0.5, type: 'tween' }}
                            key={brand._id}
                        >
                            <img src={urlFor(brand.imgUrl)} alt={brand.name} />
                        </motion.div>
                    ))
                }
            </div>
        </>
    );
};

const WrappedTestimonials =  AppWrap({
    Component : MotionWrap({
        Component : Testimonial, 
        classNames : ['app__testimonial']
    }), 
    idName : 'testimonial', 
    classNames : ['app__primarybg',]
});

export default WrappedTestimonials;