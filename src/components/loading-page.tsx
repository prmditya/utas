import { Spinner } from "./ui/spinner";

const iconSizeOptions = {
  ICON: "size-4",
  MEDIUM: "size-6",
  LARGE: "size-8",
};

export default function LoadingPage({
  iconSize,
}: {
  iconSize?: keyof typeof iconSizeOptions;
}) {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Spinner
        className={
          iconSize ? iconSizeOptions[iconSize] : iconSizeOptions.MEDIUM
        }
      />
    </div>
  );
}
