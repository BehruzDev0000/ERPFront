import { useQuery } from "@tanstack/react-query";
import { Select } from "antd";
import { instance } from "../hooks";
import type { FC } from "react";
import { useCookies } from "react-cookie";

interface CustomSelectProps {
  extraClass?: string;
  requestTitle: "teachers" | "students" | "groups" | "rooms" | "stacks";
  placeHolder: string;
  id?: number;
}

const CustomSelect: FC<CustomSelectProps> = ({
  extraClass,
  requestTitle,
  placeHolder,
  id,
}) => {
  const [cookies] = useCookies(["token"]);

  const { data = [], isLoading } = useQuery({
    queryKey: [requestTitle, "select", id],
    queryFn: () =>
      requestTitle !== "stacks"
        ? instance(cookies.token)
            .get(`/${requestTitle}`, {
              params: { stackId: id },
            })
            .then((res) => res.data.data)
        : instance(cookies.token)
            .get(`/stacks/${id}/groups`)
            .then((res) => res.data.data),
    enabled: !!cookies.token,
  });

  const dataOptions = data.map((item: any) => ({
    label:
      item.firstName && item.lastName
        ? `${item.firstName} ${item.lastName}`
        : item.name,
    value: item.id,
  }));

  return (
    <Select
      loading={isLoading}
      className={`w-[280px]! ${extraClass ?? ""}`}
      allowClear
      size="large"
      showSearch
      optionFilterProp="label"
      placeholder={`Choose ${placeHolder.toLowerCase()}`}
      options={dataOptions}
    />
  );
};

export default CustomSelect;
