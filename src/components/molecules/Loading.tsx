import { LoadingOutlined } from "@ant-design/icons";

export const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full gap-2">
      <span>Loading</span> <LoadingOutlined />
    </div>
  );
};
