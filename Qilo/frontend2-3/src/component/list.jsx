import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { motion, useAnimation } from "framer-motion";

export default function List() {
    const [Text, setText] = useState("");
    const [TextDesc, setTextDesc] = useState("");
    const [Stack, setStack] = useState([{title: "Hello", desc: "my name is elton", id: 1}, {title: "World", desc: "this is made using React", id: 2}]);

    function Pop(id) {
        if (Stack.length > 0) {
            const newStack = Stack.filter(element => element.id !== id);
            setStack(newStack);
        }
    }

    const controls = useAnimation();
    const animateItem = (index) => {
        controls.start({
            scale: [0, 1, 1.01, 1],
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

    const addItem = () => {
        if (Text.trim() !== "") {
            const newItem = { title: Text, desc: TextDesc, id: Date.now() };
            setStack([...Stack, newItem]);
            setText("");
            setTextDesc("");
        }
    };

    return (
        <>
        <p style={{padding: '0rem 1rem', color: 'white', fontSize: '1.5rem'}}>Notes</p>
            <div style={{display: 'flex', flexDirection: 'column', padding: '1rem 2rem', gap: '2rem' ,flex: '1' ,alignItems: 'center'}}>
                {Stack.length > 0 && (
                    <div className='inset_shadow' style={{display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap', padding: '1rem', flexDirection: 'column', flex: '1'}}>
                        {Stack.map((item, index) =>{
                            return (
                                <motion.div
                                    key={item.id}
                                    animate={controls}
                                    onTap={() => animateItem(index)}
                                    style={{backgroundColor: 'transparent', color: 'white', borderRadius: '.2rem', padding: '.3rem .5rem', display: 'flex', alignItems: 'center', gap: '0rem', margin: '0rem 0rem', border: '3px solid #F45C43', justifyContent: 'space-between', wordBreak: 'break-all'}}>
                                        <div>
                                            <h3>{item.title}</h3>
                                            <p>{item.desc}</p>
                                        </div>
                                    <MdDelete className="hover_button" onClick={() => Pop(item.id)} />
                                </motion.div>
                            );
                        }
                        )}
                    </div>
                )}

                <div className='control_container' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <input className="input_field" type="text" value={Text} onChange={(e) => setText(e.target.value)} maxLength={100} placeholder="Title"></input>
                            <input className="input_field" type="text" value={TextDesc} onChange={(e) => setTextDesc(e.target.value)} maxLength={100} placeholder="Description"></input>
                        </div>
                        <FaPlus onClick={addItem} style={{color: 'white'}} />
                    </div>
                    <MdDelete onClick={() => setStack([])} style={{color: 'white'}}/>
                </div>
            </div>
        </>
    );
}