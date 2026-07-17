import { useState, useEffect } from "react";


export function parseTimeControl(tc) {
    if (!tc || typeof tc !== "string") {
        return {
            initial: 300,
            inc: 0
        };
    }
    const [minStr, incStr] = tc.split("+");
    return {
        initial: Number(minStr) * 60,
        inc: Number(incStr)
    };
}



export function useClock(initialTime, active, increment, resetSignal) {
    const [time, setTime] = useState(initialTime);
    useEffect(() => {
        setTime(initialTime);
    }, [initialTime]);



    useEffect(() => {
        if (!active)
            return;
        const interval = setInterval(() => {
            setTime(t => {

                if (t <= 0)
                    return 0;


                return t - 1;

            });

        },1000);
        return () => clearInterval(interval);
    },[active]);

    useEffect(() => {
        if(resetSignal !== undefined){
            setTime(initialTime);
        }
    },[
        resetSignal,
        initialTime
    ]);

    return [
        time,
        setTime
    ];

}