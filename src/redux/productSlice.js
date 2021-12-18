import { createSlice } from '@reduxjs/toolkit';

const data = JSON.parse(localStorage.getItem('data'))
const initialState = {
    items : data?.length > 0 ? data : []
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        getItems(state, action) {
            localStorage.setItem('data', JSON.stringify(action.payload))
            return {items:action.payload}
        },
        addData(state, action) {
            let temp = [];
            let filterTemp = state.items.filter((item) => item.id === action.payload.id)

            if (filterTemp.length > 0) {
                if(state.items.length > 0){
                    // eslint-disable-next-line array-callback-return
                    state.items.map(item => {
                        if (item.id === action.payload.id) {
                            temp.push({
                                ...item,
                                stock : parseInt(action.payload.stock),
                                cart: parseInt(action.payload.cart),
                                countSales: item.countSales,
                                totalCart: (parseInt(action.payload.cart) * item.price).toFixed(2),
                            })
                        }else{
                            temp.push({...item})
                        }
                    })
                }
            }
            localStorage.setItem('data', JSON.stringify(temp))
            console.log("action", action);
            return {items : temp}
        },
        checkout(state, action) {
            let temp = [];
            let filterTemp = state.items.filter((item) => item.id === action.payload.id)

            if (filterTemp.length > 0) {
                if(state.items.length > 0){
                    // eslint-disable-next-line array-callback-return
                    state.items.map(item => {
                        if (item.id === action.payload.id) {
                            temp.push({
                                ...item,
                                id : item.id,
                                stock: parseInt(item.stock) - action.payload.countSales,
                                cart: 0,
                                totalCart:0,
                                countSales:action.payload.countSales + parseInt(item.countSales),
                                totalSales:((action.payload.countSales + parseInt(item.countSales)) * item.price).toFixed(2),
                            })
                        }else{
                            temp.push({...item})
                        }
                    })
                }
            }
            localStorage.setItem('data', JSON.stringify(temp))
            console.log("action", action);
            return {items : temp}
        }
    }
})

export const { addData, checkout, getItems } = productSlice.actions;
export default productSlice.reducer;