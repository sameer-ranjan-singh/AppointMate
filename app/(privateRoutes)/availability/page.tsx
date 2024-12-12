import { getUserAvailaibilty } from "@/actions/availability";
import { defaultAvailability } from "./data";
import AvailabilityForm from "./_components/availability-form";

const AvailabilityPage = async () => {
    const availability = await getUserAvailaibilty()
  return <AvailabilityForm initialData = {availability || defaultAvailability}/>;
};

export default AvailabilityPage;
