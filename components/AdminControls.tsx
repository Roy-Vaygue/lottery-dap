import React from 'react'
import { ethers } from "ethers";
import { currency } from "@/constans";
import toast from "react-hot-toast";
import { StarIcon, 
CurrencyDollarIcon,
ArrowPathIcon,
ArrowUturnDownIcon,
} from '@heroicons/react/24/solid'
import { useContract,
useContractRead,
useContractWrite,
} from '@thirdweb-dev/react'

function AdminControls() {
    const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRSCT_ADDRESS
    );
    const { data: totalCommission } = useContractRead(
        contract
        ,"operatorTotalCommission"
      );

    const { mutateAsync: DrawWinnerTicket } = useContractWrite(
    contract
    ,"DrawWinnerTicket"
    );
    const { mutateAsync: RefundAll } = useContractWrite(
    contract
    ,"RefundAll"
    );
    const { mutateAsync: RestartDraw } = useContractWrite(
    contract
    ,"restartDraw"
    );
    const { mutateAsync: WithdrawCommision } = useContractWrite(
    contract
    ,"WithdrawCommission"
    );

    const onDrawWinner = async () =>{
        const notification = toast.loading("Picking a Lucky Winner");
        try{
            const data = await DrawWinnerTicket({ args: []});
        
              toast.success("A Winner Has Been Selected!",{
                id: notification,
              });
        
              console.info("contract call success", data);
        
            } catch(err){
              console.error("Whoops Something Went Wrong!", {
                id: notification,
              });
              console.error("contract call failure",err)
            }
          };
    
    const onWithdrawCommision = async () =>{
    const notification = toast.loading("Withdrawing Commission...");
    try{
        const data = await WithdrawCommision({ args: []});
    
            toast.success("Your Commission Has Benn Withdrawn Successfully!",{
            id: notification,
            });
    
            console.info("contract call success", data);
    
        } catch(err){
            console.error("Whoops Something Went Wrong!", {
            id: notification,
            });
            console.error("contract call failure",err)
        }
    };

    const onRestartDraw = async () =>{
        const notification = toast.loading("Restarting Draw...");
        try{
            const data = await RestartDraw({ args: []});
        
                toast.success("Draw Restarted Successfully!",{
                id: notification,
                });
        
                console.info("contract call success", data);
        
            } catch(err){
                console.error("Whoops Something Went Wrong!", {
                id: notification,
                });
                console.error("contract call failure",err)
            }
        };

    const onRefundAll = async () =>{
        const notification = toast.loading("Refunding All...");
        try{
            const data = await RefundAll({ args: []});
        
                toast.success("All Refunded Successfully!",{
                id: notification,
                });
        
                console.info("contract call success", data);
        
            } catch(err){
                console.error("Whoops Something Went Wrong!", {
                id: notification,
                });
                console.error("contract call failure",err)
            }
        };

  return (
    <div className='text-white text-center px-5 py-3 rounded-md 
    border-emerald-300/20 border'>
        <h2 className='font-bold'>Admin Control</h2>
        <p className='mb-5'>Total Commision To Be Withdrawn: {totalCommission &&
            ethers.utils.formatEther(totalCommission?.toString())} {currency}</p>
        <div className='text-center flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2'>
            <button onClick={onDrawWinner} className='adminButton'>
                <StarIcon className='h-6 mx-auto mb-2' />
                Draw Winner
            </button>
            <button onClick={onWithdrawCommision} className='adminButton'>
                <CurrencyDollarIcon className='h-6 mx-auto mb-2' />
                Withdraw Commision
            </button>
            <button onClick={onRestartDraw} className='adminButton'>
                <ArrowPathIcon className='h-6 mx-auto mb-2' />
                Restart Draw
            </button>
            <button onClick={onRefundAll} className='adminButton'>
                <ArrowUturnDownIcon className='h-6 mx-auto mb-2' />
                Refund All
            </button>
        </div>
    </div>
  )
}

export default AdminControls