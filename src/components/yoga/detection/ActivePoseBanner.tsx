
interface ActivePoseBannerProps {
  activePoseName: string;
}

const ActivePoseBanner = ({ activePoseName }: ActivePoseBannerProps) => {
  return (
    <div className="bg-yoga-blue text-white p-3 font-semibold text-center">
      Currently Practicing: {activePoseName}
    </div>
  );
};

export default ActivePoseBanner;
