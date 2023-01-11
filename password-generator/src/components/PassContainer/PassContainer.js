import React from 'react';
import styles from './PassContainer.module.css';
import { toast } from 'react-toastify';

const PassContainer = (props) => {
    const password = props.password;
    function doCopy(){
        if(!password || password === "P4$5W0rD!"){
            toast("Generate password first!!");
            return;
        }
        navigator.clipboard.writeText(password);
        toast("Copied");
    }

    return (
        <div>
            <div className={styles.passwordContainer}>
                <div className={styles.password}>
                    {password}
                </div>
                <div className={styles.copy} onClick={doCopy}>
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.3684 6.36364V7.36364H11.3684H16.1053H17V14.5455C17 14.7645 16.9319 14.9348 16.7515 15.1085C16.5692 15.2829 16.372 15.3636 16.1053 15.3636H5.68421C5.41718 15.3636 5.22052 15.2827 5.03891 15.1085C4.85756 14.9344 4.78947 14.7642 4.78947 14.5455V1.81818C4.78947 1.59943 4.85756 1.42919 5.03891 1.25517C5.22052 1.08089 5.41718 1 5.68421 1H10.3684V1.81818V6.36364Z" fill="#24232B" stroke="#A6FEB0" stroke-width="2"/>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default PassContainer;