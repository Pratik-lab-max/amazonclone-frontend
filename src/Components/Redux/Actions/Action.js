export const getProducts =()=>async(dispatch)=>{
    try {
        const data = await fetch("http://localhost:2974/getproducts",{
            method:"GET",
            headers:{
                "Content-Type" : "application/json"
            }
        });

        const res =  await data.json()
        console.log(res)
        dispatch({type:"SUCCESS_GET_PRODUCTS",payload:res})
    } catch (error) {
        dispatch({type:"FAILURE_GET_PRODUCTS",payload:error.response})
    }
}