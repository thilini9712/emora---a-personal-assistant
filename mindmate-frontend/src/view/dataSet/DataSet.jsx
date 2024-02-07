import DownloadData from "../../components/downloadFiles/DownloadData";
import {AlbumsOutline} from "react-ionicons";
import React from "react";
import HeadingTitle from "../../components/title/HeadingTitle";

const DataSet = (props) => {
    let icon = <AlbumsOutline
                    color={'#4285f5'}
                    title={"Home"}
                    height="20px"
                    width="20px"
                    style={{marginBottom: '5px'}}
                />
    return (
        <>
            <HeadingTitle title={'Dataset'} icon={icon} ml={'60px'}/>
            <DownloadData/>
        </>
    );
}

export default DataSet;