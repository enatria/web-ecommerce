/* eslint-disable array-callback-return */
import  { useState, useEffect } from 'react';
import axios from 'axios'
import { useSelector, useDispatch} from 'react-redux';
import { getItems } from '../redux/productSlice';

const useFetch = (url='', options=null) =>{
    const dispatch = useDispatch()

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const items = useSelector((state) => state.product.items)

    function filterData(data=[]) {
        let temp = []
            data?.map((item, i) => {
                const newData = Object.assign({}, item, {
                    cart : 0,
                    stock: 20,
                    countSales: 0,
                    totalCart: 0,
                    totalSales:0
                })
                temp.push(newData)
            })
        return temp
    }

    function getData(isMounted) {
        
        if (items.length === 0) {
            axios.get(url, options)
                .then(res=> filterData(res.data))
                    .then(data => {
                    if (isMounted) {
                        console.log("newData", data);
                        setData(data);
                        dispatch(getItems(data))
                        setError(null)
                    }
                })
                .catch(error=>{
                    if(isMounted){
                        setError(error);
                        setData(null);
                    }
                })
                .finally(()=>isMounted && setLoading(false))
        } else {
            console.log("redux data", items)
            setData(items)
            setLoading(false)
            setError(null)
        }
        
        
    }

    //cart
    useEffect(()=>{
        let isMounted = true;
        
        console.log("cart1", items)
        setLoading(true);
        getData(isMounted)

        return ()=> (isMounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, options])


    useEffect(()=>{
        let isMounted = true;
        getData(isMounted)
        console.log("cart2", items)
        return ()=> (isMounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items])
    return {error, data, loading};
}



export default useFetch;