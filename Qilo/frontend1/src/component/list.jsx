import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { motion, useAnimation } from "framer-motion";

export default function List() {
    const [Text, setText] = useState("");
    const [Stack, setStack] = useState(["Hello", "Qilo"]);

    function Pop(item) {
        if (Stack.length > 0) {
            const newStack = Stack.filter(element => element !== item);
            setStack(newStack);
        }
    }

    const controls = useAnimation();
    const animateItem = (index) => {
        controls.start({
            scale: [0, 1, 1.1, 1],
            opacity: [0, 0.5, 1],
            transition: {
                duration: 0.5,
                delay: index * 0.1,
            }
        });
    };

    useEffect(() => {
        if (Stack.length > 0) {
            animateItem(Stack.length - 1);
        }
    }, [Stack.length]);

    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column', padding: '2rem', gap: '2rem'}}>
                {Stack.length > 0 && (
                    <div className='inset_shadow' style={{display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap', padding: '1rem'}}>
                        {Stack.map((item, index) =>{
                            return (
                                <motion.div
                                    key={index}
                                    animate={controls}
                                    onTap={() => animateItem(index)}
                                    style={{backgroundColor: 'transparent', color: 'white', borderRadius: '.2rem', padding: '.3rem .5rem', display: 'flex', alignItems: 'center', gap: '.5rem', margin: '0rem 0rem', border: '3px solid white'}}>
                                    {item}
                                    <MdDelete onClick={() => Pop(item)} />
                                </motion.div>
                            );
                        }
                        )}
                    </div>
                )}

                <div className='control_container' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <input className="input_field" type="text" value={Text} onChange={(e) => setText(e.target.value)}></input>
                        <FaPlus onClick={() => {
                            if (Text.trim() !== "") {
                                setStack([...Stack, Text]);
                                setText("");
                            }
                        }} style={{color: 'white'}} />
                    </div>
                    <MdDelete onClick={() => setStack([])} style={{color: 'white'}}/>
                </div>
            </div>
        </>
    );
}
