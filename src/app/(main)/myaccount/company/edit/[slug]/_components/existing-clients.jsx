import { DeleteIcon } from "@/icons";
import Button from "@/components/shared/button";
import Image from "next/image";

function ExistingClients({ item }) {
  return (
    <div className="flex justify-between gap-6 h-10">
        {item?.image_url && (
      <div className="h-10 flex-1">
        <Image src={item?.image_url} alt="image" width={40} height={40} />
      </div>)}
      <Button secondary type="button" className="size-10 gap-0 !p-1">
        <DeleteIcon stroke="#F04438" />
      </Button>
    </div>
  );
}

export default ExistingClients;
