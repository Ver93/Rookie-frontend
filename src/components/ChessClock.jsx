import { useState, useEffect } from "react";
import styles from "./ChessClock.module.css";

export default function ChessClock({
    active,
    initialTime,
    increment,
    onFlag,

    onTimeControlChange,

    canConfigure = false,
    gameActive = false,
    timeControl
}) {

    const [time, setTime] = useState(initialTime);
    const [editing, setEditing] = useState(false);


    useEffect(() => {

        setTime(initialTime);

    }, [
        initialTime,
        timeControl
    ]);



    useEffect(() => {

        if (!active)
            return;


        const interval = setInterval(() => {

            setTime(t => {

                if (t <= 0) {

                    clearInterval(interval);

                    onFlag?.();

                    return 0;

                }


                return t - 1;

            });


        }, 1000);



        return () => clearInterval(interval);


    }, [
        active,
        onFlag
    ]);




    const format = (t) => {

        const minutes = Math.floor(t / 60);

        const seconds = t % 60;


        return `${minutes}:${seconds
            .toString()
            .padStart(2,"0")}`;

    };




    const timeControls = [
        "1+0",
        "3+0",
        "3+2",
        "5+0",
        "10+0"
    ];




    const applyTimeControl = (tc) => {

        onTimeControlChange?.(tc);

        setEditing(false);

    };




    return (

        <div className={styles.clockWrapper}>


            <div
                className={[
                    styles.clockButton,
                    active ? styles.active : ""
                ].join(" ")}
            >


                <div
                    className={[
                        styles.time,

                        gameActive && canConfigure
                            ? styles.timeCenter
                            : ""

                    ].join(" ")}
                >

                    {format(time)}

                </div>



                {canConfigure && (

                    <button

                        className={[
                            styles.settingsButton,

                            gameActive
                                ? styles.hideSettings
                                : ""

                        ].join(" ")}


                        onClick={() =>
                            setEditing(v => !v)
                        }

                    >

                        ⚙

                    </button>

                )}


            </div>




            <div

                className={[
                    styles.clockMenu,

                    editing
                        ? styles.open
                        : ""

                ].join(" ")}

            >


                <div className={styles.menuTitle}>

                    Time Control

                </div>



                <div className={styles.timeRow}>


                    {timeControls.map(tc => (

                        <button

                            key={tc}

                            className={styles.timeButton}


                            onClick={() =>
                                applyTimeControl(tc)
                            }

                        >

                            {tc}

                        </button>

                    ))}


                </div>


            </div>


        </div>

    );

}