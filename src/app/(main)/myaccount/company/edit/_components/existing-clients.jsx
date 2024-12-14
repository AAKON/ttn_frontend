import { DeleteIcon } from "@/icons";
import Button from "@/components/shared/button";
import Image from "next/image";

function ExistingClients({ image }) {
  return (
    <div className="flex justify-between gap-6 h-10">
      <div className="h-10 flex-1">
        <Image src={image} alt="image" height={40} />
      </div>
      <Button secondary type="button" className="size-10 gap-0 !p-1">
        <DeleteIcon stroke="#F04438" />
      </Button>
    </div>
  );
}

export default ExistingClients;
