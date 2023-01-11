import React,{useState} from 'react';
import styles from './Home.module.css';
import 'toolcool-range-slider';
import Generate from '../Generate';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PassContainer from '../PassContainer/PassContainer';

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

    const [recents, setRecents] = useState({
        recent1: "",
        recent2: "",
        recent3: ""
    });

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
        if(password && password !== "P4$5W0rD!"){
            setRecents({
                recent3: recents.recent2,
                recent2: recents.recent1,
                recent1: password
            });
        }
        console.log(recents);

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

            <div className={styles.mainContainer}>
                <div>
                    <div className={styles.title}>
                        Password Generator
                    </div>

                    <PassContainer password={password} />

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
                <div className={styles.recents}>
                    <div className={styles.recent}>
                        <PassContainer password={recents.recent1} />
                    </div>
                    <div className={styles.recent}>
                        <PassContainer password={recents.recent2} />
                    </div>
                    <div className={styles.recent}>
                        <PassContainer password={recents.recent3} />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;