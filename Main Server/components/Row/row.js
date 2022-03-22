import React, { useEffect, useRef, useState } from 'react';
import Styles from './Row.module.css';
import useWindowSize from '../hooks/WindowSize';

export default function Row(props) {
    const {
        className,
        style,
        title,
        render,
        itemSize
    } = props;
    const windowSize = useWindowSize();
    const [items, setItems] = useState([]);
    const itemsRef = useRef(null);

    // setItems to an empty array to clear the items. It will be set to the items passed in the props in the second useEffect
    useEffect(() => {
        const newItems = [...props.items];
        console.log(newItems)

        setItems([]);
    }, [props.items]);

    useEffect(() => {
        if (items.length === 0 && props.items.length !== 0) {
            setItems(props.items);
        } 
    }, [items]);

    const scrollLeft = () => {
        itemsRef.current.scrollLeft -= (window.innerWidth) * 0.8;
        window.scrollTo(window.scrollX, window.scrollY - 1);
        window.scrollTo(window.scrollX, window.scrollY + 1);
    }
    const scrollRight = () => {
        itemsRef.current.scrollLeft += (window.innerWidth) * 0.8;
        window.scrollTo(window.scrollX, window.scrollY - 1);
        window.scrollTo(window.scrollX, window.scrollY + 1);
    }

    return (
        <div style={{display: items.length > 0 ? 'block' : 'none'}}>
            <div className={className} style={style}>
                <h2 style={{ textTransform: 'capitalize' }}>{title}</h2>
                <div className={Styles.row}>
                    <div ref={itemsRef} className={Styles.scrollable}>
                        {
                            items.map((item, index) => {
                                return render(item, index);
                            })
                        }
                    </div>
                    {items.length * itemSize > windowSize.width &&
                        <>
                            <div className={Styles.scrollButton} onClick={scrollLeft}>
                                <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/left.svg`} width="70" />
                            </div>
                            <div className={Styles.scrollButton} style={{ right: '0' }} onClick={scrollRight}>
                                <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/right.svg`} width="70" />
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}