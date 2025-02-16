"use client"
import { formatAmount } from "@/utils/utils";
import { InboxArrowDownIcon } from "@heroicons/react/24/solid";
import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import AuthModal from "../Modals/AuthModal";

const DonateCard = ({ amount }: {amount: number | null}) => {
  const [show, setShow] = useState<boolean>(false);
  const [auth, setAuth] = useState<boolean>(false);
  const toggleModal = () => setShow(!show);

  const handleDonate = () => {}
  return (
    <div>
      <div className="border rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white h-[360px] overflow-hidden">
        <div className="flex flex-col justify-center items-center my-auto h-3/4 p-10 gap-10" >
          <InboxArrowDownIcon />
          <h3 className="text-lg font-semibold text-gray-800 uppercase font-serif">{!amount? 'Custom Donate' : 'Donate'}</h3>
          {!amount ? (
          // @ts-ignore
            <Input
              color="gray"
              size="md"
              label="Amount"
              variant="static"
              type="number"
              placeholder="Enter Amount"
              containerProps={{
                  className: "!min-w-full",
                }}
            />
          ) : (
            <h3 className="text-lg font-semibold text-blue-800">{formatAmount(amount)}</h3>
          )}
        </div>
          <Button className="w-full rounded-none h-1/4" onClick={()=> {
            !auth ? toggleModal() : handleDonate();
            console.log('Donate Now', show);
          }}>Donate Now</Button>
      </div>
      <AuthModal show={show} toggleModal={toggleModal} />
    </div>
  );
};

export default DonateCard;
