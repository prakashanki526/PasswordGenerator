import React,{useState} from 'react';
import styles from './Home.module.css';
import 'toolcool-range-slider';
import Generate from '../Generate';

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
        let currVal;
        
        if(currName === "upper"){
            currVal = inputs.upper;
        } else if(currName === "lower"){
            currVal = inputs.lower;
        } else if(currName === "number"){
            currVal = inputs.number;
        } else if(currName === "symbol"){
            currVal = inputs.symbol;
        }

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

    return (
        <div className={styles.body}>
            <div className={styles.title}>
                Password Generator
            </div>
            <div className={styles.passwordContainer}>
                <div className={styles.password}>
                    {password}
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