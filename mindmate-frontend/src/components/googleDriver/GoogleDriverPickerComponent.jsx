import useDrivePicker from "react-google-drive-picker";
import CustomButton from "../button/CustomButton";


const GoogleDriverPickerComponent = () => {
    //eslint-disable-next-line
    const [openPicker, data, authResponce] = useDrivePicker();

    const handleOpenPicker = () => {
        try {
            openPicker({
                clientId: "785266234444-kv67hrloekodrgfs7kib0kqkrajfojeq.apps.googleusercontent.com",
                developerKey: "AIzaSyAT_Cc0UIr6cJyk1zHsknziqhabAQl1N6o",
                viewId: "DOCS",
                token: "ya29.a0AfB_byBTs9F5DHqHtr9K1SbvZn8Se1Xj5RFfn10PRM651mMPGFpbpeyUUv8Ky7Nsl9szaRtmPSuI2smaDYA07D1OAKz-nyUscqfHHUW4ypgwE3986-HitIUgIxrunnqExLiqCmSx7RmucLSWNod7hPyMFQTWaGm-dyuWaCgYKAZ4SARASFQGOcNnClZPhZ1N-W6tzNbbxQxokJw0171",
                showUploadView: true,
                showUploadFolders: true,
                supportDrives: true,
                multiselect: true,
                callbackFunction: pickerCallback
            })
        } catch (e) {
            console.log("ss", e)
        }

    }

    function pickerCallback(data) {
        console.log("callback called......")
        console.log(data)
    }


    return (
        <>
            <CustomButton
                type="button"
                variant="cancel"
                radius="8"
                size="sm"
                className="mt-3 mb-4 button-mobile-response"
                fontSize="18"
                width="150"
                onclick={handleOpenPicker}
            >
                Open
            </CustomButton>
        </>
    );
};

export default GoogleDriverPickerComponent;