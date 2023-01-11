import React,{useState} from 'react';
import styles from './Home.module.css';
import 'toolcool-range-slider';
import Generate from '../Generate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const [password,setPassword] = useState("P4$5W0rD!");
    const [length, setLength] = useState(0);
    const [inputs, setInputs] = useState({
        "upper": false,
        "lower": false,
        "number": false,
        "symbol": false
    });

    const [count, setCount] = useState(0);
    const [warningMessage, setWarningMessage] = useState("");

    function handleChange(event){
        setLength(event.target.value);
    }

    function handleInputState(event){
        const currName = event.target.name;
        const currVal = inputs[currName];

        if(currVal){
            setCount(count-1);
        } else{
            setCount(count+1);
        }
        
        setInputs({...inputs, [currName]: !currVal});
    }

    async function validate(){
        if(length<6){
            setWarningMessage("** Password must contain atleast 6 characters.");
            setPassword("");
            return;
        } else{
            setWarningMessage("");
            let result = await Generate(length,inputs.lower,inputs.upper,inputs.number,inputs.symbol);
            setPassword(result);
        }
    }

    function doCopy(){
        if(!password || password === "P4$5W0rD!"){
            toast("Generate password first!!");
            return;
        }
        navigator.clipboard.writeText(password);
        toast("Copied");
    }

    return (
        <div className={styles.body}>
            <ToastContainer position="top-center"
                    autoClose={1000}
                    hideProgressBar={true}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark" />
            <div className={styles.title}>
                Password Generator
            </div>
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
            <div className={styles.container}>
                <div className={styles.charlength}>
                    <div>Character length</div>
                    <div className={styles.length}>{length}</div>
                </div>
                <div className={styles.slider}>
                    <toolcool-range-slider min="0" max="12" step="1" slider-width="500px" slider-height="5px" slider-bg="#1E1E1E" pointer-width="22px" pointer-height="22px" onClick={handleChange}></toolcool-range-slider>
                </div>
                
                <div className={styles.form}>
                    <form>
                        <input type="checkbox" name="upper" className={styles.checkmark} onClick={handleInputState}></input>
                        <label> Include Uppercase Letter</label><br></br>
                        <input type="checkbox" name='lower' className={styles.checkmark} onClick={handleInputState}></input>
                        <label> Include Lowercase Letter</label><br></br>
                        <input type="checkbox" name='number' className={styles.checkmark} onClick={handleInputState}></input>
                        <label> Include Numbers</label><br></br>
                        <input type="checkbox" name='symbol' className={styles.checkmark} onClick={handleInputState}></input>
                        <label> Include Symbols</label><br></br>
                    </form>
                </div>
                <div className={styles.strength}>
                    <div className={styles.strengthLeft}>
                        STRENGTH
                    </div>
                    <div className={styles.strengthRight}>
                        <div className={styles.indicator} style={{backgroundColor: count>0 ? "aqua" : ""}}></div>
                        <div className={styles.indicator} style={{backgroundColor: count>1 ? "aqua" : ""}}></div>
                        <div className={styles.indicator} style={{backgroundColor: count>2 ? "aqua" : ""}}></div>
                        <div className={styles.indicator} style={{backgroundColor: count>3 ? "aqua" : ""}}></div>
                    </div>
                </div>
                <button className={styles.generate} onClick={validate}>
                    <span>GENERATE</span>
                </button>
                <div className={styles.warning}>
                    {warningMessage}
                </div>
            </div>
        </div>
    );
};

export default Home;