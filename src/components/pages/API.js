import axios from "axios";

const userData = JSON.parse(localStorage.getItem('bvendor_user'));


const apiSettings = {

    createMyModelEntry: async (data) => {
        console.log('here is the: ',data)
        let form_data = new FormData();
        console.log('after here')
        if (data.image_url)
            form_data.append("image_url", data.image_url, data.image_url.name);
        form_data.append("title", data.title);
        form_data.append("description", data.description);
        form_data.append("quantity",data.quantity);
        form_data.append("price",data.price);
        form_data.append("video_url", data.video_url, data.video_url.name);
    
    const myNewModel = await axios
            .post(`http://localhost:8000/product/`, form_data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('bvendor_user')).tokens.access}`
                },
            }).then((res) => {
                console.log('here is the response')
                console.log(res)
                return res;
            }).catch((error) => {
                console.log('here in the error')
                console.log(error.response)
                return error.response;
            });
    
        if (myNewModel.status === 201) {
            // window.location.href = `/mymodels/${myNewModel.data.id}`;
            console.log('here is the response')
            // console.log(res)
            window.location.href = `http://localhost:3000`;

        }
        return myNewModel;
        },
    };
    
    export default apiSettings;