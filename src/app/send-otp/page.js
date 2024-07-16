import OTPPage from "@/components/template/OTPPage";
import UserAmlak from "@/models/user";
import ConnectDB from "@/utils/connectDB";

async function SendOTP() {
  return (
    <div>
      <OTPPage />
    </div>
  );
}

export default SendOTP;
