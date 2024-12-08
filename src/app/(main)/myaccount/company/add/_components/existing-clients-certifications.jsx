import { DeleteIcon } from "@/icons";
import Button from "@/components/ui/button";
import Image from "next/image";

function ExistingClientsCertifications({ certification }) {
  return (
    <div className="flex justify-between gap-6 h-10">
      <div className="h-10 flex-1 flex gap-2 items-center">
        <Image src={certification.img} alt="image" height={40} />
        <span className="text-sm text-semibold text-gray-500">
          {certification.certificate_title}
        </span>
      </div>
      <Button secondary type="button" className="size-10 gap-0 !p-1">
        <DeleteIcon stroke="#F04438" />
      </Button>
    </div>
  );
}

export default ExistingClientsCertifications;
