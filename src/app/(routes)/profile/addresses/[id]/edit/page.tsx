import { use } from "react";
import EditAddressForm from "@/components/profile/EditAddressForm";

interface EditAddressPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditAddressPage({ params }: EditAddressPageProps) {
  const { id } = use(params);
  return <EditAddressForm addressId={id} />;
}
