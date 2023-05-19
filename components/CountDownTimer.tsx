import React from 'react'
import { useContract, useContractRead } from '@thirdweb-dev/react';
import Countdown from 'react-countdown';

type Props = {
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
};

function CountDownTimer() {
    const { contract } = useContract(
        process.env.NEXT_PUBLIC_LOTTERY_CONTRSCT_ADDRESS);
    const { data: expiration } = useContractRead(contract, "expiration");

    const renderer = ({ hours, minutes, seconds, completed}: Props) => {
        if(completed) {
            return(
            <div>
                <h2 className='text-white text-xl text-center animate-bounce'>All Tickets Were Sold For This Draw</h2>
                <div className='flex space-x-6'>
                    <div className='flex-1'>
                        <div className='countdown animate-pulse'>{hours}</div>
                        <div className='countdown-label'>Hours</div>
                    </div>

                    <div className='flex-1'>
                        <div className='countdown animate-pulse'>{minutes}</div>
                        <div className='countdown-label'>Minutes</div>
                    </div>

                    <div className='flex-1'>
                        <div className='countdown animate-pulse'>{seconds}</div>
                        <div className='countdown-label'>Seconds</div>
                    </div>

                </div>
            </div>
            );
        } else {
            return(
            <div>
                <h3 className='text-white text-sm mb-2 italic'>Time Remaining</h3>
                <div className='flex space-x-6'>
                    <div className='flex-1'>
                        <div className='countdown'>{hours}</div>
                        <div className='countdown-label'>Hours</div>
                    </div>

                    <div className='flex-1'>
                        <div className='countdown'>{minutes}</div>
                        <div className='countdown-label'>Minutes</div>
                    </div>

                    <div className='flex-1'>
                        <div className='countdown'>{seconds}</div>
                        <div className='countdown-label'>Seconds</div>
                    </div>

                </div>
            </div>
            );
        }
    };

  return (
    <div>
        <Countdown date={new Date(expiration * 1000)} renderer={renderer}></Countdown>
    </div>
  )
}

export default CountDownTimer