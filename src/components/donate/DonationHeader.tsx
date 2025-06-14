
import { Heart } from "lucide-react";

const DonationHeader = () => {
  return (
    <div className="text-center mb-12">
      <div className="flex justify-center mb-4">
        <Heart className="h-16 w-16 text-red-500" />
      </div>
      <h1 className="text-4xl font-bold text-white mb-4">Support My Work</h1>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto">
        Your donations help me continue providing quality business consulting and technology solutions. 
        Every contribution, no matter the size, is greatly appreciated.
      </p>
    </div>
  );
};

export default DonationHeader;
