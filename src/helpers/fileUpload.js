

export const fileUpload = async (file ) => {

    const cloudUrl = "https://api.cloudinary.com/v1_1/drzpn3owg/upload";

    try {
        const formData =  new FormData();
        
        formData.append("upload_preset", "react-journal")
        formData.append("file", file)

        const resp = await fetch(cloudUrl, {
            method: "POST",
            body: formData
        })
        
        if(resp.ok) {
            const cloudResp = await resp.json();
            console.log(cloudResp);
            return cloudResp.secure_url
        } else {
            throw await resp.json();
        }
    } catch (error) {
        console.log(error);
        throw error
    }


}